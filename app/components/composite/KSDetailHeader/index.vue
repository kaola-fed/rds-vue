<template>
    <div class="header">
        <el-card>
            <div class="header-title">
                <el-row>
                    <el-col :span="16">
                        <el-row>
                            <el-col :span="subHeader ? 12 : 24">
                                <span class="header-title">{{header}}</span>
                            </el-col>
                            <el-col v-if="subHeader" :span="12">
                                <span class="header-title">{{subHeader}}</span>
                            </el-col>
                            <el-col v-if="desc" :span="24">
                                <span class="header-desc">{{desc}}</span>
                            </el-col>
                            <el-col v-if="status" :span="24">
                                <el-tag class="header__status" size="small">
                                    {{status}}
                                    <icon class="el-icon-info"></icon>
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="8" align="right">
                        <slot name="operation"/>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" src="./index.ts"></script>
<style scoped lang="scss" src="./index.scss"></style>



