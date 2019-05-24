<template>
  <div class="kl-divider"
       :class="[
        'kl-divider--' + type,
        hasChild ? 'kl-divider-text--' + align : '',
        {'kl-divider-text': hasChild, 'kl-divider-text--dashed':
        dashed&&hasChild, ' kl-divider--dashed': dashed},
    ]"
       :style="longer ? longerStyle : null">
    <div v-if="hasChild" class="kl-divider-inner-text">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
