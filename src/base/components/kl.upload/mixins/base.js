import axios from 'axios';

export default {
  data() {
    return {
      fileUnitWidth: 60,
      fileUnitMargin: 25,
      dragover: false,
      dragenterCount: 0,
      encType: 'multipart/form-data',
      isNos: false,
    };
  },
  created() {
    // 为nos上传接口做默认数据格式转换
    if (/nos.kaolafed.com\/upload/.test(this.action)) {
      this.isNos = true;
    }
  },
  computed: {
    wrapWidth() {
      // unitWidth + border + padding
      const width = (this.fileUnitWidth + this.fileUnitMargin + 2) * this.numPerline + 20;
      return this.numPerline === Infinity ? '100%' : `${width}px`;
    },
    showAddBtn() {
      return !this.readonly && this.__getFileCount() < this.limit;
    },
  },
  methods: {
    onDragEnter(e) {
      e.stopPropagation();
      e.preventDefault();
      this.dragover = true;
      this.dragenterCount += 1;
    },
    onDragLeave(e) {
      e.stopPropagation();
      e.preventDefault();
      this.dragenterCount -= 1;
      if (this.dragenterCount === 0) {
        this.dragover = false;
      }
    },
    onDragOver(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    onDragDrop(e) {
      this.dragover = false;
      e.stopPropagation();
      e.preventDefault();
      const dt = e.dataTransfer;
      const { files } = dt;
      if (!this.multiple && files.length > 1) {
        this.$message.warning('只能拖拽一个文件上传');
        return;
      }
      this.__uploadFile(files);
    },
    onFileSelectChange() {
      this.__uploadFile();
    },
    onAddBtnClick() {
      const { inputNode } = this.$refs;
      inputNode.click();
    },
    onRemove(file) {
      // 非自动上传还需要更新formData
      if (!this.autoUpload) {
        const files = this.formData.getAll(this.name).filter(item =>
        // 如果有重名文件，这里会误删，待优化？？？
          item.name != file.name);
        // 初始化formData
        this.formData = new FormData();
        this.formData = this.__createFormData(files);
      }

      this.$emit('remove', {
        uid: file.uid,
        formData: this.formData,
      });
    },
    onPreview(file) {
      // 非图片抛出事件，自定义处理
      if (file.type != 'image') {
        this.$emit('preview', { file });
        return;
      }
      const list = this.__getImageList();
      const curIndex = list.findIndex(item => item.src == file.url) || 0;
      this.$preview(list, { curIndex });
    },
    onDownLoad(file) {
      if (this.__getFileType(file) === 'image') {
        const a = document.createElement('a');
        a.download = file.name;
        fetch(file.url).then(res => res.blob().then((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          a.href = blobUrl;
          a.click();
          window.URL.revokeObjectURL(blobUrl);
        })).catch(() => {
          const url = this.__urlAddDownload(file.url, file.name);
          window.open(url);
        });
      } else {
        const url = this.__urlAddDownload(file.url, file.name);
        window.open(url);
      }
    },

    __urlAddDownload(url, filename = '') {
      let str = url.split('#')[0];
      if (/\?/g.test(url)) {
        str += `&download=${filename}`;
      } else {
        str += `?download=${filename}`;
      }
      if (url.split('#')[1]) {
        str += `#${url.split('#')[1]}`;
      }
      return str;
    },

    __genUid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    },
    __getFileType(file) {
      const type = file.type || '';
      const name = file.name || '';
      let typeStr = 'unknown';

      const { typeMap } = this;
      Object.keys(typeMap).forEach((key) => {
        const reg = new RegExp(`${key}$`);
        // 名称后缀不区分大小写
        if (reg.test(type) || reg.test(`${name}`.toLowerCase())) {
          typeStr = typeMap[key];
        }
      });
      return typeStr;
    },
    __getImageList() {
      return this.fileList.filter(file => file.status == 'success' && file.type == 'image').map(file => ({
        name: file.name,
        src: file.url,
      }));
    },
    __getFileCount() {
      return (this.fileList || []).reduce((total, file) => (file.status == 'success' ? total + 1 : total), 0);
    },
    __getRemainLimit() {
      return this.limit - this.__getFileCount();
    },
    __isAcceptedFileType(file) {
      const type = this.__getFileType(file).toLowerCase();
      let isValid = false;

      this.accept.split(',').forEach((cond) => {
        if (cond === '*') {
          isValid = true;
        } else if (/image\/.*/.test(cond)) {
          isValid = isValid || type === 'image';
        } else if (/audio\/.*/.test(cond)) {
          isValid = isValid || type === 'audio';
        } else if (/video\/.*/.test(cond)) {
          isValid = isValid || type === 'video';
        } else {
          isValid = isValid || type === this.typeMap[cond];
        }
      });

      return isValid;
    },
    __isAcceptedFileSize(file) {
      const patterns = this.maxSize.match(/(\d+)(\D+)?/i);
      let size = patterns && patterns[1];
      const unit = patterns && patterns[2];
      if (!size) {
        return true;
      }

      if (unit) {
        size *= this.sizeMap[unit.toUpperCase()];
      }

      return size >= file.size;
    },
    async __uploadFile(files) {
      const { inputNode } = this.$refs;
      files = files || inputNode.files;

      const validate = this.__preCheck(files);
      if (!validate) {
        return false;
      }
      const options = {
        name: this.name || 'file',
        data: this.data,
      };
      const data = this.__createFormData(files, options);

      // 非自动上传保存完formData就返回
      if (!this.autoUpload) {
        const result = [];
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          result.push({
            status: 'success',
            flag: this.flagMap.ADDED,
            name: file.name,
            url: window.URL.createObjectURL(file),
          });
        }
        this.$emit('nonAutoUploadSuccess', {
          formData: data,
          fileList: this.fileList.concat(result),
        });
        inputNode.value = '';
        return true;
      }
      const FormAPI = axios.create({
        timeout: 50000,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'multipart/form-data',
        },
      });
      FormAPI.interceptors.response.use(this.__onLoad, this.__onError);
      await FormAPI.post(this.action, data);
      inputNode.value = '';
    },
    __preCheck(files) {
      const remainCount = this.__getRemainLimit();
      if (files.length > remainCount) {
        this.$message.warning(`当前最多只能选择${remainCount}个文件，请重新选择`);
        return false;
      }

      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (!this.__isAcceptedFileType(file)) {
          this.$message.warning('文件类型错误');
          return false;
        }
        if (!this.__isAcceptedFileSize(file)) {
          this.$message.warning(`单个文件大小超过${this.maxSize}`);
          return false;
        }
      }

      return true;
    },
    __createFormData(files, options = {}) {
      const formData = this.autoUpload ? new FormData() : this.formData;
      const { name } = options;
      for (let index = 0; index < files.length; index++) {
        // 建立文件名和文件的映射，重新上传需要用到
        const file = files[index];
        formData.append(name, file);
      }
      // 自动上传加入额外数据
      if (this.autoUpload) {
        for (const [key, value] of Object.entries(options.data)) {
          formData.append(key, value);
        }
      }
      return formData;
    },
    // 接口形式定义为:
    // {code: 200, message: String, data|result: Object | Array}
    // data|result: {url: String, name: String, success: Boolean}
    __onLoad(response) {
      const res = response.data || {};
      res.data = res.data || res.result;
      // 默认为nos上传接口做了兼容
      if (this.isNos) {
        res.code = response.status;
        res.data = {
          name: res.name,
          url: res.url,
          success: true,
        };
      }
      if (res.code == 200) {
        let result = this.onLoadInterceptor && this.onLoadInterceptor(res.data);
        // 拦截验证通过
        if (result) {
          // 拦截器返回数组或对象，则使用拦截器返回结果作为响应
          // 否则使用默认的response.data作为响应
          result = result instanceof Object ? result : res.data;
          res.data = result;
          if (this.mode == 2) {
            this.$emit('success', { res });
            return Promise.resolve(result);
          }
          if (!Array.isArray(result)) {
            result = [result];
          }

          result.forEach((item) => {
            item.flag = this.flagMap.ADDED;
            item.status = item.success === false ? 'fail' : 'success';
          });

          const failCount = result.filter(item => item.status === 'fail').length;

          if (failCount) {
            this.$message.warning(`有${failCount}张图片上传失败`);
          }
          this.$emit('success', {
            res,
            fileList: this.fileList.concat(result),
          });
          return Promise.resolve(result);
        }
      } else {
        this.$emit('fail', { res });
        return Promise.resolve(res);
      }
    },
    __onError(error) {
      console.log(error);
      this.$message.error('服务端错误');
      this.$emit('error', error);
      return Promise.reject(error);
    },
  },
};
