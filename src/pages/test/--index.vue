<template>
  <div class="container">
    <div class="iframe">
      <!-- <a class="btn" @click="toggleShow">set avatar</a> -->
      <VueCoreImageUpload
        field="img"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="300"
        :height="300"
        url="/upload"
        :params="params"
        :headers="headers"
        :noCircle="true"
        :noSquare="true"
        img-format="png"
      ></VueCoreImageUpload>
      <img :src="imgDataUrl" />
      <!-- <VueCoreImageUpload :noSquare="true"></VueCoreImageUpload> -->
    </div>
  </div>
</template>

<script>
// import VueCoreImageUpload from "../../../packages/vue-core-image-upload/index";
import VueCoreImageUpload from "vue-image-crop-upload";

export default {
  name: "Test",
  components: {
    VueCoreImageUpload
  },
  data() {
    return {
      show: true,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  }
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