<template>
  <div class="container">
    <template v-if="!imgComponent.url">
      <div class="text">输入图片路径或上传图片</div>
    </template>
    <template v-else>
      <div class="text" v-if="imgError">获取图片失败（请检查路径是否出错）</div>
      <img v-else :src="imgComponent.url" alt />
    </template>
  </div>
</template>
<script>
export default {
  props: {
    imgComponent: {
      type: Object,
      default: () => ({ url: "" })
    }
  },
  data() {
    return {
      imgError: false
    };
  },
  watch: {
    "imgComponent.url"(newVal) {
      if (!newVal) return;
      let img = new Image();
      img.src = this.imgComponent.url;
      img.onload = () => {
        this.imgError = false;
      };
      img.onerror = () => {
        this.imgError = true;
      };
    }
  },
  methods: {
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
  img {
    width: 100%;
    height: auto;
  }
}
</style>