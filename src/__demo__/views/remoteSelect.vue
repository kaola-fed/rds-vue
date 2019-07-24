<template>
  <div>
    <!-- <ks-remote-select v-model="condition.supplierId"
      prefix="qc-complaint"
      skey="supplierList"></ks-remote-select> -->
    <ks-remote-select v-model="supplierId"
      skey="supplierList"></ks-remote-select>
      <ks-divider :longer="20" dashed />
        <ks-divider>text</ks-divider>
        <ks-divider align="left">text</ks-divider>
        <ks-divider align="right" dashed>text</ks-divider>

        <ks-divider>
            <el-button>aaa</el-button>
        </ks-divider>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supplierId: '',
    };
  },
};
</script>
