<template>
  <div class="container">
    <template v-if="!imgComponent.url">
      <div class="text">输入图片路径或上传图片</div>
    </template>
    <template v-else>
      <div class="text" v-if="imgError">获取图片失败（请检查路径是否出错）</div>
      <div v-else class="hot-area" ref="hot-area">
        <img :src="imgComponent.url" alt />
        <VueDragResize
          :isActive="true"
          :w="200"
          :h="200"
          :parentW="bounding_width"
          :parentH="bounding_height"
          :parentLimitation="true"
          v-on:resizing="resize"
          v-on:dragging="resize"
        >
          <h3>Hello World!</h3>
          <p>{{ top }} х {{ left }}</p>
          <p>{{ width }} х {{ height }}</p>
        </VueDragResize>
      </div>
    </template>
  </div>
</template>
<script>
import VueDragResize from "vue-drag-resize";
export default {
  props: {
    imgComponent: {
      type: Object,
      default: () => ({ url: "" })
    }
  },
  components: {
    VueDragResize
  },
  data() {
    return {
      imgError: false,
      bounding_height: 0,
      bounding_width: 0,
      width: 0,
      height: 0,
      top: 0,
      left: 0
    };
  },
  watch: {
    "imgComponent.url"(newVal) {
      if (!newVal) return;
      let img = new Image();
      img.src = this.imgComponent.url;
      img.onload = () => {
        this.imgError = false;
        this.getBounding();
      };
      img.onerror = () => {
        this.imgError = true;
      };
    }
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
      return false;
    },
    getBounding() {
      let hot_area = this.$refs["hot-area"];
      this.bounding_height = hot_area.clientHeight;
      this.bounding_width = hot_area.clientWidth;
    },
    getConfig: function() {
      return {
        imgComponent: this.imgComponent
      };
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  .text {
    background: rgba(204, 204, 204, 0.2);
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hot-area {
    width: 100%;
    height: auto;
    position: relative;
  }
  img {
    width: 100%;
    height: auto;
  }
}
</style>