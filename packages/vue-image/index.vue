<template>
  <div class="container">
    <template v-if="!imgComponent.url">
      <div class="text">输入图片路径或上传图片</div>
    </template>
    <template v-else>
      <div class="text" v-if="imgError">获取图片失败（请检查路径是否出错）</div>
      <div v-else class="hot-area-img" ref="hot-area">
        <img :src="imgComponent.url" alt />
        <div class="hot-area" v-if="imgComponent.switch">
          <VueDragResize
            v-for="(hot,index) in imgComponent.hot_area_list"
            :style="{'background-color': hot.background_color}"
            :key="index"
            :isActive="hot.active"
            :w="Number(hot.w)"
            :h="Number(hot.h)"
            :x="Number(hot.x)"
            :y="Number(hot.y)"
            :parentW="bounding_width"
            :parentH="bounding_height"
            :parentLimitation="true"
            v-on:dragstop="resize(arguments, index)"
            v-on:resizing="resize(arguments, index)"
          ></VueDragResize>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import VueDragResize from "vue-drag-resize";
import { debounce } from "lodash";
export default {
  props: {
    imgComponent: {
      type: Object,
      default: () => ({
        url: "",
        switch: false,
        hot_area_list: [
          {
            active: true,
            background_color: "#ffffff",
            w: 50,
            h: 50,
            x: 0,
            y: 0
          }
        ]
      })
    }
  },
  components: {
    VueDragResize
  },
  data() {
    return {
      imgError: false,
      bounding_height: 0,
      bounding_width: 0
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
    resize: debounce(function(args, index) {
      const newRect = args[0];
      this.pushMsg({
        type: "hot_area_change",
        data: {
          index: index,
          w: newRect.width,
          h: newRect.height,
          x: newRect.left,
          y: newRect.top
        }
      });
    }, 300),
    /**
     * 向父级发送消息
     */
    pushMsg: function(data) {
      top.postMessage(data, location.href.replace("view", ""));
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
  .hot-area-img {
    position: relative;
    width: 100%;
    height: auto;
    .hot-area {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
    }
  }
  img {
    width: 100%;
    height: auto;
  }
}
</style>