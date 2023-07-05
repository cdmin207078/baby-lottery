<template>
	<div
		class="flex items-center justify-center h-screen bg-gradient-to-r from-pink-400 to-purple-500"
	>
		<div class="max-w-md mx-5 w-full p-6 bg-white rounded-lg shadow-md">
			<h2 class="text-xl mb-4">写一条祝福语</h2>
			<form @submit.prevent="submitForm">
				<div class="mb-4">
					<label for="name" class="block mb-2">姓名</label>
					<input
						v-model="name"
						type="text"
						id="name"
						class="w-full border-2 border-pink-200 rounded-md p-2"
					/>
				</div>
				<div class="mb-4">
					<label for="message" class="block mb-2">祝福语</label>
					<textarea
						v-model="message"
						id="message"
						class="w-full border-2 border-pink-200 rounded-md p-2"
					></textarea>
				</div>
				<button
					:disabled="isSubmitting || !isValid"
					:class="[
						'w-full',
						'text-white',
						'py-2',
						'px-4',
						'rounded-md',
						'relative',
						{ 'bg-blue-500': isValid, 'bg-gray-500': !isValid || isSubmitting }
					]"
				>
					<span v-if="isSubmitting"> 弹幕已发送...{{ countdown }} </span>
					<span v-else>提交</span>
				</button>
				<p v-if="!isValid" class="text-red-500 mt-2">
					<template v-if="!name && !message"> 请输入您的姓名和祝福语 </template>
					<template v-else-if="!name"> 请输入您的姓名 </template>
					<template v-else-if="!message"> 请输入祝福语 </template>
				</p>
			</form>
		</div>

		<div v-if="showSuccessMessage" class="fixed inset-0 flex items-center justify-center">
			<div class="bg-green-500 text-white py-4 px-6 rounded-lg">提交成功！谢谢</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as signalR from '@microsoft/signalr'

const connection = new signalR.HubConnectionBuilder()
	.withUrl('http://localhost:5016/live-blessings')
	.build()

connection.start().then(() => {
	console.log('SignalR connected')
})

const name = ref('')
const message = ref('')
const isSubmitting = ref(false)
const countdown = ref(5)
const showSuccessMessage = ref(false)

const isValid = computed(() => name.value.trim() !== '' && message.value.trim() !== '')

const submitForm = () => {
	if (!isValid.value) return

	isSubmitting.value = true

	// 发送祝福弹幕
	sendLiveBlessings(name.value, message.value)
	name.value = ''
	message.value = ''

	const interval = setInterval(() => {
		countdown.value--
		if (countdown.value === 0) {
			clearInterval(interval)
			isSubmitting.value = false
			countdown.value = 5
		}
	}, 1000)
}

function sendLiveBlessings(name: string, message: string) {
	let content: string = `${name}: ${message}`
	connection.invoke('SendLiveBlessings', content)

	showSuccessMessage.value = true
	// 设置一段时间后隐藏成功消息
	setTimeout(() => {
		showSuccessMessage.value = false
	}, 3000)
}
</script>