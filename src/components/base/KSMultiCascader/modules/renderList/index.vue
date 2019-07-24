<template>
  <ul style="width:160px;max-height:100%;overflow-x: hidden;overflow-y: auto;">
    <li
      class="li-style"
      v-for="(node, nodeIndex) in list"
      :key="guid(node)"
      @click="handleClick(node, nodeIndex, level)"
      :class="{'active-li': activeList[level - 1] === node.id}"
      @mousemove="handleMouseMove(node, nodeIndex, level)"
      @mouseout="handleMouseOut"
    >
      <p class="li-label-style" v-toolTip>
        <span @click.stop v-show="!onlyLast || (onlyLast && node.isLeaf)">
          <el-checkbox
            @change="handleCheck($event, node)"
            v-model="node.checked"
            :disabled="node.disabled"
          ></el-checkbox>
        </span>
        <span style="margin-left:5px">{{node[labelKey]}}</span>
        <i
          v-if="node.childNodes && node.childNodes.length > 0"
          class="li-label-icon el-icon-arrow-right"
        ></i>
      </p>
    </li>
  </ul>
</template>

<script lang="ts" src="./index.ts" />
