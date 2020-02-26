<template>
  <div>
    <h2 style="text-align: center;">4秒后返回下拉数据</h2>

    <p>[limit:5, v-model={{noId}}](v-model值为null, 多选)</p>
    <ks-select :source="list" v-model="noId" :limit="5" multiple />
    <p>[limit:5, v-model={{id0s}}] (v-model值为第[1, 2, 3, 4, 5, 6, 7, 8, 9]项，超出limit范围)</p>
    <ks-select :source="list" v-model="id0s" :limit="5" multiple />
    <p>[limit:5, v-model={{id05}}] (5秒后，v-model值为第7项，超出limit范围)</p>
    <ks-select :source="list" v-model="id05" :limit="5" />
    <p>[limit:5, v-model={{id03}}] (3秒后，v-model值为第7项，超出limit范围)</p>
    <ks-select :source="list" v-model="id03" :limit="5" />
    <p>[limit:5, v-model={{id0}}]（v-model初始值为第7项，超出limit范围）</p>
    <ks-select :source="list" v-model="id0" :limit="5" />
    <p>[limit:5, v-model={{id15}}]（5秒后，v-model值为第3项，没超出limit范围）</p>
    <ks-select :source="list" v-model="id15" :limit="5" />
    <p>[limit:5, v-model={{id13}}]（3秒后，v-model值为第3项，没超出limit范围）</p>
    <ks-select :source="list" v-model="id13" :limit="5" />
    <p>[limit:5, v-model={{id1}}]（v-model初始值为第3项，没超出limit范围）</p>
    <ks-select :source="list" v-model="id1" :limit="5" />
    <p>[limit:  , v-model={{id25}}] (5秒后，v-model值为第5项)</p>
    <ks-select :source="list" v-model="id25" />
    <p>[limit:  , v-model={{id23}}] (3秒后，v-model值为第5项)</p>
    <ks-select :source="list" v-model="id23" />
    <p>[limit:  , v-model={{id2}}] (v-model初始值为第5项)</p>
    <ks-select :source="list" v-model="id2" />
  </div>
</template>

<script>
import RdsVue from '../../index';

export default {
  data() {
    return {
      list: [],
      noId: null,
      id0ns: [],
      id0s: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      id0: 7,
      id03: null,
      id05: null,
      id1: 3,
      id13: null,
      id15: null,
      id2: 5,
      id23: null,
      id25: null,
    };
  },
  created() {
    setTimeout(() => { this.id03 = 7; this.id13 = 3; this.id23 = 5; }, 3000);
    setTimeout(() => { this.id05 = 7; this.id15 = 3; this.id25 = 5; }, 5000);
    setTimeout(() => {
      this.list = Array.from(Array(20000)).map((_, i) => ({
        id: i + 1,
        name: `这是第${i + 1}项`,
      }));
    }, 4000);
  },
};
</script>
<style lang="scss">
@include b(header-detail) {
  @include e(style) {
    margin-bottom: 0px;
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}
</style>
