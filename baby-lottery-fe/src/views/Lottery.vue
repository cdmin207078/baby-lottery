<template>
  <main class="flex-grow">
    <div class="winner-list">
      <h2 class="winner-list-title">中奖记录</h2>
      <div class="prize">
        <h3>一等奖</h3>
        <div>
          <span v-if="winners.firstPrize.length == 0"></span>
          <span v-else v-for="(winner, index) in winners.firstPrize" :key="index">
            {{ winner }}
          </span>
        </div>
      </div>
      <div class="prize">
        <h3>二等奖</h3>
        <div>
          <span v-if="winners.secondPrize.length == 0"></span>
          <span v-else v-for="(winner, index) in winners.secondPrize" :key="index">
            {{ winner }}
          </span>
        </div>
      </div>
      <div class="prize">
        <h3>三等奖</h3>
        <div>
          <span v-if="winners.thirdPrize.length == 0"></span>
          <span v-else v-for="(winner, index) in winners.thirdPrize" :key="index">
            {{ winner }}
          </span>
        </div>
      </div>
    </div>
    <div class="lucky-draw">
      <a href="javascript:;" @click="drawWinner('firstPrize', 2)"></a>
      <a href="javascript:;" @click="drawWinner('secondPrize', 5)"></a>
      <a href="javascript:;" @click="drawWinner('thirdPrize', 10)"></a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
type PrizeLevel = 'thirdPrize' | 'secondPrize' | 'firstPrize'

const isLotteryInProgress = ref(false)

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

const winners = reactive({
  thirdPrize: ref<string[]>(
    localStorage.getItem('lottery-third-prize')
      ? JSON.parse(localStorage.getItem('lottery-third-prize')!)
      : []
  ),
  secondPrize: ref<string[]>(
    localStorage.getItem('lottery-second-prize')
      ? JSON.parse(localStorage.getItem('lottery-second-prize')!)
      : []
  ),
  firstPrize: ref<string[]>(
    localStorage.getItem('lottery-first-prize')
      ? JSON.parse(localStorage.getItem('lottery-first-prize')!)
      : []
  )
})

watch(winners.thirdPrize, (newValue) => {
  localStorage.setItem('lottery-third-prize', JSON.stringify(newValue))
})
watch(winners.secondPrize, (newValue) => {
  localStorage.setItem('lottery-second-prize', JSON.stringify(newValue))
})

watch(winners.firstPrize, (newValue) => {
  localStorage.setItem('lottery-first-prize', JSON.stringify(newValue))
})

const drawWinner = (prizeLevel: PrizeLevel, count: number) => {
  var prizeWinners = winners[prizeLevel]
  if (prizeWinners.length > 0) {
    console.log(prizeLevel + '已经抽过')
    return
  }

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * remainingNumbers.value.length)
    const winner = remainingNumbers.value.splice(randomIndex, 1)[0]
    prizeWinners.push(winner)
  }
}
</script>

<style scoped>
main {
  background-image: url('../assets/lottery-bg.png');
  @apply bg-cover bg-center bg-no-repeat;
}

.winner-list {
  @apply flex flex-col m-auto mt-72 px-5;
  width: 860px;
}

.winner-list-title {
  @apply text-3xl mb-6 font-bold ml-3 mt-3 text-center;
}

.prize {
  @apply mb-5;
}

.prize h3 {
  @apply text-xl mb-3 text-red-500;
}

.prize span {
  @apply text-red-500 mx-5;
}

.lucky-draw {
  @apply flex items-center justify-center space-x-24 text-center mt-20 transition ease-in-out delay-150;
}

.lucky-draw a {
  @apply h-44 w-44;
  background-size: cover;
  background-repeat: no-repeat;
  animation-name: lottery-box-animation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  background-image: url('../assets/lottery-box-bg1.png');
}

@keyframes lottery-box-animation {
  0% {
    background-image: url('../assets/lottery-box-bg1.png');
  }
  /* 12.5% {
    background-image: url('../assets/lottery-box-bg1.png');
  }
  25% {
    background-image: url('../assets/lottery-box-bg2.png');
  }
  37.5% {
    background-image: url('../assets/lottery-box-bg3.png');
  }
  50% {
    background-image: url('../assets/lottery-box-bg4.png');
  }
  62.5% {
    background-image: url('../assets/lottery-box-bg5.png');
  }
  75% {
    background-image: url('../assets/lottery-box-bg6.png');
  }
  87.5% {
    background-image: url('../assets/lottery-box-bg7.png');
  } */
  100% {
    background-image: url('../assets/lottery-box-bg8.png');
  }
}
</style>
