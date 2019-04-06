export default {
  props: {
    /* 是否远程搜索 */
    remote: {
      type: Boolean,
      default: false,
    },
    /* 远程搜索方法 */
    remoteMethod: {
      type: Function,
      default: () => ({ result: [] }),
    },
    filterMethod: {
      type: Function,
      default: () => true,
    },
    /* 左侧数据 */
    data: {
      type: Array,
      default: () => [],
    },
    /* 右侧数据的v-model语法支持 */
    value: {
      type: Array,
      default: () => [],
    },
    /* 表格列信息 */
    columns: {
      type: Array,
      default: () => [],
    },
    searchSpan: {
      type: Number,
      default: 8,
    },
    searchExt: {
      type: Array,
      default: () => [],
    },
    searchRightExt: {
      type: Array,
      default: () => [],
    },
    source: {
      type: Object,
      default: () => ({}),
    },
    formatQuery: Function,
    addValidation: Function,
  },
};
