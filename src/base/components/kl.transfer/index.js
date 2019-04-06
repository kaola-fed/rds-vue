import TransferPanel from './transfer.panel.vue';
import PropMixin from './mixins';

export default {
  name: 'kl-transfer',
  mixins: [PropMixin],
  components: { TransferPanel },
  data() {
    return {
      rightChecked: [],
      leftChecked: [],
      origin: [],
      destina: [],
      gridMode: 'medium',
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.origin = JSON.parse(JSON.stringify(value));
      },
    },
    value: {
      immediate: true,
      handler(value) {
        this.destina = JSON.parse(JSON.stringify(value));
      },
    },
  },
  computed: {
    leftSize() {
      return this.gridMode === 'left' ? 'large' : (this.gridMode === 'right' ? 'small' : 'medium');
    },
    rightSize() {
      return this.gridMode === 'left' ? 'small' : (this.gridMode === 'right' ? 'large' : 'medium');
    },
  },
  methods: {
    onLeftSelectChange(selected) {
      this.leftChecked = selected;
    },
    onRightSelectChange(selected) {
      this.rightChecked = selected;
    },
    removeFromRight() {
      let count = 0;
      this.rightChecked.forEach((item) => {
        const index = this.destina.indexOf(item);
        if (index !== -1) {
          count++;
          this.destina.splice(index, 1);
        }
      });
      // 提供v-model支持
      this.$emit('input', JSON.parse(JSON.stringify(this.destina)));
      this.$message.success(`成功移除${count}条数据`);
    },
    async addToRight() {
      const checked = await this.filterLeftChecked();
      if (checked === false) {
        return false;
      }
      this.destina.push.apply(this.destina, checked); // eslint-disable-line
      // 提供v-model支持
      this.$emit('input', JSON.parse(JSON.stringify(this.destina)));
      this.$message.success(`成功添加${checked.length}条数据`);
    },
    async filterLeftChecked() {
      if (!this.addValidation) {
        // 未自定义校验函数，全量返回左侧勾选
        return this.leftChecked;
      }
      const errs = [];
      const checked = [];
      this.leftChecked.forEach((item, index) => {
        const res = this.addValidation(item, this.destina);
        if (res !== true) {
          errs.push(`选中的第${index + 1}条：${res}` || `选中的第${index + 1}条：校验不通过，无法添加`);
          return;
        }
        checked.push(item);
      });

      if (errs.length) {
        const template = errs.map(err => (<p>{err}</p>));
        return await this.$msgbox({
          title: '提示',
          message: (<div class="kl-transfer-validate-notify">
          <h3>存在以下条目无法添加，确认是否继续添加操作？</h3>
        {template}
      </div>),
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          confirmButtonText: '继续',
          cancelButtonText: '放弃添加',
        }).then(() => checked).catch(() => false);
      }
      return checked;
    },
  },
};
