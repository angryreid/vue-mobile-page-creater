<template>
  <div class="g-core-image-upload-btn" ref="container">
    <slot>
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
        style="width: 100%; height: 100%;"
      />
    </form>
    <div class="img-area" v-else="hasImage">
      <img :src="url" alt="">
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
      url: "",
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
    getConfig: function() {
      return {};
    },
    __dispatch(name, res, data) {
      this.$emit && this.$emit(name, res, data);
    },
    __find(str) {
      let dq = document.querySelector("#vciu-modal-" + this.formID);
      return dq.querySelector(str);
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
          return this.__dispatch("errorhandle", "TYPE ERROR");
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
        return this.__dispatch(
          "errorhandle",
          "FILE IS TOO LARGER MAX FILE IS " + formatSize
        );
      }

      if (this.multipleSize > 0 && e.target.files.length > this.multipleSize) {
        console.warn("FILE NUM IS LARGER THAN " + this.multipleSize);
        return this.__dispatch("errorhandle", "FILE NUM OVERLOAD");
      }

      this.files = e.target.files;
      this.__dispatch(
        "imagechanged",
        this.files.length > 1 ? this.files : this.files[0]
      );
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
  .g-core-text{
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
</style>

