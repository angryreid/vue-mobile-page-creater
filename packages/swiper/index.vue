<template>
  <section class="banner" v-if="basesData.carousel&&basesData.carousel.length">
    <swiper
      :options="basesData.carousel.length>1?swiperOption:noloopSwiperOption"
      ref="basesData.carouselSwiper"
    >
      <swiper-slide v-for="(item,index) in basesData.carousel" :index="index" :key="index">
        <a class="banner-link" href="javascript:;">
          <img class="banner-img" :src="item.url" @click="gotoBanner(item)" />
        </a>
        <!-- <div class="swiper-lazy-preloader"></div> -->
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </section>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
let vm = null;

const createCID = () => {
  return "c_" + new Date().getTime();
};
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    basesData: {
      type: Object,
      default: () => ({
        c_id: "",
        carousel: [
          {
            url: "http://qiniu.lovemma.cn/%E6%9D%80%E7%8C%AA%E7%9B%98_0.png",
            c_id: createCID()
          },
          {
            url:
              "http://qiniu.lovemma.cn/%E6%96%B0%E6%89%8B%E6%B4%BB%E5%8A%A8-banner.jpg",
            c_id: createCID()
          },
          {
            url:
              "http://qiniu.lovemma.cn/%E4%BF%9D%E5%80%BC%E9%87%91%E5%8A%A0%E6%81%AF.jpg",
            c_id: createCID()
          }
        ]
      })
    },
    component_key: {
      type: String,
      default: "Swiper"
    },
    is_float: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.c_id = createCID();
    vm = this;
  },
  data() {
    return {
      swiperOption: {
        // lazy: {
        //   loadPrevNext: true
        // },
        autoplay: {
          delay: 5000000,
          disableOnInteraction: false
        },
        loop: true,
        notNextTick: true,
        pagination: {
          el: ".swiper-pagination"
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        on: {
          click: function() {
            const realIndex = this.realIndex;
            vm.gotoBanner(vm.basesData.carousel[realIndex]);
          }
        }
      },
      noloopSwiperOption: {
        autoplay: {
          delay: 5000000,
          disableOnInteraction: false
        },
        loop: false,
        notNextTick: true,
        pagination: {
          el: ".swiper-pagination"
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        on: {
          click: function() {
            const realIndex = this.realIndex;
            vm.gotoBanner(vm.basesData.carousel[realIndex]);
          }
        }
      }
    };
  },
  methods: {
    getConfig: function() {
      return {
        basesData: _.merge({}, this.basesData, { c_id: this.c_id }),
        name: this.component_key,
        is_float: this.is_float,
        c_id: this.c_id
      };
    },
    gotoBanner({ c_id, url }) {
      this.$Message.success(
        `您点击的滑动图片跳转地址: ${url}, 组件ID为: ${c_id}`
      );
    }
  }
};
</script>

<style lang="less" scoped>
.banner {
  height: 140px;
  font-size: 0;
  overflow: hidden;
  background: #ffffff;
  font-size: 0;
  &.advertisement {
    height: 80px;
    padding: 0;
    margin-top: 8px;
  }
  .banner-link {
    display: inline-block;
    width: 100%;
    height: 140px;
    // padding:0 0.24rem;
    box-sizing: border-box;
    &.advertisement {
      height: 80px;
    }
  }
  .banner-img {
    border-radius: 5px;
    overflow: hidden;
    display: block;
    width: 100%;
    height: 140px;
    &.advertisement {
      height: 80px;
    }
  }
}
</style>
