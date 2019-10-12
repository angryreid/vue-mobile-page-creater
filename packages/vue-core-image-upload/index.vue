<template>
  <div class="g-core-image-upload-btn" ref="container">
    <slot v-if="!hasImage">
      <div class="g-core-text">{{text}}</div>
    </slot>
    <form
      class="g-core-image-upload-form"
      v-if="!hasImage"
      method="post"
      enctype="multipart/form-data"
      action
      style
    >
      <input
        v-bind:disabled="uploading"
        v-bind:id="'g-core-upload-input-' + formID"
        v-bind:name="name"
        v-bind:multiple="multiple"
        type="file"
        v-bind:accept="inputAccept"
        v-on:change="handleChange"
        style="width: 30%; height: 100%;cursor: pointer;"
      />
    </form>
    <div class="img-area" :class="{'img-area-config': config_model }" v-else="hasImage">
      <img :src="url" alt />
      <div class="title" v-if="config_model">{{file_name}}</div>
      <div class="del" v-if="config_model" @click="imageClear">
        <img src="../../src/assets/round_close.svg" alt />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: "请上传图片"
    },
    extensions: {
      type: String,
      default: "png,jpg,jpeg,gif,svg,webp"
    },
    inputOfFile: {
      type: String,
      default: "files"
    },
    maxFileSize: {
      type: Number,
      default: 1024 * 1024 * 100
    },
    inputAccept: {
      type: String,
      default: "image/jpg,image/jpeg,image/png,image/gif"
    },
    isXhr: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
      default: function() {
        return {};
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    multipleSize: {
      type: Number,
      default: 0
    },
    compress: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      files: [],
      hasImage: false,
      options: this.props,
      uploading: false,
      file_name: "",
      url: "",
      config_model: true,
      formID: (Math.random() * 10000 + "").split(".")[0]
    };
  },

  computed: {
    name() {
      if (this.multiple) {
        return this.inputOfFile + "[]";
      }
      return this.inputOfFile;
    }
  },

  methods: {
    // 文件转图片
    file2img(image_file, key) {
      //  解决图片多选问题
      let file = image_file.length >= 1 ? image_file[0] : image_file;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file); //读取图片
      fileReader.addEventListener("load", () => {
        // 读取完成
        // res是base64格式的图片
        this[key] = fileReader.result;
        this.file_name = file.name;
        this.hasImage = true;
        this.$emit("componentChange")
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
    imageClear() {
      this.url = this.file_name = "";
      this.hasImage = false;
    },
    getConfig: function() {
      return {
        url: this.url
      };
    },
    __dispatch(name, res, data) {
      this.$emit && this.$emit(name, res, data);
    },
    handleChange(e) {
      let inputDOM = document.querySelector(
        "#g-core-upload-input-" + this.formID
      );
      let fileVal = inputDOM.value.replace(/C:\\fakepath\\/i, "");

      let fileExt = fileVal.substring(fileVal.lastIndexOf(".") + 1);
      const extensionsArr = this.extensions.split(",");
      if (extensionsArr.length > 1) {
        var reg = new RegExp("^[" + extensionsArr.join("|") + "]+$", "i");
        if (!reg.test(fileExt)) {
          // return this.__dispatch("errorhandle", "TYPE ERROR");
        }
      }
      if (e.target.files[0].size > this.maxFileSize) {
        var formatSize;
        if (parseInt(this.maxFileSize / 1024 / 1024) > 0) {
          formatSize = (this.maxFileSize / 1024 / 1024).toFixed(2) + "MB";
        } else if (parseInt(this.maxFileSize / 1024) > 0) {
          formatSize = (this.maxFileSize / 1024).toFixed(2) + "kB";
        } else {
          formatSize = options.maxFileSize.toFixed(2) + "Byte";
        }
        console.warn("FILE IS TOO LARGER MAX FILE IS " + formatSize);
        // return this.__dispatch(
        //   "errorhandle",
        //   "FILE IS TOO LARGER MAX FILE IS " + formatSize
        // );
      }

      if (this.multipleSize > 0 && e.target.files.length > this.multipleSize) {
        console.warn("FILE NUM IS LARGER THAN " + this.multipleSize);
        // return this.__dispatch("errorhandle", "FILE NUM OVERLOAD");
      }

      this.files = e.target.files;
      this.file2img(this.files, "url");
      // this.__dispatch(
      //   "imagechanged",
      //   this.files.length > 1 ? this.files : this.files[0]
      // );
      // 解决选中同一张图片 不发生change事件问题
      inputDOM.value = "";
    }
  }
};
</script>
<style lang="less" scoped>
.g-core-image-upload-btn {
  position: relative;
  overflow: hidden;
  text-align: center;
  .g-core-text {
    background: rgba(204, 204, 204, 0.2);
    height: 61px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.g-core-image-upload-form {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  min-height: 61px;
  opacity: 0;
}
.img-area {
  transition: 0.3s cubic-bezier(0.3, 0, 0.2, 1);
  position: relative;
  .title,
  .del {
    display: block;
    position: absolute;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 0.18rem;
    bottom: 0;
    width: 100%;
    border-radius: 1px;
    text-align: center;
    background: rgba(0, 0, 0, 0.6);
    color: #ffffff;
  }
  .del {
    top: 20px;
    right: 20px;
    width: 24px;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: auto;
  }
}
.img-area-config {
  &:hover {
    transform: scale(1.02);
    .title,
    .del {
      display: block;
    }
  }
}
</style>

