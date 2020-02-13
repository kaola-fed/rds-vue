import { Component, Prop, Mixins } from 'vue-property-decorator';

import SourceProviderMixin from '../../../mixins/sourceProvider';

@Component
export default class KsSelect extends Mixins(SourceProviderMixin) {
  public static componentName = 'KsSelect';

  @Prop({ type: String, default: '请选择' }) placeholder!: string;

  @Prop({ default: '' }) value;

  @Prop({ type: Boolean, default: false }) multiple!: boolean;

  @Prop({ type: Boolean, default: true }) filterable!: boolean;

  @Prop({ type: Number, default: 0 }) limit!: number;

  @Prop({ type: String, default: 'small' }) size!: string;

  @Prop({ type: String, default: 'id' }) valueKey!: string;

  @Prop({ type: String, default: 'name' }) labelKey!: string;

  @Prop({ type: Boolean, default: true }) clearable!: boolean;

  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  protected filterInput: any = '';

  protected get filteredSource() {
    if (!this.filterInput && (!this.value || (this.multiple && !this.value.length))) {
      return this.computedSource;
    }

    const input = String(this.filterInput).replace(
      /[|\\{}()[\]^$+*?.]/g,
      '\\$&',
    );
    const regexp = new RegExp(input, 'i');
    const inputMatched = this.filterInput
      ? this.computedSource.filter(item => regexp.test(item[this.labelKey]))
      : [];
    const valueMatched = this.value
      ? this.computedSource.filter(item => (this.multiple
        ? this.value.includes(item[this.valueKey])
        : String(this.value) === String(item[this.valueKey])))
      : [];

    return [...inputMatched, ...valueMatched].filter(
      (item, index, arr) => !arr.find((_, i) => _.id === item.id && i > index),
    );
  }

  protected get limitedSource() {
    if (this.limit) {
      return (
        this.filteredSource
          && this.filteredSource.slice(0, this.multiple
            ? (this.limit + this.value.length)
            : this.limit)
      );
    }

    return this.filteredSource;
  }

  public onFilterSource(val) {
    this.filterInput = val;
  }

  onInputFn(val) {
    this.$emit('input', val);
  }

  onChange(val) {
    this.$emit('change', val);
  }
}
