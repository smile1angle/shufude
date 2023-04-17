<template>
  <!-- 首页 -->
  <div class="container">
    <div class="content">
      <Header />
      <div class="p2_txt1" data-position="left"></div>
      <div class="p2_product" data-position="left"></div>
      <div class="p2_txt2 p2_txt" data-position="left">
        成为第<span>{{ number }}</span
        >位 <br />
        点亮北京智能睡眠的选手
      </div>
      <div class="p2_btn1" data-position="left" @click="handleShare()"></div>
      <div class="p2_btn2" data-position="right" @click="$router.replace(`/draw`)"></div>
    </div>

    <div class="share-container" ref="shareRef">
      <img class="share_bg_wrap" :src="getImageUrl('share_bg.jpg')" alt="" />

      <div class="p2_txt2" data-position="left">
        成为第<span>{{ number }}</span
        >位 <br />
        点亮北京智能睡眠的选手
      </div>
      <div class="share-qrcode-container">
        <VueQr class="share-qrcode-img" :text="qrUrl"></VueQr>
      </div>
    </div>
    <!-- showShare -->
    <Popup class="pop-window" v-model:show="showShare" position="center" @click="showShare = false" :overlay-style="{ backgroundColor: 'rgba(0,0,0,.8)' }">
      <img class="share-img-wrap" :src="img_share" alt="" />
    </Popup>
    <div class="hint" :style="showShare ? 'display:block' : 'display:none'" data-position="bottom"></div>
  </div>
</template>
<script setup>
  import Header from '@/components/Header.vue'
import { getImageUrl } from '@/utils'
import { useRouter } from 'vue-router'

  import html2canvas from 'html2canvas'
import { Popup, closeToast, showLoadingToast } from 'vant'
import { onMounted, ref } from 'vue'
import VueQr from 'vue-qr/src/packages/vue-qr.vue'
  const $router = useRouter()
  let number = ref(0)
  // number = 1235847

  const qrUrl = ref('')
  qrUrl.value = `${location.origin}`
  console.log(qrUrl.value)
  const shareRef = ref(null)
  const img_share = ref('')
  const showShare = ref(false)
  // 生成海报
  const handleShare = async () => {
    const dom = document.querySelector('.share-container')
    setTimeout(async () => {
      showLoadingToast({
        message: '加载中',
        forbidClick: true,
        className: 'voteSuccess1'
      })
      html2canvas(shareRef.value, {
        useCORS: true,
        backgroundColor: '#00ff00',
        width: Math.floor(dom.clientWidth),
        height: Math.floor(dom.clientHeight),
        x: dom.offsetLeft,
        y: dom.offsetTop
      })
        .then(async canvas => {
          img_share.value = canvas.toDataURL('image/jpeg')
          showShare.value = true
          closeToast()
        })
        .catch(err => {
          alert(err)
        })
    })
  }
  onMounted(() => {
    const number = localStorage.getItem('number');
    setTimeout(() => {
      $('.p2_txt1').animate({ left: '107px', opacity: '1' }, 1000)
      $('.p2_txt').animate({ left: '107px', opacity: '1' }, 1000)
    }, 600)
    setTimeout(() => {
      $('.p2_btn1').animate({ top: '1252px', opacity: '1' }, 1000)
      $('.p2_btn2').animate({ top: '1252px', opacity: '1' }, 1000)
    }, 800)
  })
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background: url(@/assets/images/p2.jpg) center top no-repeat;
    background-size: cover;
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
    animation: btn_Ani 0.8s linear forwards;
    -webkit-animation: btn_Ani 0.8s linear forwards;
  }
  .p2_txt1 {
    width: 258px;
    height: 75px;
    left: -107px;
    top: 953px;
    opacity: 0;
    background: url(@/assets/images/p2_txt1.png) center center no-repeat;
  }

  .p2_txt2 {
    font-family: Medium;
    font-size: 40px;
    left: 107px;
    top: 1070px;
    color: #fff;
    text-align: left;
    line-height: 60px;
  }
  .p2_txt {
    opacity: 0;
    left: 307px;
  }
  .p2_txt2 span {
    font-family: Heavy;
    color: #fff;
    background: #007fc2;
    padding: 0px 10px;
    border-radius: 18px;
    margin: 10px 10px;
    font-size: 60px;
    line-height: 60px;
  }
  .p2_product {
    width: 298px;
    height: 143px;
    margin-left: 430px;
    top: 904px;
    background: url(@/assets/images/p2_product.png) center center no-repeat;
  }
  .p2_btn1 {
    width: 250px;
    height: 87px;
    margin-left: 95px;
    top: 1152px;
    opacity: 0;
    background: url(@/assets/images/p2_btn1.png) center center no-repeat;
  }
  .p2_btn2 {
    width: 250px;
    height: 87px;
    margin-right: 95px;
    top: 1352px;
    opacity: 0;
    background: url(@/assets/images/p2_btn2.png) center center no-repeat;
  }
  @-webkit-keyframes btn_Ani {
    from {
      filter: grayscale(100%);
      -webkit-filter: grayscale(100%);
    }
    to {
      filter: grayscale(0%);
      -webkit-filter: grayscale(0%);
    }
  }

  /* 分享页 */
  .share-container {
    position: absolute;
    width: 100%;
    height: 1482px;
    /* top: 0; */
    /* left: 0; */
    top: -1500px;
    left: -1500px;
    overflow: hidden;
  }
  .share_bg_wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1482px;
  }
  .share-qrcode-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 170px;
    left: 49px;
    top: 1284px;
  }
  .share-qrcode-container .share-qrcode-img {
    width: 160px;
    height: 160px;
    border: 2px solid #ccc;
  }
  .pop-window {
    width: 100%;
    height: 100%;
    background: transparent;
  }
  .hint {
    width: 286px;
    height: 27px;
    margin-left: -143px;
    bottom: 40px;
    z-index: 2222;
    background: url(@/assets/images/hint.png) center center no-repeat;
  }
  .share-img-wrap {
    width: 640px;
    vertical-align: bottom;
  }
</style>
