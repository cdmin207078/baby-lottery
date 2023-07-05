<template>
  <div class="qrcode-container">
    <img src="../assets/Qrcode.png" alt="二维码" class="qrcode-image" />
  </div>
</template>

<style scoped>
.qrcode-container {
  position: fixed;
  right: 30px;
  bottom: 50%; /* 将 bottom 设置为 50% */
  transform: translateY(50%); /* 使用 transform 属性进行垂直居中 */
}

.qrcode-image {
  width: 150px; /* 调整二维码图片的宽度 */
  height: auto;
}
</style>
