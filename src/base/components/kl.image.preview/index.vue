<template>
  <div class="kl-image-preview" @mouseup="onMouseUp($event)">
    <div class="kl-image-preview__close" @click="onClose()"></div>
    <div class="kl-image-preview-slide" @mousewheel="onMouseWheel($event)">
      <span class="kl-image-preview-slide-nav kl-image-preview-slide-nav--pre"
            @click="onPrev()">
        <i class="kl-icon kl-icon--arrow-left kl-image-preview-slide-nav__icon"></i>
      </span>
      <ul class="kl-image-preview-slide-images">
        <li v-for="(img, index) in imageList"
            :key="img.name" class="kl-image-preview-slide-images-item"
            ref="fullImages"
            :class="{'is-current': index === curIndex}"
            v-show="!showVirtual"
            :style="{ opacity: index === curIndex ? 1 : 0 }">
          <img class="kl-image-preview-slide-images-item__img"
               ref="fullImage" :src="img.src" :alt="img.name" :draggable="false" />
        </li>
      </ul>
      <span class="kl-image-preview-slide-nav kl-image-preview-slide-nav--next"
            @click="onNext()">
        <i class="kl-icon kl-icon--arrow-right kl-image-preview-slide-nav__icon"></i>
      </span>
      <ul class="kl-image-preview-slide-operate">
        <li v-for="op in opList"
            :key="op.fnName"
            class="kl-image-preview-slide-operate-item"
            :style="{'margin-right': op.name === 'zoomIn' ? '30px' : 0}">
          <template
            v-if="imageList[curIndex]
            && (imageList[curIndex].status === 'success'
            || imageList[curIndex].status === undefined) && op.name === 'remove'">
            <i class="kl-icon kl-icon--download"
               @click="downloadFile(imageList[curIndex])"></i>
          </template>
          <template v-else-if="op.name === 'zoomIn'">
            <i class="kl-icon"
               :class="`kl-icon--${op.icon}`"
               @click="onFn(op.fnName, curIndex)"></i>
            <span class="kl-image-preview-slide-operate-item__scale">
              {{parseInt(virtualInfo.scale * 100)}}%
            </span>
          </template>
          <template v-else>
            <i class="kl-icon"
               :class="`kl-icon--${op.icon}`"
               @click="onFn(op.fnName, curIndex)"></i>
          </template>
        </li>
      </ul>
      <ul class="kl-image-preview-slide-stage"
          ref="virtualzone"
          :style="{ opacity: showVirtual ? 1 : 0 }">
        <li ref="virtualimage"
            class="kl-image-preview-slide-stage-imgwrap"
            @mousedown="onMouseDown($event)"
            @mousemove="onMouseMove($event)"
            @mouseup="onMouseUp($event)">
          <img class="kl-image-preview-slide-stage-imgwrap__img"
               :src="imageList[curIndex] && imageList[curIndex].src"
               :alt="imageList[curIndex] && imageList[curIndex].name"
               :draggable="false" />
        </li>
      </ul>
    </div>
    <div class="kl-image-preview-thumbnail">
      <div class="kl-image-preview-thumbnail__name"
           :title="imageList[curIndex] && imageList[curIndex].name">
        {{imageList[curIndex] && imageList[curIndex].name}}
      </div>
      <ul class="kl-image-preview-thumbnail-images">
        <li v-for="(img, index) in imageList"
            :key="img.src"
            class="kl-image-preview-thumbnail-images-item"
            :class="{'is-current': index === curIndex}"
            @click="setCurrentTo(index)">
          <img class="kl-image-preview-thumbnail-images-item__img"
               :src="img.src" :alt="img.name" :draggable="false" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style scoped lang="scss" src="./index.scss"></style>
