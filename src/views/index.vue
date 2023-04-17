<template>
  <!-- 首页 -->
  <div class="container">
    <div class="content">
      <Header />
      <div class="p1_btn" data-position="center" @click="getBtnAni(e)"></div>
      <div class="p1_product" data-position="center"></div>
    </div>
  </div>
</template>
<script setup>
  import { getNumber } from '@/api';
import Header from '@/components/Header.vue';
import { useRouter } from 'vue-router';
  const $router = useRouter()
  const getBtnAni = async e => {
    $('.p1_btn').addClass('add_Ani')
    const data = await getNumber()
    if(data.state=='ok')
    {
      // const number = data.data.no
      localStorage.setItem('number', data.data.no);
    }
    setTimeout(() => {
      $router.replace(`/map`)
    }, 1500)
  }
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background: url(@/assets/images/p1.jpg) center top no-repeat;
    background-size: cover;
  }
  .p1_btn {
    width: 432px;
    height: 432px;
    margin-left: -216px;
    top: 376px;
    background: url(@/assets/images/p1_btn.png) center center no-repeat;
    filter: grayscale(100%);
    -webkit-filter: grayscale(100%);
  }
  .p1_product {
    width: 514px;
    height: 246px;
    margin-left: -257px;
    top: 910px;
    background: url(@/assets/images/p1_product.png) center center no-repeat;
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
  .add_Ani {
    animation: btn_Ani 1.5s linear forwards;
    -webkit-animation: btn_Ani 1.5s linear forwards;
  }
</style>
