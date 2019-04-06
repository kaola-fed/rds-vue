export default {
  props: {
    // 每行展示个数
    numPerline: {
      type: Number,
      default: 4,
    },
    // upload类型，取值list或card
    listType: {
      type: String,
      default: 'list',
    },
    // list
    list: {
      type: Array,
      default: () => [],
    },
    // 是否支持多选上传
    multiple: {
      type: Boolean,
      default: false,
    },
    // 上传文件键值
    name: {
      type: String,
      default: 'file',
    },
    // 文件过滤
    accept: {
      type: String,
      default: '*',
    },
    // 额外数据
    data: {
      type: Object,
      default: () => ({}),
    },
    // 上传地址
    action: {
      type: String,
      default: '',
    },
    // 响应拦截器
    onLoadInterceptor: {
      type: Function,
      default: () => true,
    },
    // 文件个数限制
    limit: {
      type: Number,
      default: Infinity,
    },
    // 单个文件大小限制
    maxSize: {
      type: String,
      default: 'G',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    // mode=1: 上传到nos，后端需返回name: String, url: String, success: Boolean
    // mode=2: 单纯上传文件到后端，对响应无要求，直接emit success和数据
    mode: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    params() {
      return {
        numPerline: this.numPerline,
        multiple: this.multiple,
        name: this.name,
        accept: this.accept,
        data: this.data,
        action: this.action,
        onLoadInterceptor: this.onLoadInterceptor,
        limit: this.limit,
        maxSize: this.maxSize,
        readonly: this.readonly,
        autoUpload: this.autoUpload,
        list: this.list,
        mode: this.mode,
      };
    },
  },
};
