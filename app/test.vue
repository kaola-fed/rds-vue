<template>
  <div>
    <span>{{test | trim}}</span>
    <span>{{adb}}</span>
  </div>
</template>

<script>
import Utils from './utils';

export default {
  data() {
    return {
      test: '   1 234',
      adb: '',
    };
  },
  created() {
    this.adb = Utils.clone([{ a: 2, b: [4, 5] }]);
  },
};
</script>
