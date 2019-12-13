<template>
  <div class="container">
    <div class="iframe">
      <Swiper></Swiper>
    </div>
  </div>
</template>

<script>
import Swiper from "../../../packages/swiper"
export default {
  name: "Test",
  components: {
    Swiper
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