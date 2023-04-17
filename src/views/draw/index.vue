<template>
  <div class="container draw">
    <div class="content">
      <Header />
      <!-- 奖品区域 -->
      <div class="p3_box" data-position="center">
        <LuckyGrid ref="myLucky" :activeStyle="activeStyle" :defaultStyle="defaultStyle" width="585px" height="533px" :prizes="prizes" :buttons="buttons" @start="startCallback" @end="endCallback" />
      </div>
      <div class="p3_txt" data-position="center"></div>
    </div>
    <!-- showShare -->
    <!-- 没中奖的弹窗 -->
    <Popup round class="pop-window" v-model:show="showFail" position="center" @click="showFail = false" :overlay-style="{ backgroundColor: 'rgba(0,0,0,.8)' }">
      <img class="share-img-wrap" :src="getImageUrl('showFail.png')" alt="" />
    </Popup>
    <!-- 中奖弹窗 -->
    <Popup round :close-on-click-overlay="closeFlag" class="pop-window" v-model:show="showSuccess" position="center" :overlay-style="{ backgroundColor: 'rgba(0,0,0,.8)' }">
      <!-- 奖品信息窗口 -->
      <div class="successBox draw_pop_box" :style="infoFlag ? 'display:none' : 'display:block'">
        <img :src="gift" alt="" srcset="" />
        <button data-position="center" @click="infoFlag = true">填写信息</button>
      </div>
      <!-- 填写资料信息窗口 -->
      <div class="infoBox draw_pop_box" :style="infoFlag ? 'display:block' : 'display:none'">
        <van-form ref="form">
          <van-cell-group inset>
            <!-- 通过 pattern 进行正则校验 -->
            <van-field v-model="username" placeholder="姓名" :rules="nameRules" />
            <!-- 通过 validator 进行函数校验 -->
            <van-field v-model="phone" style="margin-top: 61px" type="tel" :rules="phoneRules" placeholder="手机号" />
            <!-- 通过 validator 返回错误提示 -->
          </van-cell-group>
          <button data-position="center" native-type="button" @click="applyInfo()">提交信息</button>
        </van-form>
        <div class="info_name" data-position="left"></div>
        <div class="info_phone" data-position="left"></div>
        <div class="info_txt" data-position="center"></div>
      </div>
      <!-- 信息填写成功之后的地图窗口 -->
      <div class="mapBox draw_pop_box">
        <div class="map_txt1" data-position="center"></div>
        <div class="map" @click="lookLocation()" data-position="center"></div>
        <div class="map_txt2" data-position="center"></div>
      </div>
    </Popup>
  </div>
</template>

<script setup>
  import { getDraw, submitInfo } from '@/api'
