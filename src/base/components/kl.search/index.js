export default {
  name: 'kl-search',
  props: {
    /* row props */

    gutter: {
      type: Number,
      default: 24,
    },
    type: {
      type: String,
      default: 'flex',
    },
    justify: {
      type: String,
      default: 'start',
    },
    align: {
      type: String,
      default: 'end',
    },
    tag: {
      type: String,
      default: 'div',
    },

    /* search props */

    toggle: {
      type: Boolean,
      default: false,
    },
    // row上的class
    classes: {
      type: Array,
      default: () => [],
    },
    // col的span属性
    colSpan: {
      type: Number,
      default: 4,
    },
    // 单行时搜索/重置按钮的el-col的class
    buttonColClass: {
      type: String,
      default: '',
    },
    // 文字提示
    tip: String,
    // 超过 overflowLines 行折叠
    overflowLines: {
      type: Number,
      default: 3,
    },
    // 超过 overflowLines 行时默认显示 overflowDisplayLines 行
    overflowDisplayLines: {
      type: Number,
      default: 2,
    },
    // 用于包裹按钮的tag名称
    formItemTag: {
      type: String,
      default: 'el-form-item',
    },
    // 是否显示默认的查询和重置按钮
    searchable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      toggleDisplay: false,
    };
  },
  watch: {
    toggle(newValue) {
      this.toggleDisplay = newValue;
    },
  },
  render(h) {
    // 去除文本节点
    const children = this.$slots.default
      .filter(el => !!el.tag);
    const extraBtns = (this.$slots.buttons && this.$slots.buttons[0].children) || [];

    const {
      colSpan, buttonColClass, tip, overflowLines, overflowDisplayLines, classes, searchable,
      ...props
    } = this.$props;
    const span = parseInt(colSpan);
    if (isNaN(span)) {
      throw new Error(`colSpan expected a number but got ${JSON.stringify(colSpan)}`);
    }

    const maxColSpan = 24;
    const toggleLimit = maxColSpan * overflowLines; const
      foldDisplay = maxColSpan * overflowDisplayLines;

    // 栅格排列，用来判断行数
    // 子组件外层带上 is-long 属性，就自动占两格
    const spanArr = children.map((el) => {
      const data = el.data || {};
      const isLong = (data.attrs || {})['is-long'];
      // 支持item可自定义span
      const itemSpan = parseInt((data.attrs || {}).span);
      return (isLong || isLong === '') ? (itemSpan || span) * 2 : (itemSpan || span);
    });
    const spanCount = spanArr.reduce((sum, curr) => sum + curr, 0);

    const canToggle = spanCount > toggleLimit;

    let displayElements = [];
    if (!canToggle || this.toggleDisplay) {
      displayElements = children;
    } else {
      let i = 0;
      for (let count = 0; count <= foldDisplay; ++i) {
        count += spanArr[i];
      }
      displayElements = children.slice(0, i - 1);
    }

    displayElements = displayElements.map((el, index) => h('el-col', { props: { span: spanArr[index] } }, [el]));

    // 搜索+重置按钮
    const searchAndResetButtons = (searchable ? [
      h('el-button', {
        props: { type: 'primary' },
        on: { click: () => this.handleSearch() },
      }, ['查询']),
      h('el-button', { on: { click: this.handleReset } }, ['重置']),
    ] : []).concat(extraBtns);

    // 确定搜索和重置按钮的位置
    if (spanCount <= maxColSpan - span) {
      // 加上按钮没超出一行的把搜索重置按钮放一排
      displayElements.push(h('el-col', {
        key: 'kl-search-buttons-col',
        props: { span },
        class: `kl-search-inline-buttons ${buttonColClass}`,
      }, [
        h(this.formItemTag, { props: { label: '按钮' } }, searchAndResetButtons),
      ]));

      // 提示
      if (tip) {
        displayElements.push(h('el-col', {
          key: 'kl-search-tip-col',
          props: { span: maxColSpan },
          class: 'kl-search-tip__text',
        }, [tip]));
      }
    } else {
      // 提示
      searchAndResetButtons.push(h('div', {
        class: 'kl-search-tip kl-search-tip__text',
      }, [tip]));

      // 超过三行的，出现展开收起按钮
      if (canToggle) {
        const expandButtonChildren = this.toggleDisplay
          ? ['收起 ', h('i', { class: 'el-icon-arrow-up' })]
          : ['展开全部 ', h('i', { class: 'el-icon-arrow-down' })];
        searchAndResetButtons.push(h('el-button', {
          props: { type: 'text' },
          on: { click: this.handleToggle },
        }, expandButtonChildren));
      }

      displayElements.push(h('el-col', {
        key: 'kl-search-buttons-col',
        props: { span: maxColSpan },
        class: 'kl-search-buttons',
      }, [
        h(this.formItemTag, null, searchAndResetButtons),
      ]));
    }

    return h('el-row', {
      props,
      class: ['kl-search-row'].concat(classes).join(' '),
    }, displayElements);
  },
  methods: {
    handleToggle() {
      const newValue = !this.toggleDisplay;
      this.toggleDisplay = newValue;
      this.$emit('update:toggle', newValue);
    },
    handleSearch() {
      this.$emit('search');
    },
    handleReset() {
      this.$emit('reset');
    },
  },
};
