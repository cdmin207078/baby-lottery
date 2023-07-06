<template>
  <main class="flex-grow">
    <div class="winner-list">
      <h2 class="winner-list-title">中奖记录</h2>

      <div v-for="(lottery, i) in lotterys" :key="i" class="prize">
        <h3>{{ lottery.name }}</h3>
        <div>
          <span v-if="lottery.winners.length == 0"></span>
          <span v-else v-for="(winner, j) in lottery.winners" :key="j">
            <transition mode="out-in">
              {{ winner }}
            </transition>
          </span>
        </div>
      </div>
    </div>
    <div class="lucky-draw">
      <a
        href="javascript:;"
        v-for="(lottery, index) in lotterys"
        @click="drawWinner(lottery.id)"
        :style="{ backgroundImage: 'url(' + lottery.backgroundImage + ')' }"
      ></a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue'

interface ILotteryInfo {
  id: number
  name: string
  backgroundImage: Ref<string>
  maxWinnerCount: number
  winners: string[]
}

const isLotteryInProgress = ref(false)
const closeBoxImage = '/src/assets/lottery-box-bg1.png'
const openBoxImage = '/src/assets/lottery-box-bg8.png'

function getLotteryRecords(id: number) {
  return localStorage.getItem('lottery-prize-' + id)
    ? JSON.parse(localStorage.getItem('lottery-prize-' + id)!)
    : []
}

const lotterys = reactive<ILotteryInfo[]>([
  {
    id: 1,
    name: '一等奖',
    backgroundImage:
      getLotteryRecords(1).length == 2 ? ref<string>(openBoxImage) : ref<string>(closeBoxImage),
    maxWinnerCount: 2,
    winners: getLotteryRecords(1)
  },
  {
    id: 2,
    name: '二等奖',
    backgroundImage:
      getLotteryRecords(2).length == 5 ? ref<string>(openBoxImage) : ref<string>(closeBoxImage),
    maxWinnerCount: 5,
    winners: getLotteryRecords(2)
  },
  {
    id: 3,
    name: '三等奖',
    backgroundImage:
      getLotteryRecords(3).length == 10 ? ref<string>(openBoxImage) : ref<string>(closeBoxImage),
    maxWinnerCount: 10,
    winners: getLotteryRecords(3)
  }
])

const lotteryMinNumber = ref<number>(
  localStorage.getItem('lottery-min-number')
    ? Number(localStorage.getItem('lottery-min-number'))
    : 1
)
const lotteryMaxNumber = ref<number>(
  localStorage.getItem('lottery-max-number')
    ? Number(localStorage.getItem('lottery-max-number'))
    : 100
)

let allNumbers: string[] = []
for (let i = lotteryMinNumber.value; i <= lotteryMaxNumber.value; i++) {
  // 格式化为三位数，如：001
  const formattedNumber = i.toString().padStart(3, '0')
  allNumbers.push(formattedNumber)
}
const remainingNumbers = ref(allNumbers.slice())

function drawWinner(id: number) {
  console.log(id)
  if (isLotteryInProgress.value) return

  var lottery = lotterys.filter((x) => x.id === id)[0]
  console.log(lottery)

  if (lottery.winners.length > 0) {
    console.log(lottery.name + '已经抽过')
    return
  }

  isLotteryInProgress.value = true

  lottery.backgroundImage = openBoxImage

  var count = 0
  var interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * remainingNumbers.value.length)
    const winner = remainingNumbers.value.splice(randomIndex, 1)[0]

    lottery.winners.push(winner)

    count++

    if (count == lottery.maxWinnerCount) {
      localStorage.setItem('lottery-prize-' + lottery.id, JSON.stringify(lottery.winners))

      clearInterval(interval)
      isLotteryInProgress.value = false
    }
  }, 1000)
}
</script>

<style scoped>
main {
  background-image: url('../assets/lottery-bg.png');
  @apply bg-cover bg-center bg-no-repeat;
}

.winner-list {
  @apply flex flex-col m-auto mt-72;
  width: 860px;
}

.winner-list-title {
  @apply text-5xl mb-6 font-bold mt-0 text-center text-yellow-500;
  letter-spacing: 10px;
  font-family: monospace;
}

.prize {
  @apply mb-5;
}

.prize h3 {
  @apply text-xl mb-3 text-red-500;
}

.prize span {
  @apply text-red-500 font-extrabold text-2xl mx-5;
  letter-spacing: 2px;
}

.lucky-draw {
  @apply flex items-center justify-center space-x-24 text-center mt-24 transition ease-in-out delay-150;
}

.lucky-draw a {
  @apply h-44 w-44 hover:scale-125 duration-300;
  background-size: cover;
  background-repeat: no-repeat;
  /* background-image: url('../assets/lottery-box-bg1.png'); */
}
</style>
