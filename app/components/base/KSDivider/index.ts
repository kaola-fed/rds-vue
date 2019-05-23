import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
    name: 'kl-divider',
})
export default class KLDivider extends Vue {
    /* 分割线类型 horizontal/vertical */
    @Prop({ type: String, default: 'horizontal' })
    private type!: string;

    /* 文本位置 left/center/right */
    @Prop({ type: String, default: 'center' })
    private align!: string;

    /* 是否虚线 */
    @Prop({ type: Boolean, default: false })
    private dashed!: boolean;

    /* longer,两边加长的长度 */
    @Prop({ type: Number, default: 0 })
    private longer!: number;

    get hasChild() {
        return this.$slots.default;
    }

    get longerStyle() {
        const style: any = {};
        style.width = 'auto';
        style['margin-left'] = `-${this.longer}px`;
        style['margin-right'] = `-${this.longer}px`;
        return style;
    }
}
