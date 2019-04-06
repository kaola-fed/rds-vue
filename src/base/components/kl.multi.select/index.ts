import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'kl-multi-select',
})
export default class KLMultiSelect extends Vue {

  // 下拉列表
  @Prop({ type: Array, default: () => [] })
  private source!: any[];

  @Prop({ type: String, default: '请选择' })
  private placeholder!: string;

  // 默认选中值
  @Prop({ type: [String, Array], default: () => [] })
  private value!: string | any[];

  @Prop({ type: Boolean, default: true })
  private collapseTags!: boolean;

  // 是否可搜索，默认为false
  @Prop({ type: Boolean, default: true })
  private filterable!: boolean;

  @Prop({ type: Boolean, default: true })
  private parseIdToNumber!: boolean;

  @Prop({ type: Boolean, default: false })
  private disabled!: boolean;

  private valueFormat: string = 'array';

  get selectedValue() {
    if(typeof this.value === 'string') {
      this.valueFormat = 'string';
      return KLMultiSelect.str2arr(this.value, ',', this.parseIdToNumber);
    }
    return this.value;
  }

  private static str2arr(str: string, split=',', parse=false) {
    const arr = str ? str.split(split) : [];
    if(parse){
      return arr.map(value => parseInt(value, 10));
    }
    return arr;
  }

  private static arr2str(arr: any, join=',') {
    if(Array.isArray(arr)){
      return arr.join(join);
    }
    return '';
  };

  // v-model封装：实现外层v-model双向绑定
  private onInputFn(val: any) {
    if(this.valueFormat === 'string') {
      this.$emit('input', KLMultiSelect.arr2str(val));
      return;
    }
    this.$emit('input', val);
  }

  private onChange(val: any) {
    if(this.valueFormat === 'string') {
      this.$emit('change', KLMultiSelect.arr2str(val));
      return;
    }
    this.$emit('change', val);
  }
}
