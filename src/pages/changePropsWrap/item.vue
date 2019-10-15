<template>
  <div class="propsTypeWrap">
    <!-- 属性为上传图片 -->
    <template v-if="name === 'imgComponent'">
      <VueImageUpload @imageChanged="handleImage"></VueImageUpload>
      <div class="changePropsItemKey">图片路径</div>
      <a-input
        :value="value.url"
        @input="$emit('input', {...value,...{url : $event.target.value}})"
      />
      <div class="changePropsItemKey">热区开关</div>

      <a-switch
        :defaultChecked="value.switch"
        @change="$emit('input', {...value,...{switch : $event}})"
      />
      <template v-if="value.switch">
        <template v-for="(item, index) in value.hot_area_list">
          <div class="propsTypeArrayItemWrap" :key="index">
            <a-button
              v-if="value.hot_area_list.length > 1"
              @click="handleRemoveItem(index)"
              class="propsTypeArrayItemRemove"
              type="danger"
              shape="circle"
              icon="minus"
            ></a-button>
            <div class="changePropsItemKey">热区背景（方便配置使用，线上自动透明）</div>
            <a-input
              :value="item.background_color"
              @input="handleHotAreaItem(index, 'background_color', $event)"
            />
            <div class="changePropsItemKey">热区X:</div>
            <a-input :value="item.x" @input="handleHotAreaItem(index, 'x', $event.target.value)" />

            <div class="changePropsItemKey">热区Y:</div>
            <a-input :value="item.y" @input="handleHotAreaItem(index, 'y', $event.target.value)" />

            <div class="changePropsItemKey">热区宽度</div>
            <a-input :value="item.w" @input="handleHotAreaItem(index, 'w', $event.target.value)" />

            <div class="changePropsItemKey">热区高度</div>
            <a-input :value="item.h" @input="handleHotAreaItem(index, 'h', $event.target.value)" />
          </div>
        </template>
      </template>
      <a-button type="primary" class="propsTypeArrayAdd" @click="handleAddItem">新增热区</a-button>
    </template>
  </div>
</template>

<script>
import VueImageUpload from "../../components/vue-upload-img";
export default {
  name: "PropsItem",
  props: {
    value: {
      type: Object
    },
    name: {
      type: String
    }
  },
  components: {
    VueImageUpload
  },
  mounted: function() {
    window.addEventListener("message", this.onMsg);
  },
  beforeDestroy: function() {
    window.removeEventListener("message", this.onMsg);
  },
  methods: {
    onMsg: function({ data }) {
      const { type } = data;

      /**
       * 添加组件
       */
      switch (type) {
        case "hot_area_change":
          this.showLog(data);
          this.hotAreaChange(data);
          break;
        default:
          break;
      }
    },

    /**
     * 打印log
     */
    showLog(data) {
      console.group("Props 收到消息 " + new Date().toLocaleTimeString());
      console.log(data);
      console.groupEnd();
    },
    /**
     * 数组追加一条
     */
    handleAddItem: function() {
      let newValue = this.value;
      let newItem = {};
      if (newValue[0]) {
        for (let item in newValue[0]) {
          newItem[item] = newValue[0][item];
        }
        newValue.push(newItem);
        this.$emit("input", newValue);
      }
    },
    /**
     * 数组移除单条
     */
    handleRemoveItem: function(index) {
      let newValue = [].concat(this.value);
      newValue.splice(index, 1);
      this.$emit("input", newValue);
    },
    /**图片上传
     *
     */
    handleImage(url) {
      this.$emit("input", { ...this.value, ...{ url } });
    },
    handleHotAreaItem(index, key, target_value) {
      this.value.hot_area_list[index][key] = target_value;
      this.$emit("input", this.value);
    },
    /**
     * 热区修改
     *
     */
    hotAreaChange({ data }) {
      const { index } = data;
      const hot_obj = this.value.hot_area_list[index];
      const prop_arr = ["x", "y", "w", "h"];
      prop_arr.forEach(prop => {
        if (Number(data[prop]) - Number(hot_obj[prop]) != 0) {
          this.handleHotAreaItem(index, prop, data[prop]);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.button {
  width: 100%;
  height: 40px;
  background-color: #ffb200;
  color: #ffffff;
  text-align: center;
  line-height: 40px;
  border-radius: 40px;
  cursor: pointer;
}
</style>
