<template>
    <div :class="`kl-transfer-panel kl-transfer-panel--${size}`">
        <div :class="['kl-transfer-panel__body']">
            <transfer-search ref="transferSearch"
                v-if="!hideSearch"
                :search-ext="searchExt"
                :searchSpan="searchSpan"
                :source="source"
                :remote="remote"
                :type="type"
                @search="search" />
            <kl-divider />
            <transfer-table ref="transferTable"
                :columns="columns"
                :data="filteredData"
                :total="total"
                :remote="remote"
                :type="type"
                @pagination="onPagination"
                @select-change="$emit('select-change', $event)">
            </transfer-table>
        </div>
    </div>
</template>

<script>
import TransferTable from './transfer.table.vue';
import TransferSearch from './transfer.search.vue';

export default {
  name: 'transfer-panel',
  components: { TransferTable, TransferSearch },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    remote: Boolean,
    type: String,
    size: String,
    searchExt: Array,
    searchSpan: Number,
    source: Object,
    remoteMethod: Function,
    filterMethod: Function,
    formatQuery: Function,
  },
  data() {
    return {
      filteredData: [],
      total: 0,
    };
  },
  watch: {
    parentData: {
      immediate: true,
      handler() {
        // 首次可能condition还未初始化，容易导致用户的过滤函数undefined匹配都不通过，进而导致没有数据
        this.$nextTick(() => {
          this.search();
        });
      },
    },
  },
  computed: {
    hideSearch() {
      // 远程搜索并且没有设置查询条件
      return this.remote && !this.searchExt.length && this.type === 'left';
    },
    parentData() {
      return this.data;
    },
  },
  created() {
    if (this.remote && this.type === 'left') {
      this.filterByRemote(true);
    }
  },
  methods: {
    search() {
      if (this.remote && this.type == 'left') {
        this.filterByRemote(true);
        return;
      }
      const query = this.getQuery();
      const condition = this.getCondition();
      this.filteredData = this.parentData.filter(item => this.filterByQuery(item, query) && this.filterByMethod(item, condition));
    },
    filterByQuery(item, query) {
      if (!query.trim().length) {
        return true;
      }
      return Object.values(this.columns).some((column) => {
        const { prop } = column;
        const exp = new RegExp(query.toLowerCase());
        if (!item[prop] && item[prop] !== 0) {
          return false;
        }
        if (exp.test(item[prop].toString().toLowerCase())) {
          return true;
        }
        return false;
      });
    },
    filterByMethod(item, condition) {
      // 没有查询配置，过滤直接通过
      if (!this.searchExt.length) {
        return true;
      }

      if (typeof this.filterMethod === 'function') {
        return this.filterMethod(item, condition);
      }
      return true;
    },
    async filterByRemote(refresh) {
      let condition = this.getCondition(true);
      condition = (this.formatQuery && this.formatQuery(condition)) || condition;
      condition.pageNo = refresh ? 1 : condition.pageNo;
      const { result } = await this.remoteMethod(condition);
      this.filteredData = result.list || [];
      this.total = result.total;
    },
    getQuery() {
      const search = this.$refs.transferSearch;
      return (search && search.query) || '';
    },
    getCondition(complete) {
      const search = this.$refs.transferSearch;
      const table = this.$refs.transferTable;
      const pageNo = (table && table.pageNo) || 1;
      const pageSize = (table && table.pageSize) || 10;
      let condition = search && search.condition;
      // 此处对ref未生成时，首次search做一个兼容，避免formatQuery拿不到字段默认值报错
      if (!condition) {
        condition = {};
        this.searchExt.forEach((item) => {
          condition[item.prop] = item.default || '';
        });
      }
      const pagination = complete ? { pageNo, pageSize } : {};
      return Object.assign(pagination, condition);
    },
    onPagination() {
      this.filterByRemote();
    },
  },
};
</script>
