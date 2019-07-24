import {
  Component,
  Prop,
  Mixins,
} from 'vue-property-decorator';

import SourceProviderMixin from '../../../mixins/sourceProvider';

@Component
export default class KsSelect extends Mixins(SourceProviderMixin) {
  public static componentName = 'KsSelect';

  @Prop({ type: String, default: '请选择' }) placeholder!: String;

  @Prop({ default: '' }) value;

  @Prop({ type: Boolean, default: false }) multiple!: Boolean;

  @Prop({ type: Boolean, default: true }) filterable!: Boolean;

  @Prop({ type: String, default: 'small' }) size!: String;

  @Prop({ type: String, default: 'id' }) valueKey!: String;

  @Prop({ type: String, default: 'name' }) labelKey!: String;

  @Prop({ type: Boolean, default: true }) clearable!: Boolean;

  @Prop({ type: Boolean, default: false }) disabled!: Boolean;

  onInputFn(val) {
    this.$emit('input', val);
  }

  onChange(val) {
    this.$emit('change', val);
  }
}
