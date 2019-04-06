<template>
  <div class="kl-transfer">
    <transfer-panel type="left"
                    ref="left"
                    :remote="remote"
                    :searchSpan="searchSpan"
                    :filterMethod="filterMethod"
                    :data="origin"
                    :columns="columns"
                    :search-ext="searchExt"
                    :size="leftSize"
                    :source="source"
                    :remote-method="remoteMethod"
                    :format-query="formatQuery"
                    @select-change="onLeftSelectChange">
      <template slot="realSearch">
        <slot name="search"></slot>
      </template>
    </transfer-panel>
    <div class="kl-transfer-opts">
      <div class="kl-transfer-grid">
          <span @click="gridMode='left'" class="f-cb" :class="{active: gridMode=='left'}">
            <i class="kl-transfer-opts__cell kl-transfer-opts__cell--large"></i>
            <i class="kl-transfer-opts__cell kl-transfer-opts__cell--right
            kl-transfer-opts__cell--small"></i>
          </span>
          <span @click="gridMode='medium'" class="f-cb" :class="{active: gridMode=='medium'}">
            <i class="kl-transfer-opts__cell kl-transfer-opts__cell--medium"></i>
            <i class="kl-transfer-opts__cell kl-transfer-opts__cell--right
            kl-transfer-opts__cell--medium"></i>
          </span>
          <span @click="gridMode='right'" class="f-cb" :class="{active: gridMode=='right'}">
            <i class="kl-transfer-opts__cell kl-transfer-opts__cell--small"></i>
            <i class="kl-transfer-opts__cell kl-transfer-opts__cell--right
            kl-transfer-opts__cell--large"></i>
          </span>
      </div>
      <div class="kl-transfer-opts__buttons">
        <el-button
          :class="['kl-transfer-opts__button', 'kl-transfer-opts__button--first']"
          @click.native="addToRight"
          :disabled="leftChecked.length === 0">
          <i class="el-icon-arrow-right"></i>
        </el-button>
        <el-button
          :class="['kl-transfer-opts__button']"
          @click.native="removeFromRight"
          :disabled="rightChecked.length === 0">
          <i class="el-icon-arrow-left"></i>
        </el-button>
      </div>
    </div>

    <!-- 正常情况下右侧搜索条件和左侧保持一致，除非用户指定了右侧搜索条件，或开启了远程搜索 -->
    <transfer-panel type="right"
                    ref="right"
                    :remote="remote"
                    :searchSpan="searchSpan"
                    :filterMethod="filterMethod"
                    :data="destina"
                    :columns="columns"
                    :search-ext="searchRightExt.length ? searchRightExt : (remote ? [] : searchExt)"
                    :size="rightSize"
                    :source="source"
                    @select-change="onRightSelectChange">
      <template slot="realSearch">
        <slot name="rightSearch"></slot>
      </template>
    </transfer-panel>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
