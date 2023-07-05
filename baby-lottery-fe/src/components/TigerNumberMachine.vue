<template>
  <LuckyWheel
    ref="myLucky"
    width="300px"
    height="300px"
    :prizes="prizes"
    :blocks="blocks"
    :buttons="buttons"
    @start="startCallback"
    @end="endCallback"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LuckyWheel } from 'lucky-canvas'

const myLucky = ref(null)

const blocks = [{ padding: '10px', background: '#869cfa' }]
const prizes = [
  { background: '#e9e8fe', fonts: [{ text: '0' }] },
  { background: '#b8c5f2', fonts: [{ text: '1' }] },
  { background: '#e9e8fe', fonts: [{ text: '2' }] },
  { background: '#b8c5f2', fonts: [{ text: '3' }] },
  { background: '#e9e8fe', fonts: [{ text: '4' }] },
  { background: '#b8c5f2', fonts: [{ text: '5' }] }
]
const buttons = [
  { radius: '40%', background: '#617df2' },
  { radius: '35%', background: '#afc8ff' },
  {
    radius: '30%',
    background: '#869cfa',
    pointer: true,
    fonts: [{ text: '开始', top: '-10px' }]
  }
]

// 点击抽奖按钮会触发star回调
function startCallback() {
  // 调用抽奖组件的play方法开始游戏
  // @ts-ignore
  myLucky.play()
  // 模拟调用接口异步抽奖
  setTimeout(() => {
    // 假设后端返回的中奖索引是0
    const index = 0
    // 调用stop停止旋转并传递中奖索引
    // @ts-ignore
    myLucky.stop(index)
  }, 3000)
}

// 抽奖结束会触发end回调
function endCallback(prize: object) {
  console.log(prize)
}

// @ts-ignore
// myLucky.play()
</script>
