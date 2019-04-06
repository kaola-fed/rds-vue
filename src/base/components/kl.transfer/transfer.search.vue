<script>
export default {
  props: {
    searchExt: Array,
    remote: Boolean,
    type: String,
    source: Object,
    searchSpan: Number,
  },
  data() {
    const condition = {};
    this.searchExt.forEach((item) => {
      condition[item.prop] = item.default || '';
    });
    return {
      condition,
      query: '',
      inputHover: false,
    };
  },
  methods: {
    search() {
      this.$emit('search');
    },
    reset() {
      this.query = '';
      this.$refs.queryForm && this.$refs.queryForm.resetFields();
      this.search();
    },
    clearQuery() {
      if (this.inputIcon === 'el-icon-circle-close') {
        this.query = '';
      }
    },
    mouseenter() {
      this.inputHover = true;
    },
    mouseleave() {
      this.inputHover = false;
    },
  },
  computed: {
    inputIcon() {
      return this.query.length > 0 && this.inputHover ? 'el-icon-circle-close' : 'el-icon-search';
    },
  },
  render() {
    const formItem = this.searchExt.map((item) => {
      switch (item.component) {
        case 'el-input':
          return (<el-form-item label={item.label} prop={item.prop}>
                            <el-input v-model={this.condition[item.prop]} placeholder={item.placeholder || '请输入'}>
                            </el-input>
                        </el-form-item>);
        case 'kl-select':
          return (<el-form-item label={item.label} prop={item.prop}>
                            <kl-select v-model={this.condition[item.prop]}
                                source={item.source || this.source[item.sourceKey]}
                                placeholder={item.placeholder || '请选择'}>
                            </kl-select>
                        </el-form-item>);
        case 'kl-multi-select':
          return (<el-form-item label={item.label} prop={item.prop}>
                            <kl-multi-select v-model={this.condition[item.prop]}
                                source={item.source || this.source[item.sourceKey]} placeholder={item.placeholder || '请选择'}>
                            </kl-multi-select>
                        </el-form-item>);
        case 'el-date-picker':
          return (<el-form-item label={item.label} prop={item.prop} is-long>
                            <el-date-picker unlink-panels
                                v-model={this.condition[item.prop]}
                                type="datetimerange"
                                range-separator="-"
                                value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>);
        case 'el-cascader':
          return (<el-form-item label={item.label} prop={item.prop}>
                            <el-cascader filterable clearable
                                v-model={this.condition[item.prop]}
                                expand-trigger="hover"
                                options={item.source || this.source[item.sourceKey]}
                                props={{ value: 'id', label: 'name' }}
                                change-on-select={item.changeOnSelect}>
                            </el-cascader>
                        </el-form-item>);
        default:
          break;
      }
    });
    return (
                <el-form model={this.condition} ref="queryForm" label-position="top">
                <kl-search colSpan={this.searchSpan}
                    {...{ on: { search: this.search, reset: this.reset } }}>
                    {(!this.remote || this.type === 'right')
                        && <el-form-item
                            label="文本过滤">
                            <el-input
                                class="kl-transfer-panel__filter"
                                v-model={this.query}
                                size="small"
                                placeholder="请输入"
                                {...{
                                  nativeOn: {
                                    mouseenter: this.mouseenter,
                                    mouseleave: this.mouseleave,
                                  },
                                }}>
                                <i slot="prefix" v-show={this.inputIcon == 'el-icon-search'}
                                    class={{ 'el-input__icon': true, 'el-icon-search': true }}
                                    {...{ on: { click: this.clearQuery } }}
                                ></i>
                                <i slot="prefix" v-show={this.inputIcon == 'el-icon-circle-close'}
                                    class={{ 'el-input__icon': true, 'el-icon-circle-close': true }}
                                    {...{ on: { click: this.clearQuery } }}
                                ></i>
                            </el-input>
                        </el-form-item>
                    }
                    {formItem}
                </kl-search>
                </el-form>
    );
  },
};
</script>
