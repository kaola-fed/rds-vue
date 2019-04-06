import { Vue, Component } from 'vue-property-decorator';

import { JSONAPI } from '@/base/request';

@Component
export default class AuthMixin extends Vue {
  private sourceKeys: string[] = [];

  private source: { [key: string]: any[] } = {};

  private created() {
    this.getSourceByKeys(this.sourceKeys);
  }

  private onSourceFetched() {
    return 'override this method if needed';
  }

  private async getSourceByKeys(sourceKeys: string[]) {
    const { selectUrl = null } = Vue.klvue || {};

    if (!selectUrl) {
      return console.error('【KLVUE】缺少参数 >>> 使用selectMixin请配置selectUrl参数');
    }

    try {
      const keys = sourceKeys.join(',');
      let res: any = await JSONAPI.get(selectUrl(), { params: {keys} });
      res = res && res.result || res.data || {};

      sourceKeys.forEach((key) => {
        let result = res[`${key}`] || [];
        this.$set(this.source, key, [...result]);
      });

      this.onSourceFetched();
      this.$forceUpdate();
    } catch (e) {
      console.log(e);
    }
  }
}
