<template>
    <router-view></router-view>
</template>
<script setup>
import { getSDK } from "@/api";
import { useWXAuth } from "@/utils/useWx";


  useWXAuth()
  const {data:sdkDate} = await getSDK({js_api_list: ['updateAppMessageShareData', 'updateTimelineShareData'].join(','),url: encodeURIComponent(location.href.split('#')[0]) });
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: sdkDate.appId, // 必填，公众号的唯一标识
    timestamp: sdkDate.timestamp, // 必填，生成签名的时间戳
    nonceStr: sdkDate.nonceStr, // 必填，生成签名的随机串
    signature: sdkDate.signature, //必填，签名，见附录1
    jsApiList: sdkDate.jsApiList
  });

</script>