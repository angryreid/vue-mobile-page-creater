<template>
  <div class="container">
    <div class="iframe">
      <VueCoreImageUpload></VueCoreImageUpload>
    </div>
  </div>
</template>

<script>
import VueCoreImageUpload from "../../../packages/vue-core-image-upload/index";

export default {
  name: "Test",
  components: {
    VueCoreImageUpload
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  padding: 80px 10px;
  border-radius: 40px;
  background-color: black;
  display: inline-block;
  box-sizing: border-box;
  margin-left: 20px;
  .iframe {
    width: 375px;
    height: 667px;
    background-color: #fff;
  }
  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    bottom: 15px;
    left: 172.5px;
    border-radius: 50%;
  }
}
</style>  