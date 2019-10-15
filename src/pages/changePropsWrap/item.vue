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
      <a-button type="primary" class="propsTypeArrayAdd" @click="hotAreaSwitch">热区开关</a-button>
      <template>
        <a-button type="primary" class="propsTypeArrayAdd" @click="handleAddItem">追加一条数据</a-button>
      </template>
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
  methods: {
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
    hotAreaSwitch(value){
      this.$emit("input", {...this.value, ...{switch: !value.switch}})
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
