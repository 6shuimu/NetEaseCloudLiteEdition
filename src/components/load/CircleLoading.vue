<template>
  <!-- 圆圈加载总体 -->
  <div class="CircleLoading" ref="instance_CirLoad">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'

// 接收父组件的数据
const props = defineProps(['CircleLoading'])

// 圆圈加载总体的实例
const instance_CirLoad = ref (null)

onMounted(()=>{
  instance_CirLoad.value.style.fontSize = props.CircleLoading
})
</script>

<style lang="less" scoped>
.CircleLoading {
  font-size: 16px;
  width: 3.5em;
  height: 3.5em;
  position: relative;

  >div{
    position: absolute;
    top: 8%;
    left: 50%;
    width: 0.07em;
    height: 3em;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 1em;
      background-color: black;
    }

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1em;
      background-color: black;
    }

    &:nth-child(2) {
		    transform: rotate(15deg);
		}

		&:nth-child(3) {
		    transform: rotate(30deg);
		}

		&:nth-child(4) {
		    transform: rotate(45deg);
		}

		&:nth-child(5) {
		    transform: rotate(60deg);
		}

		&:nth-child(6) {
		    transform: rotate(75deg);
		}

		&:nth-child(7) {
		    transform: rotate(90deg);
		}

		&:nth-child(8) {
		    transform: rotate(105deg);
		}

		&:nth-child(9) {
		    transform: rotate(120deg);
		}

		&:nth-child(10) {
		    transform: rotate(135deg);
		}

		&:nth-child(11) {
		    transform: rotate(150deg);
		}

		&:nth-child(12) {
		    transform: rotate(165deg);
		}

    @keyframes load {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    &:nth-child(1):before {
      animation: load 1.2s linear 0s infinite;
    }

    &:nth-child(3):before {
		    animation: load 1.2s linear 0.1s infinite;
		}

		&:nth-child(4):before {
		    animation: load 1.2s linear 0.15s infinite;
		}

		&:nth-child(5):before {
		    animation: load 1.2s linear 0.2s infinite;
		}

		&:nth-child(6):before {
		    animation: load 1.2s linear 0.25s infinite;
		}

		&:nth-child(7):before {
		    animation: load 1.2s linear 0.3s infinite;
		}

		&:nth-child(8):before {
		    animation: load 1.2s linear 0.35s infinite;
		}

		&:nth-child(9):before {
		    animation: load 1.2s linear 0.4s infinite;
		}

		&:nth-child(10):before {
		    animation: load 1.2s linear 0.45s infinite;
		}

		&:nth-child(11):before {
		    animation: load 1.2s linear 0.5s infinite;
		}

		&:nth-child(12):before {
		    animation: load 1.2s linear 0.55s infinite;
		}

    &:nth-child(1):after {
		    animation: load 1.2s linear 0.6s infinite;
		}

    &:nth-child(2):after {
		    animation: load 1.2s linear 0.65s infinite;
		}

		&:nth-child(3):after {
		    animation: load 1.2s linear 0.7s infinite;
		}

		&:nth-child(4):after {
		    animation: load 1.2s linear 0.75s infinite;
		}

		&:nth-child(5):after {
		    animation: load 1.2s linear 0.8s infinite;
		}

		&:nth-child(6):after {
		    animation: load 1.2s linear 0.85s infinite;
		}

		&:nth-child(7):after {
		    animation: load 1.2s linear 0.9s infinite;
		}

		&:nth-child(8):after {
		    animation: load 1.2s linear 0.95s infinite;
		}

		&:nth-child(9):after {
		    animation: load 1.2s linear 1.0s infinite;
		}

		&:nth-child(10):after {
		    animation: load 1.2s linear 1.05s infinite;
		}

		&:nth-child(11):after {
		    animation: load 1.2s linear 1.1s infinite;
		}

		&:nth-child(12):after {
		    animation: load 1.2s linear 1.15s infinite;
		}
  }
}
</style>