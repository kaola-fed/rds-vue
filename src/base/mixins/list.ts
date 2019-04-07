import { Vue, Component } from 'vue-property-decorator';

import _ from '@/base/utils';

@Component
export default class ListMixin extends Vue {
  private listService: any = null;

  private list: any[] = [];

  private total: number = 0;

  private pageNo: number = 1;

  private pageSize: number = 10;

  private condition: { [key: string]: any } = {};

  private selecteds: any[] = [];

  private selectedIds: any[] = [];

  private loading: boolean = false;

  private mounted() {
    if (this.shouldUpdateList()) {
      this.__getList();
    }
  }

  private shouldUpdateList() {
    // override this method if needed
    return true;
  }

  private async beforeUpdateListHandler() {
    // override this method if needed
    return new Promise((resolve) => {
      resolve();
    });
  }

  private afterUpdateListHandler(data: any) {
    // override this method if needed
    return data;
  }

  private async __getList() {
    try {
      await this.beforeUpdateListHandler();

      this.loading = true;
      const param = this.getListParam();
      const data = await this.listService(_.filterEmpty(param));
      const result = data && (data.result || data.data || {});
      this.list = (result && result.list) || (result instanceof Array && result) || [];
      this.total = (result.pagination && result.pagination.total) || result.total;

      this.afterUpdateListHandler(data);
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  private async refresh() {
    this.pageNo = 1;
    await this.__getList();
  }

  private getListParam() {
    const param = this.getExtraParam();
    const { pageNo, pageSize } = this;
    return { ...param, pageNo, pageSize };
  }

  private getExtraParam() {
    return this.condition;
  }

  private handleSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.__getList();
  }

  private handleCurrentChange(pageNo: number) {
    this.pageNo = pageNo;
    this.__getList();
  }

  private reset() {
    const { queryForm } = this.$refs;
    if (queryForm) {
      (queryForm as any).resetFields();
    }
  }

  handleSelectionChange(selected: any[]) {
    this.selectedIds = [];
    this.selecteds = [];
    selected.forEach((x) => {
      this.selecteds.push(x);
      this.selectedIds.push(x.id);
    });
  }
}
