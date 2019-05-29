import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'ks-detail-header',
})
export default class KSDetailHeader extends Vue {
    /* 标题 */
    @Prop({ type: String, default: '' })
    private header!: String;

    /* 子标题 */
    @Prop({ type: String, default: '' })
    private subHeader!: String;

    /* 状态 */
    @Prop({ type: String, default: '' })
    private status!: String;

    /* 描述 */
    @Prop({ type: String, default: '' })
    private status!: String;
};