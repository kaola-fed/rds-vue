/* eslint-disable consistent-return,no-unused-expressions,eqeqeq,no-param-reassign,no-plusplus */
export default {
  name: 'kl-tree-select',
  data() {
    const nameKey = this.nameKey || 'name';
    const childrenKey = this.childrenKey || 'children';
    return {
      filterText: '',
      filterName: '',
      defaultProps: {
        label: nameKey,
        children: childrenKey,
      },
      defaultCheckedKeys: [],
      checkedKeys: [],
      checkedNames: [],
      checkedNamesShow: [],
      relatedMap: {},
      showAllSelected: false,
      dropdownVisible: false,
    };
  },
  props: {
    /* 选中的id值 */
    value: {
      type: Array,
      default: () => [],
    },
    /* 数据源 */
    source: {
      type: Array,
      default: () => [],
    },
    /* 默认的source数据源结构为id, name, children
     *id可以通过idKey配置
     *name可以通过nameKey配置
     *children可以通过childrenKey配置
     * */
    idKey: {
      type: String,
      default: 'id',
    },
    nameKey: {
      type: String,
      default: 'name',
    },
    childrenKey: {
      type: String,
      default: 'children',
    },
    /* 过滤输入框的placeholder */
    placeholder: {
      type: String,
      default: '输入关键字搜索',
    },
    /* 是否显示左侧操作按钮 */
    showButtons: {
      type: Boolean,
      default: true,
    },
    /* 三种模式，
     * normal: 只要选中就传id
     * leaf: 抹平，只传叶子结点
     * merge: 合并，子选项全部选中，只传父id
     * */
    mode: {
      type: String,
      default: 'merge',
    },
    /* 是否提供过滤功能 */
    canSearch: {
      type: Boolean,
      default: true,
    },
    /* 过滤结果最多显示条数 */
    filterLimit: {
      type: Number,
      default: 20,
    },
    /* 是够提供勾选框进行多选 */
    multiple: {
      type: Boolean,
      default: true,
    },
    /* 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false，开启之后只能用于普通提交 */
    checkStrictly: {
      type: Boolean,
      default: false,
    },
    showSelectedCount: {
      type: Number,
      default: 10,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    filterText(value) {
      if (this.filterValid(value)) {
        this.customFilter(value);
      }
    },
    source: {
      deep: true,
      immediate: true,
      handler(value) {
        if (!value) {
          return;
        }
        this.$refs.tree && this.$refs.tree.store.setData(JSON.parse(JSON.stringify(value)));
        this.buildRelatedMap(this.relatedMap, this.source, {});
        this.checkedKeys = this.value;
      },
    },
    'value.length': {
      immediate: true,
      handler(value) {
        if (!this.source.length) {
          return false;
        }
        /* 试图通过改变父组件的v-model来同步勾选情况，此处需要合理处理tree node的状态 */
        // 此处只处理了重置
        if (!value) {
          this.checkAll(false);
        }
        //  else {
        //     //如果value有值，需要逐个同步勾选，暂时不支持
        //     //todo
        // }

        this.checkedKeys = this.value;
      },
    },
    checkedKeys: {
      immediate: true,
      deep: true,
      handler() {
        this.syncCheckedNameById();
        this.$emit('input', this.checkedKeys);
        this.$emit('change-name', this.checkedNames);
      },
    },
    filterName() {
      this.syncCheckedNameShow();
    },
  },
  computed: {
    defaultExpandedKeys() {
      return this.showButtons ? [] : this.value;
    },
    accordion() {
      return this.showButtons;
    },
    checkedNamesShowStr() {
      return this.checkedNames.join(',');
    },
  },
  created() {
    this.defaultCheckedKeys = Array.from(this.value);
  },
  methods: {
    customFilter(value) {
      const { tree } = this.$refs;
      const { store } = tree;
      let resultNum = 0;
      const lazy = false;
      const limit = value ? this.filterLimit : Infinity;
      const filterNodeMethod = this.filterNode;

      const traverse = function (node) {
        const childNodes = node.root ? node.root.childNodes : node.childNodes;

        childNodes.forEach((child) => {
          child.visible = resultNum > limit ? false
            : filterNodeMethod.call(child, value, child.data, child);
          if (child.visible) {
            resultNum++;
          }
          traverse(child);
        });

        let allHidden = true;
        if (!node.visible && childNodes.length) {
          childNodes.forEach((child) => {
            if (child.visible) {
              allHidden = false;
            }
          });

          if (node.root) {
            node.root.visible = allHidden === false;
          } else {
            node.visible = allHidden === false;
          }
        }
        if (!value) {
          return;
        }
        if (node.visible && allHidden === false && !node.isLeaf && !lazy) {
          node.expand();
        }
      };
      traverse(store);
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      }
      const key = this.defaultProps.label;
      return data[key].indexOf(value) !== -1;
    },
    onFilterFocus() {
      if (this.filterValid(this.filterText)) {
        this.$nextTick(() => {
          this.customFilter(this.filterText);
        });
      }
    },
    filterValid() {
      return true;
    },
    /* 建立父子节点映射，用于查找某个id的父节点，优化后续查找性能 */
    buildRelatedMap(map, source, parent) {
      if (!source) {
        return;
      }
      source.forEach((item) => {
        map[item[this.idKey]] = {
          self: item,
          parentId: parent[this.idKey],
          name: item[this.nameKey],
          isLeaf: !item[this.childrenKey],
        };
        this.buildRelatedMap(map, item[this.childrenKey], item);
      });
    },
    onCheck(item, checkedNode) {
      this.setCheckedKeys(checkedNode.checkedKeys);
      // this.$emit('input', this.checkedKeys);
    },
    onCheckChange() {
      // todo
    },
    onCurrentChange() {
      // todo
    },
    onNodeExpand() {
      // todo
    },
    onNodeClick() {
      // todo
    },
    setCheckedKeys(checkedKeys) {
      switch (this.mode) {
        case 'merge': {
          this.setCheckedKeysByMerge(checkedKeys);
          break;
        }
        case 'leaf': {
          this.setCheckedKeysByLeaf(checkedKeys);
          break;
        }
        case 'normal': {
          this.setCheckedKeysByNormal(checkedKeys);
          break;
        }
        default: {
          this.setCheckedKeysByNormal(checkedKeys);
        }
      }
    },
    setCheckedKeysByMerge(checkedKeys) {
      const set = new Set(checkedKeys);
      this.checkedKeys = checkedKeys.filter((id) => {
        // 如果选中节点的父节点被选中，则过滤掉这个节点
        const parent = this.relatedMap[id] || {};
        const { parentId } = parent;
        if (!parentId) {
          // 顶级节点直接选中
          return true;
        }
        if (set.has(parentId)) {
          return false;
        }
        return true;
      });
    },
    setCheckedKeysByLeaf(checkedKeys) {
      this.checkedKeys = checkedKeys.filter((id) => {
        // 如果不是叶子节点，则过滤掉这个节点
        const parent = this.relatedMap[id] || {};
        return parent.isLeaf;
      });
    },
    setCheckedKeysByNormal(checkedKeys) {
      this.checkedKeys = checkedKeys.filter(() => true);
    },
    syncCheckedNameById() {
      this.checkedNames = [];
      this.checkedKeys.forEach((id) => {
        const item = this.relatedMap[id];
        if (!item) {
          console.warn(`Can not find id: ${id} from current source.`);
          return;
        }
        item.name && this.checkedNames.push(item.name);
      });
      this.syncCheckedNameShow();
    },
    syncCheckedNameShow() {
      if (this.canEdit) {
        return false;
      }
      this.checkedNamesShow = this.checkedNames
        .filter(item => item.indexOf(this.filterName) !== -1);
    },
    checkReverse() {
      const tree = this.$refs && this.$refs.tree;
      Object.keys(this.relatedMap).forEach((id) => {
        const node = tree.getNode(id);
        if (node.indeterminate) {
          // 不处理半选
          return false;
        }
        node.checked = !node.checked;
      });
      this.setCheckedKeys(tree.getCheckedKeys());
    },
    checkAll(checked) {
      const tree = this.$refs && this.$refs.tree;
      if (!tree) {
        return;
      }
      Object.keys(this.relatedMap).forEach((id) => {
        const node = tree.getNode(id);
        node.checked = checked;
        node.indeterminate = false;
      });
      // this.$nextTick(() => {});
      this.setCheckedKeys(tree.getCheckedKeys());
    },
    singleSelect(event, node, data) {
      event && event.stopPropagation();
      let id = data[this.idKey];
      this.checkedKeys = [];
      if (this.mode == 'merge' || this.mode == 'leaf') {
        this.checkedKeys = [id];
      } else {
        while (this.relatedMap[id]) {
          this.checkedKeys.push(id);
          id = this.relatedMap[id].parentId;
        }
        this.checkedKeys.reverse();
      }
      this.$refs.dropdown && this.$refs.dropdown.hide();
    },
  },
};
