<template>
  <main class="flex-grow bg-white">
    <div class="flex items-center justify-center">
      <h1 class="announcements">欢迎参加刘舒冉百日宴</h1>
    </div>
    <div class="entry-links">
      <a href="/video"></a>
      <a href="/lottery"></a>
    </div>
  </main>
</template>

<style scoped>
main {
  background-image: url('../assets/bg.png');
  @apply bg-cover bg-center bg-no-repeat;
}

.announcements {
  @apply mt-52 text-5xl font-bold text-center
  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text space-x-6;
}
.entry-links {
  @apply flex items-center justify-center space-x-24 text-center mt-20 transition ease-in-out delay-150;
}
.entry-links a {
  @apply h-72 w-56 p-4 hover:shadow-2xl hover:scale-110 duration-300;
}

.entry-links :nth-child(1) {
  background-image: url('../assets/home-video-bg.png');
  @apply bg-cover bg-center bg-no-repeat;
}

.entry-links :nth-child(2) {
  background-image: url('../assets/home-lottery-bg.png');
  @apply bg-cover bg-center bg-no-repeat;
}
</style>
