import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'kl-text',
})
export default class KLText extends Vue {
  @Prop()
  private content!: any;

  @Prop({ type: Number, default: 1 })
  private row!: number;

  @Prop({ type: String, default: '-' })
  private emptyText!: string;

  @Prop({ type: [String, Number], default: 'inherit' })
  private lineHeight!: string | number;

  get formatterContent() {
    return (this.content === 0 || this.content) ? this.content : this.emptyText;
  }

  get style() {
    return {
      display: '-webkit-box',
      overflow: 'hidden',
      '-webkit-box-orient': 'vertical',
      'text-overflow': 'ellipsis',
      '-webkit-line-clamp': this.row,
      'line-height': this.lineHeight,
      'overflow-wrap': 'break-word',
    };
  }
}
