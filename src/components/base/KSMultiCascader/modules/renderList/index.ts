/* eslint-disable */
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
  directives: {
    toolTip: {
      inserted(el) {
        /* eslint-disable-next-line no-param-reassign */
        el.title = el.scrollWidth > el.offsetWidth ? el.innerText : '';
      },
    },
  }
})
export default class RenderList extends Vue {
  @Prop({ type: Array, default: () => [] }) activeList

  @Prop({ type: Array, default: () => [] }) list

  @Prop({ type: [Number, String] }) level

  @Prop({ type: String, default: 'label' }) labelKey

  @Prop({ type: String, default: 'click' }) expandTrigger

  @Prop({ type: Boolean, default: false }) onlyLast

  oldValue = {
    oldNode: null,
    oldLevelIndex: null,
    oldLevel: null,
  }

  handleMouseOut() {
    this.oldValue = {
      oldNode: null,
      oldLevelIndex: null,
      oldLevel: null,
    };
  }

  // mouseEnter会一直触发，然后阻止了click事件，改为mouseMove事件
  handleMouseMove(node, levelIndex, level) {
    if (this.expandTrigger !== 'hover') {
      return false
    }
    let { oldNode, oldLevelIndex, oldLevel } = this.oldValue
    if (
      (node === oldNode) &&
      (oldLevelIndex === levelIndex) &&
      (oldLevel === level)
    ) {
      return false
    }
    this.oldValue = {
      oldNode: node,
      oldLevelIndex: levelIndex,
      oldLevel: level,
    }

    this.$emit('handle-click', node, levelIndex, level)
  }

  handleClick(node, levelIndex, level) {
    if (this.expandTrigger === 'click') {
      this.$emit('handle-click', node, levelIndex, level);
    }
  }

  handleCheck(v, node) {
    node.checked = v;
    this.$emit('handle-check', node);
  }

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0
      let v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    });
  }
}