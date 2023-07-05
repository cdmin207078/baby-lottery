<template>
  <vue-danmaku v-model:danmus="liveBlessings" useSlot :speeds="100" class="w-screen h-56">
    <template v-slot:dm="{ index, danmu }">
      <div class="rounded-lg bg-pink-500 bg-opacity-50 p-1">
        <span class="text-md text-white">{{ danmu }}</span>
      </div>
    </template>
  </vue-danmaku>
</template>

<script setup lang="ts">
import vueDanmaku from 'vue3-danmaku'
import { ref } from 'vue'
import * as signalR from '@microsoft/signalr'

const liveBlessings = ref(['danmu1', 'danmu2', 'danmu3', '...', '陈宁: 恭喜恭喜 🎉🎉🎉🎉'])

const connection = new signalR.HubConnectionBuilder()
  .withUrl('http://localhost:5016/live-blessings')
  .build()

connection.on('ReceiveLiveBlessings', (message: string) => {
  liveBlessings.value.push(message)
})

connection.start().then(() => {
  console.log('SignalR connected')
})
</script>
