<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: Array,
    total: {
      type: Number,
      default: 0,
    },
    remote: Boolean,
    type: String,
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
    };
  },
  methods: {
    handleSelectionChange(value) {
      this.$emit('select-change', value);
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.$emit('pagination');
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.$emit('pagination');
    },
  },
  render() {
    const checkColumn = (
                <el-table-column type="selection"
                    width="55">
                </el-table-column>
    );
    const bodyColumns = this.columns.map(column => (
                <el-table-column min-width={column.minWidth || ''}
                    width={column.width || ''}
                    align={column.align || 'center'}
                    prop={column.prop}
                    label={column.label}
                    formatter={column.formatter}
                    fixed={column.fixed}
                    show-overflow-tooltip={column.showOverflowTooltip}>
                </el-table-column>));
    return (
                <div class="kl-transfer-table-ctn">
                    <el-table stripe border
                        data={this.data}
                        class="kl-transfer-panel-table"
                        tooltip-effect="dark"
                        max-height="400"
                        {...{ on: { 'selection-change': this.handleSelectionChange } }}>
                        {checkColumn}
                        {bodyColumns}
                    </el-table>
                    {(this.remote && this.type === 'left')
                    && <el-pagination background
                        class="f-cb f-mt10"
                        layout="total, sizes, prev, next, jumper"
                        current-page={this.pageNo}
                        page-sizes={[10, 20, 30, 40, 50, 80, 100]}
                        page-size={this.pageSize}
                        total={this.total}
                        {...{
                          on: {
                            'size-change': this.handleSizeChange,
                            'current-change': this.handleCurrentChange,
                          },
                        }}>
                    </el-pagination>}
                </div>
    );
  },
};
</script>
