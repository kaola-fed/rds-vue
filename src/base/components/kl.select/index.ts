import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'kl-select',
})
export default class KLDivider extends Vue {

  // 下拉列表
  @Prop({ type: Array, default: () => [] })
  private source!: any[];

  @Prop({ type: String, default: '请选择' })
  private placeholder!: string;

  // 默认选中值
  @Prop({ default: '' })
  private value!: any;

  // 是否可多选，默认为false
  @Prop({ type: Boolean, default: false })
  private multiple!: boolean;

  // 是否可搜索，默认为false
  @Prop({ type: Boolean, default: true })
  private filterable!: boolean;

  @Prop({ type: String, default: 'small' })
  private size!: string;

  @Prop({ type: String, default: 'id' })
  private valueKey!: string;

  @Prop({ type: String, default: 'name' })
  private labelKey!: string;

  @Prop({ type: Boolean, default: true })
  private clearable!: boolean;

  @Prop({ type: Boolean, default: false })
  private disabled!: boolean;

  // v-model封装：实现外层v-model双向绑定
  private onInputFn(val: any) {
    this.$emit('input', val);
  }

  private onChange(val: any) {
    this.$emit('change', val);
  }
}