import Header from '@/components/Header.vue'
import { getImageUrl, lookLocation } from '@/utils'
import { Popup, showFailToast } from 'vant'
import { ref } from 'vue'
  // 抽奖成功后之后点击遮罩是否关闭
  const closeFlag = ref(false)
  const form = ref(null)
  // 姓名
  const username = ref('')
  // 电话
  const phone = ref('')
  const nameRules = [
    { required: true, message: '请输入姓名' },
    { pattern: /^[\u4E00-\u9FA5A-Za-z]+$/, message: '请输入正确的姓名' }
  ]
  const phoneRules = [
    { required: true, message: '请输入联系方式' },
    { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '请输入正确的11位大陆电话' }
  ]
  // const name_validator = val => /^[\u4E00-\u9FA5A-Za-z]+$/.test(val)
  // const phone_validator = val => /(?:\(?[0\+]?\d{1,3}\)?)[\s-]?(?:0|\d{1,4})[\s-]?(?:(?:13\d{9})|(?:\d{7,8}))/.test(val)
  // 控制信息填写弹窗的展示
  const infoFlag = ref(false)
  // 失败的弹窗控制
  let showFail = ref(false)
  // 成功的弹窗控制
  let showSuccess = ref(false)
  // 抽奖盒子的index
  let prizeIndex = ref('')
  // 奖品ID
  let prizeId = ref('')
  // 奖品展示的
  let gift = ref('')
  const myLucky = ref(null)
  const prizes = [
    { x: 0, y: 0, prize: true }, //0 左上角奖品盒子
    { x: 1, y: 0, prize: false }, //1
    { x: 2, y: 0, prize: true }, //2
    { x: 2, y: 1, prize: false }, //3
    { x: 2, y: 2, prize: true }, //4
    { x: 1, y: 2, prize: false }, //5
    { x: 0, y: 2, prize: true }, //6
    { x: 0, y: 1, prize: false } //7
  ]
  const buttons = [
    {
      x: 1,
      y: 1,
      fonts: [{ text: '', top: '25%' }]
    }
  ]
  const activeStyle = {
    background: 'rgba(134, 156, 250, 0.7)'
  }
  const defaultStyle = {
    background: 'transparent'
  }

  const startCallback = async () => {
    // 点击开始调用奖品id的接口
    // 判断是否中将 0不中奖
    const data = await getDraw()
    if (data.state == 'ok') {
      // const number = data.data.no
      prizeId = data.data.reward
      gift = getImageUrl('gift' + prizeId + '.png?v=1.01')
      if (prizeId != 0) {
        const arr = [0, 2, 4, 6]
        const randomIndex = Math.floor(Math.random() * arr.length)
        prizeIndex = arr[randomIndex]
      } else if (prizeId == 0) {
        const arr = [1, 3, 5, 7]
        const randomIndex = Math.floor(Math.random() * arr.length)
        prizeIndex = arr[randomIndex]
      }

      // 调用抽奖组件的play方法开始游戏
      myLucky.value.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0

        const index = prizeIndex
        // 调用stop停止旋转并传递中奖索引
        myLucky.value.stop(index)
      }, 3000)
    }
  }
  // 抽奖结束会触发end回调
  const endCallback = async prize => {
    const result = prize.prize
    setTimeout(() => {
      if (result == false) {
        showFail.value = true
      } else {
        showSuccess.value = result
      }
    }, 100)
  }

  // 提交信息
  const applyInfo = async () => {
    form.value
      .validate()
      .then(async () => {
        const { data } = await submitInfo({info: [username.value, phone.value].join(','),url: encodeURIComponent(location.href.split('#')[0]) })
        if (data.state == 'ok') {
          // const number = data.data.no
          $('.infoBox').hide()
          $('.mapBox').show()
          closeFlag.value = true
        } else {
          showFailToast({
            message: data.data.msg,
            className: 'voteSuccess1'
          })
        }
      })
      .catch(() => {
        showFailToast({
          message: '信息填写错误',
          className: 'voteSuccess1'
        })
      })

    // const { data } = await axios.post('http://other.jia360.com/api/cdzx/enroll', this.form)
    // if (data.code === 0) {
    //   showDialog({
    //     title: '温馨提示',
    //     content: '报名成功！',
    //     // onOk: () => location.reload()
    //   })
    // } else {
    //   showDialog({
    //     title: '温馨提示',
    //     content: data.msg
    //   })
    // }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    background: url(@/assets/images/p3.jpg) center top no-repeat;
    background-size: cover;
  }
  .p3_txt {
    width: 366px;
    height: 116px;
    margin-left: -183px;
    top: 1067px;
    background: url(@/assets/images/p3_txt.png) center top no-repeat;
  }
  .p3_box {
    width: 585px;
    height: 533px;
    margin-left: -292.5px;
    top: 438px;
    background: url(@/assets/images/draw_bg.png) center top no-repeat;
  }
  .share-img-wrap {
    width: 606px;
    vertical-align: bottom;
  }

  .draw_pop_box {
    width: 604px;
    height: 731px;
    vertical-align: bottom;
    background: url(@/assets/images/box.png) center center no-repeat;
  }
  .draw_pop_box button {
    width: 497px;
    height: 92px;
    margin-left: -252px;
    top: 605px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: Medium;
    background: #089bc3;
    font-size: 42px;
    border: none;
    padding: 0;
  }
  .infoBox button {
    top: 575px;
  }
  .info_txt {
    width: 466px;
    height: 139px;
    top: 386px;
    margin-left: -233px;
    background: url(@/assets/images/info_txt.png) center center no-repeat;
  }
  .info_name {
    width: 69px;
    height: 30px;
    top: 136px;
    margin-left: 68px;
    background: url(@/assets/images/name.png) center center no-repeat;
  }
  .info_phone {
    width: 66px;
    height: 29px;
    top: 278px;
    margin-left: 68px;
    background: url(@/assets/images/phone.png) center center no-repeat;
  }
  .van-popup {
    background: transparent;
  }
  .van-cell {
    width: 377px;
    height: 73px;
    padding: 0;
    padding-left: 10px;
    line-height: 73px;
    font-size: 30px;
    color: #fff;
    overflow: visible;
  }
  .van-cell >>> .van-field__error-message {
    font-size: 24px;
  }
  .van-cell-group {
    width: 377px;
    background: transparent;
    padding-left: 157px;
    padding-top: 118px;
    overflow: visible;
  }
  .mapBox {
    display: none;
  }
  .map_txt1 {
    width: 342px;
    height: 151px;
    top: 40px;
    margin-left: -171px;
    background: url(@/assets/images/map_txt1.png) center center no-repeat;
  }
  .map {
    width: 459px;
    height: 311px;
    top: 230px;
    margin-left: -229.5px;
    background: url(@/assets/images/map.png) center center no-repeat;
  }
  .map_txt2 {
    width: 429px;
    height: 88px;
    top: 570px;
    margin-left: -214.5px;
    background: url(@/assets/images/map_txt2.png) center center no-repeat;
  }
</style>
