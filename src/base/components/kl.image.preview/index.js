export default {
  name: 'kl-image-preview',
  props: {
    imageList: {
      type: Array,
      default: () => [],
    },
    curIndex: {
      type: Number,
      default: 0,
    },
    el: String,
  },
  data() {
    return {
      showVirtual: false,
      virtualInfo: {
        rotate: 0,
        scale: 1,
        translateX: 0,
        translateY: 0,
        mouseDownX: 0,
        mouseDownY: 0,
        dragTarget: null,
      },
      opList: [{
        name: 'zoomIn',
        icon: 'zoomin',
        fnName: 'zoomIn',
      }, {
        name: 'zoomOut',
        icon: 'zoomout',
        fnName: 'zoomOut',
      }, {
        name: 'rezoom',
        icon: 'min-size',
        fnName: 'rezoom',
      }, {
        name: 'rotate_left',
        icon: 'anticlockwise',
        fnName: 'rotateLeft',
      }, {
        name: 'rotate_right',
        icon: 'clockwise',
        fnName: 'rotateRight',
      }, {
        name: 'remove',
        icon: 'delete',
        fnName: 'onDel',
      }],
    };
  },
  methods: {
    onClose() {
      this.close();
    },
    onPrev() {
      let { imageList, curIndex } = this;
      const { length } = imageList;
      let toIndex = length - 1;

      if (curIndex > 0) {
        curIndex -= 1;
        toIndex = curIndex;
      }

      this.setCurrentTo(toIndex);
    },
    onNext() {
      let { imageList, curIndex } = this;
      const { length } = imageList;
      let toIndex = 0;

      if (curIndex < length - 1) {
        curIndex += 1;
        toIndex = curIndex;
      }

      this.setCurrentTo(toIndex);
    },
    setCurrentTo(toIndex) {
      const refs = this.$refs;
      const { curIndex } = this;

      this.showVirtual = false;
      this.virtualInfo.scale = 1;
      this.virtualInfo.rotate = 0;
      this.virtualInfo.translateX = 0;
      this.virtualInfo.translateY = 0;

      refs.fullImages[curIndex].style.opacity = 0;
      refs.fullImages[toIndex].style.opacity = 1;

      this.curIndex = toIndex;
    },
    onFn(fnName, curIndex) {
      this[fnName](curIndex);
    },
    zoomIn() {
      const { virtualInfo } = this;
      const step = this.getZoomInStep();

      this.showVirtual = true;

      virtualInfo.scale += step;
      this.$refs.virtualimage.style.transform = this.genTransform();
    },
    zoomOut() {
      const { virtualInfo } = this;
      const step = this.getZoomOutStep();
      const translateStepInfo = this.getTranslateStep(step);

      this.showVirtual = true;

      virtualInfo.scale -= step;
      virtualInfo.translateX -= translateStepInfo.xStep;
      virtualInfo.translateY -= translateStepInfo.yStep;

      this.$refs.virtualimage.style.transform = this.genTransform();
    },
    rezoom() {
      const { virtualInfo } = this;

      this.showVirtual = true;

      virtualInfo.scale = 1;
      virtualInfo.translateX = 0;
      virtualInfo.translateY = 0;

      this.$refs.virtualimage.style.transform = this.genTransform();
    },
    getZoomInStep() {
      const { virtualInfo } = this;
      const scale = +virtualInfo.scale.toFixed(1);
      const step = this.getScaleStep();

      if (scale <= 0.1) {
        return 0.1;
      }

      return step;
    },
    getZoomOutStep() {
      const { virtualInfo } = this;
      const scale = +virtualInfo.scale.toFixed(1);
      const step = this.getScaleStep();

      if (scale >= 10) {
        return 1;
      }

      return step;
    },
    getScaleStep() {
      const { virtualInfo } = this;
      const scale = +virtualInfo.scale.toFixed(1);

      if (scale > 0.1 && scale < 1.5) {
        return 0.1;
      } if (scale >= 1.5 && scale < 4) {
        return 0.5;
      } if (scale >= 4 && scale < 10) {
        return 1;
      }

      return 0;
    },
    getTranslateStep(scaleStep) {
      const { virtualInfo } = this;
      const scale = +virtualInfo.scale.toFixed(1);

      const totalSteps = (scale - 1) * 10;
      const { translateX } = virtualInfo;
      const { translateY } = virtualInfo;

      return {
        xStep: totalSteps ? (translateX / totalSteps) * scaleStep * 10 : 0,
        yStep: totalSteps ? (translateY / totalSteps) * scaleStep * 10 : 0,
      };
    },
    rotateLeft() {
      this.rotate('left');
    },
    rotateRight() {
      this.rotate('right');
    },
    rotate(dir) {
      const { virtualInfo } = this;
      const image = this.$refs.virtualimage;

      this.showVirtual = true;

      if (dir === 'right') {
        virtualInfo.rotate += 90;
      } else if (dir === 'left') {
        virtualInfo.rotate -= 90;
      }

      image.style.transform = this.genTransform();
    },
    genTransform() {
      const { virtualInfo } = this;
      return (
        `translateX(${virtualInfo.translateX}px)`
        + ` translateY(${virtualInfo.translateY}px)`
        + ` rotate(${virtualInfo.rotate}deg)`
        + ` scale(${virtualInfo.scale})`
      );
    },
    async onDel(index) {
      const { imageList } = this;
      const image = imageList[index];

      if (this.delConfirm) {
        try {
          await this.$confirm(`${this.$trans('REMOVE_CONFIRM') + image.name}?`, '确认删除');
          this.removeImage(index);
        } catch (error) {

        }
      } else {
        self.removeImage(index);
      }
    },
    removeImage(index) {
      const { imageList } = this;

      const image = imageList.splice(index, 1);

      if (!imageList[index]) {
        this.curIndex = 0;
      }
      this.$emit('remove', {
        image,
        index,
      });
      this.$update();
    },
    onMouseDown(e) {
      const { virtualInfo } = this;

      virtualInfo.mouseDownX = e.pageX;
      virtualInfo.mouseDownY = e.pageY;
      virtualInfo.dragTarget = e.target;
      virtualInfo.dragBoundary = this.getMaxMinTranslateValue();
    },
    onMouseMove(e) {
      const { virtualInfo } = this;
      const virtualImg = this.$refs.virtualimage;
      const originX = virtualInfo.mouseDownX;
      const originY = virtualInfo.mouseDownY;
      virtualInfo.dragBoundary = this.getMaxMinTranslateValue();

      const boundary = virtualInfo.dragBoundary;
      if (virtualInfo.dragTarget) {
        let translateX = e.pageX - originX;
        let translateY = e.pageY - originY;

        if (translateX > boundary.maxTranslateX) {
          translateX = boundary.maxTranslateX;
        } else if (translateX < boundary.minTranslateX) {
          translateX = boundary.minTranslateX;
        }

        if (translateY > boundary.maxTranslateY) {
          translateY = boundary.maxTranslateY;
        } else if (translateY < boundary.minTranslateY) {
          translateY = boundary.minTranslateY;
        }

        virtualInfo.translateX += translateX;
        virtualInfo.translateY += translateY;
        virtualInfo.mouseDownX = e.pageX;
        virtualInfo.mouseDownY = e.pageY;
        virtualImg.style.transform = this.genTransform();
      }
    },
    onMouseUp() {
      const { virtualInfo } = this;

      if (virtualInfo.dragTarget) {
        virtualInfo.mouseDownX = 0;
        virtualInfo.mouseDownY = 0;
        virtualInfo.dragTarget = null;
      }
    },
    onMouseWheel(e) {
      if (e.wheelDelta > 0) {
        this.zoomIn();
      } else if (e.wheelDelta < 0) {
        this.zoomOut();
      }
    },
    getMaxMinTranslateValue() {
      const virtualImg = this.$refs.virtualimage;
      const virtualZone = this.$refs.virtualzone;

      const virtualImgRect = virtualImg.getBoundingClientRect();
      const virtualZoneRect = virtualZone.getBoundingClientRect();
      const maxDeltaX = virtualZoneRect.left - virtualImgRect.left;
      const maxDeltaY = virtualZoneRect.top - virtualImgRect.top;
      const minDeltaX = virtualZoneRect.right - virtualImgRect.right;
      const minDeltaY = virtualZoneRect.bottom - virtualImgRect.bottom;

      return {
        maxTranslateX: maxDeltaX > 0 ? maxDeltaX : 0,
        maxTranslateY: maxDeltaY > 0 ? maxDeltaY : 0,
        minTranslateX: minDeltaX < 0 ? minDeltaX : 0,
        minTranslateY: minDeltaY < 0 ? minDeltaY : 0,
      };
    },
    downloadFile(file) {
      const a = document.createElement('a');
      a.download = file.name;
      fetch(file.src).then(res => res.blob().then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        a.href = blobUrl;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
      })).catch(() => {
        const url = this.urlAddDownload(file.src, file.name);
        window.open(url);
      });
    },
    urlAddDownload(url, filename = '') {
      let str = url.split('#')[0];
      if (/\?/g.test(url)) {
        str += `&download=${filename}`;
      } else {
        str += `?download=${filename}`;
      }
      if (url.split('#')[1]) {
        str += `#${url.split('#')[1]}`;
      }
      return str;
    },
  },
};
