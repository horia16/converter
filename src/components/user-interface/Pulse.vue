<template>
  <div class="pulse" aria-busy="Loading">
    <div class="pulse-div"></div>
    <div class="pulse-div"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Pulse",
});
</script>
<style lang="scss">
@keyframes pulse {
  0% {
    transform: scale(0.1);
    opacity: 0;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
.pulse {
  position: relative;
  width: 100px;
  height: 100px;
}
.pulse-div {
  background-color: rgb(56, 162, 233);
  opacity: 0;
  border-radius: 50%;
  position: absolute;
  margin: auto auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100px;
  height: 100px;
}

.pulse-div:nth-child(1) {
  animation: pulse 2s infinite;
}
.pulse-div:nth-child(2) {
  animation: pulse 2s infinite 0.3s reverse;
}
</style>
