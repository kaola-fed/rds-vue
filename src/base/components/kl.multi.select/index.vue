<template>
    <el-select :value="selectedValue"
        :placeholder="placeholder"
        size="small"
        :disabled="disabled"
        :multiple="true"
        :filterable="filterable"
        :collapse-tags="collapseTags"
        @input="onInputFn($event)"
        @change="onChange($event)">
        <el-option
            v-for="item in source"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            :disabled="item.disabled">
        </el-option>
    </el-select>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>
