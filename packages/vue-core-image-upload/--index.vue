<template>
  <div class="view">
    <!-- 写死问题 图片上传 -->
    <div class="question-img">
      <div class="flex1 upload-wrap">
        <vue-core-image-upload
          :class="{'upload-img':true,'error-img':!validation.image_1}"
          :crop="false"
          :isXhr="false"
          @imagechanged="imagechanged"
          compress="30"
        >
          <div class="show-img" v-if="goods_form.image_1">
            <img class="img" :src="goods_form.image_1" />
            <span class="iconfont icon-guanbi1 clear-img" @click="imageClear(1)"></span>
          </div>

          <span class="iconfont icon-camera icon">请上传图片</span>
        </vue-core-image-upload>
      </div>
    </div>
    <!-- 写死问题 图片上传 -->
  </div>
</template>
<script>
import VueCoreImageUpload from "./vue-upload-image";
// import lrz from "../../src/assets/lib/lrz.all.bundle";

export default {
  components: {
    "vue-core-image-upload": VueCoreImageUpload
  },
  data() {
    return {
      goods_form: {
        image_1: ""
      },
      validation: {
        image_1: true
      },
      FORM_REG: {
        image_1: "^data:image"
      }
    };
  },

  methods: {
    // 图片 1上传
    imagechanged(file) {
      this.file2img(file, "image_1");
    },
    // 文件转图片
    file2img(image_file, key) {
      const self = this;
      //  解决图片多选问题
      let file = image_file.length >= 1 ? image_file[0] : image_file;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file); //读取图片
      fileReader.addEventListener("load", function() {
        // 读取完成
        // res是base64格式的图片
        self.goods_form[key] = fileReader.result;
      });


      // lrz(file)
      //   .then(ret => {
      //     if (file.size >= ret.fileLen) {
      //       self.goods_form[key] = ret.base64;
      //     } else {
      //       const reader = new FileReader();
      //       reader.onload = function(e) {
      //         const src = e.target.result;
      //         self.goods_form[key] = src;
      //       };
      //       reader.readAsDataURL(res);
      //     }
      //   })
      //   .catch(ret => {
      //     const reader = new FileReader();
      //     reader.onload = function(e) {
      //       const src = e.target.result;
      //       self.goods_form[key] = src;
      //     };
      //     reader.readAsDataURL(res);
      //   })
      //   .always(ret => {});
    },
    // 删除图片
    imageClear(index) {
      this.goods_form["image_" + index] = "";
    },
    // 选择图片错误
    errorhandle(res) {
      //  TODO 发现问题并解决问题
      // errorhandle
      if (res.errcode == 0) {
        this.src = res.data.src;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@background: #f7f7f7;
@gWhilt: #ffffff;
@colorFontBlack: #434343;
@danger-color: #f7210a;

input {
  background: none;
  outline: none;
  border: 0px;
  border-radius: 0;
}

.icon-camera {
  color: #f6c345;
}
.flex1 {
  flex: 1;
}
.view {
  width: 100%;
  background-color: @background;
  .question-img {
    border-radius: 0.1rem;
    width: 100%;
    box-shadow: 0.02rem 0.02rem 0.02rem @background;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    background-color: @gWhilt;
    height: 3.42rem;
    box-shadow: 0px -0.1rem 0.1rem 0px rgba(209, 209, 209, 0.16);
    border-radius: 0.1rem;
    padding: 0.1rem 0.32rem;
    .hd {
      color: @colorFontBlack;
      font-size: 0.3rem;
      font-weight: bold;
    }
    .upload-wrap {
      height: 2.36rem;
      .error-img {
        border: 1px solid red !important;
      }
      .upload-img {
        position: relative;
        width: 100%;
        height: 2.21rem;
        border-radius: 0.1rem;
        border: solid 1px #e1e1e1;
        .icon {
          font-size: 0.8rem;
          margin: auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .show-img {
          position: absolute;
          width: 2.94rem;
          height: 2.21rem;
          top: 0;
          left: 0;
          z-index: 1000;
          .img {
            position: absolute;
            max-width: 100%;
            max-height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .clear-img {
            position: absolute;
            top: 0.1rem;
            right: 0.1rem;
          }
        }
      }
    }
  }
}
</style>

