import { Vue, Component } from 'vue-property-decorator';

import { JSONAPI } from '@/base/request';

@Component
export default class AuthMixin extends Vue {
  private authParams: string[] = [];

  private authMaps: { [key: string]: boolean } = {};

  private async created() {
    const { authUrl = '', transferAuthResult = null } = Vue.klvue || {};

    if (!authUrl || !transferAuthResult) {
      return console.error('【KLVUE】缺少参数 >>> 使用AuthMixin请配置authUrl参数和transferAuthResult参数');
    }

    if (this.authParams.length) {
      const json: any = await JSONAPI.post(authUrl, {
        displayRequestUrls: this.authParams,
      });
      const data = json.result || json.data || {};
      const urls = transferAuthResult(data) || [];
      urls.forEach((item) => {
        this.$set(this.authMaps, item.urlKey, item.url);
      });
    }
  }
}
