<!-- nek vue upload组件，业务内再对此组件封装一层使用， 表格内可以直接使用 -->
<template>
<div>
    <upload-list v-if="listType == 'list'"
        v-bind="params"
        :fileList="fileList"
        @preview="onPreview"
        @remove="onRemove"
        @success="onSuccess"
        @fail="onFail"
        @error="onError"
        @nonAutoUploadSuccess="onNonAutoUploadSuccess">
    </upload-list>
    <upload-card v-if="listType == 'card'"
        v-bind="params"
        :fileList="fileList"
        @preview="onPreview"
        @remove="onRemove"
        @success="onSuccess"
        @fail="onFail"
        @error="onError"
        @nonAutoUploadSuccess="onNonAutoUploadSuccess">
    </upload-card>
</div>
</template>

<script>
import UploadList from './upload.list';
import UploadCard from './upload.card';

import ConstMixin from './mixins/const';
import BaseMixin from './mixins/base';
import PropMixin from './mixins/prop';

export default {
  name: 'kl-upload',
  mixins: [ConstMixin, BaseMixin, PropMixin],
  components: { UploadList, UploadCard },
  data() {
    return {
      fileList: [],
      formData: new FormData(),
    };
  },
  watch: {
    list: {
      deep: true,
      handler(value) {
        this.fileList = value;
        this.updateFileList();
      },
    },
  },
  created() {
    this.fileList = this.list;
    this.updateFileList();
  },
  methods: {
    updateFileList() {
      const { fileList } = this;
      if (fileList && fileList.length) {
        fileList.forEach((file) => {
          // 更新文件单元状态
          file.status = file.status || 'success';
          // 判断文件单元是否初始化过信息，如果初始化过，则跳过
          if (file.uid) {
            return;
          }
          // 初始化文件单元的信息
          file.uid = this.__genUid();
          file.flag = file.flag || this.flagMap.ORIGINAL;
          file.type = this.__getFileType(file);
        });
      }
    },
    onNonAutoUploadSuccess(event) {
      this.fileList = event.fileList;
      this.formData = event.formData;
      this.updateFileList();
      this.$emit('success', {
        ...this._getEmitData(this.fileList),
        formData: this.formData,
      });
      this.$emit('change', {
        ...this._getEmitData(this.fileList),
        formData: this.formData,
      });
    },
    onRemove(event) {
      this.fileList = this.fileList.filter(item => item.uid !== event.uid);
      this.formData = event.formData;
      this.$emit('remove', {
        ...this._getEmitData(this.fileList),
        formData: this.formData,
      });
      this.$emit('change', {
        ...this._getEmitData(this.fileList),
        formData: this.formData,
      });
    },
    onSuccess(event) {
      if (this.mode == 2) {
        this.$emit('success', event);
        return;
      }
      this.fileList = event.fileList;
      this.updateFileList();

      this.$emit('success', this._getEmitData(this.fileList));
      this.$emit('change', this._getEmitData(this.fileList));
    },
    onFail(event) {
      this.$emit('fail', event);
    },
    onError(event) {
      this.$emit('error', event);
    },
    onPreview(event) {
      this.$emit('preview', event);
    },
    _getEmitData(fileList) {
      const prunedFileList = fileList.filter(item => item.status !== 'fail' && item.flag !== this.flagMap.DELETED);

      const emitData = {
        fileList,
        prunedFileList,
      };
      return emitData;
    },
  },
};
</script>

<style scoped>
</style>
