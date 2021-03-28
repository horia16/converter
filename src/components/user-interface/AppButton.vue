<template>
  <button class="app-button"><slot></slot></button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppButton",
});
</script>
<style lang="scss">
.app-button {
  font-size: 1.2rem;
  color: white;
  background-color: rgb(38, 139, 255);
  border: 1px solid rgba(0, 0, 0, 0.185);
  border-radius: 4px;
  padding: 0.625rem;
  margin: 0.5rem;
  transition: all 0.2s;
  outline: none;
  box-shadow: 0 2px 10px 0px rgba(33, 124, 228, 0.5);
  &:hover {
    background-color: rgb(33, 124, 228);
  }
  &:active {
    background-color: rgb(27, 103, 189);
  }
  &:focus {
    box-shadow: 0 2px 10px 0px rgba(33, 124, 228, 0.5),
      0 0 0 4px rgba(56, 162, 233, 0.4);
  }
  user-select: none;
  cursor: pointer;
}
</style>
