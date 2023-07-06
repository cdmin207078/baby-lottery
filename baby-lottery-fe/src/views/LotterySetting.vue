<template>
  <div class="flex items-center justify-center h-screen">
    <div class="max-w-md mx-5 w-full p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-xl mb-4">设置</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="minLotteryNumber" class="block mb-2">抽个奖最小号(包含)</label>
          <input
            v-model="minLotteryNumber"
            type="text"
            id="minLotteryNumber"
            class="w-full border-2 border-pink-200 rounded-md p-2"
          />
        </div>
        <div class="mb-4">
          <label for="maxLotteryNumber" class="block mb-2">抽个奖最大号(包含)</label>
          <input
            v-model="maxLotteryNumber"
            type="text"
            id="maxLotteryNumber"
            class="w-full border-2 border-pink-200 rounded-md p-2"
          />
        </div>
        <button class="w-full text-white py-2 px-4 rounded-md relative bg-blue-500">
          <span>提交</span>
        </button>
      </form>
      <button
        @click="clearLotteryRecords"
        class="w-full text-white mt-3 py-2 px-4 rounded-md relative bg-black"
      >
        <span>清空获奖记录</span>
      </button>
    </div>

    <div v-if="successMessageIsShow" class="fixed inset-0 flex items-center justify-center">
      <div class="bg-green-500 text-white py-4 px-6 rounded-lg">保存成功</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const minLotteryNumber = ref<number>(
  localStorage.getItem('lottery-min-number')
    ? Number(localStorage.getItem('lottery-min-number'))
    : 1
)

const maxLotteryNumber = ref<number>(
  localStorage.getItem('lottery-max-number')
    ? Number(localStorage.getItem('lottery-max-number'))
    : 100
)
const successMessageIsShow = ref(false)

const submitForm = () => {
  localStorage.setItem('lottery-min-number', minLotteryNumber.value.toString())
  localStorage.setItem('lottery-max-number', maxLotteryNumber.value.toString())

  showSuccessMessage()
}

function showSuccessMessage() {
  successMessageIsShow.value = true
  // 设置一段时间后隐藏成功消息
  setTimeout(() => {
    successMessageIsShow.value = false
  }, 1500)
}

function clearLotteryRecords() {
  localStorage.removeItem('lottery-prize-1')
  localStorage.removeItem('lottery-prize-2')
  localStorage.removeItem('lottery-prize-3')
  showSuccessMessage()
}
</script>
