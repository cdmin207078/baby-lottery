<template>
  <div class="flex flex-col h-screen bg-gradient-to-r from-pink-400 to-purple-500">
    <RouterView />
    <Qrcode />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
