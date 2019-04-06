<template>
<div class="kl-upload">
    <ul :style="{width: wrapWidth}">
        <li class="kl-upload-fileList-item"
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

                    <div class="kl-upload-unit-content__tip"
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
      formData: new FormData(),
    };
  },
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
@import '../index.scss'
</style>
