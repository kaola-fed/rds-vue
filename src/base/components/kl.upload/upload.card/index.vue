<template>
<div class="kl-upload">
    <ul>
        <el-dropdown v-if="fileList.length > 0" :hide-on-click="true" trigger="click">
            <li class="kl-upload-fileList-item"
                v-if="fileList.length > 0"
                @click="toggle">
                <div class="kl-upload-unit">
                    <div class="kl-upload-unit-content">
                        <img v-if="entryFile.type === 'image'"
                            class="kl-upload-unit-content__img"
                            :src="entryFile.url" />
                        <span v-else-if="entryFile.type === 'unknow'"
                            class="kl-upload-unit-content__text">未知</span>
                        <span v-else-if="entryFile.type === 'pdf'"
                            class="kl-upload-unit-content__text">PDF</span>
                        <span v-else
                            class="kl-upload-unit-content__text">{{(entryFile.type || '').toUpperCase()}}</span>
                        <span class="kl-upload-unit-content__tip kl-upload-unit-content__tip--count">{{fileCount}}</span>
                    </div>
                </div>
            </li>

            <el-dropdown-menu slot="dropdown" class="kl-upload-fileList" :style="{width: wrapWidth}">
            <li class="kl-upload-fileList-item"
                :style="{width: fileUnitWidth + 'px'}"
                v-for="(file, index) in fileList" :key="`${file.url}${index}`"
                v-if="file.flag != 2">
                <div class="kl-upload-unit">
                    <div class="kl-upload-unit-content">
                        <img v-if="file.type === 'image'"
                            class="kl-upload-unit-content__img"
                            :src="file.url"
                            @click="onPreview(file)" />

                        <span v-else-if="file.type === 'unknow'"
                            class="kl-upload-unit-content__text"
                            @click="onPreview(file)">未知</span>

                        <span v-else-if="file.type === 'pdf'"
                            class="kl-upload-unit-content__text"
                            @click="onPreview(file)">PDF</span>
                        <span v-else
                            class="kl-upload-unit-content__text"
                            @click="onPreview(file)">{{file.type.toUpperCase()}}</span>

                        <div class="kl-upload-unit-content__tip kl-upload-unit-content__tip--remove"
                            v-if="!readonly"
                            @click="onRemove(file)">
                              <i class="el-icon-error"></i>
                        </div>

                        <div :class="['kl-upload-unit-content-status',
                             `kl-upload-unit-content-status--${file.status}`]">
                            <span v-if="file.status === 'fail'">
                                失败<i class="kl-upload-unit__icon--fail"></i>
                            </span>

                            <span v-if="file.status === 'success'">
                                <a href="javascript:;" @click="onDownLoad(file)">
                                    下载<i class="kl-upload-unit__icon--download"></i>
                                </a>
                            </span>
                        </div>
                    </div>
                    <span class="kl-upload-unit__name" :title="file.name">{{file.name}}</span>
                </div>
            </li>
            </el-dropdown-menu>
        </el-dropdown>

        <li class="kl-upload-opt" v-if="showAddBtn" @click="onAddBtnClick"
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover="onDragOver"
            @drop="onDragDrop">
            <div :class="['kl-upload-opt-wrap', {'kl-upload-opt-wrap--dragover': dragover}]">
                <span class="kl-upload-opt-ct">
                    <i class="kl-icon kl-icon--add kl-upload-opt-ct__icon"></i>
                    上传文件
                </span>
            </div>
        </li>
    </ul>
    <form method="POST" target="iframe{_id}" :enctype="encType" ref="form">
        <input type="file"
            ref="inputNode"
            :name="name"
            :multiple="multiple ? true : false"
            :accept="accept"
            v-show="false"
            @change="onFileSelectChange" />
    </form>
</div>

</template>

<script>
import ConstMixin from '../mixins/const';
import PropMixin from '../mixins/prop';
import BaseMixin from '../mixins/base';

export default {
  mixins: [ConstMixin, PropMixin, BaseMixin],
  data() {
    return {
      fileCount: 0,
      entryFile: {},
      fileListWrapVisible: false,
      formData: new FormData(),
    };
  },
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.entryFile = this.__getLastSuccess();
    this.fileCount = this.__getFileCount();
  },
  watch: {
    fileList: {
      deep: true,
      handler() {
        this.entryFile = this.__getLastSuccess();
        this.fileCount = this.__getFileCount();
      },
    },
  },
  methods: {
    toggle() {
      this.fileListWrapVisible = !this.fileListWrapVisible;
    },
    __getLastSuccess() {
      const fileList = [...this.fileList];
      return fileList.reverse().find(file => file.status === 'success') || {};
    },
  },
};
</script>

<style scoped lang="scss">
@import '../index.scss'
</style>
