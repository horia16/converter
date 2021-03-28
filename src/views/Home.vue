<template>
  <div class="view">
    <convertor />
    <router-link to="/history" class="link" replace>History</router-link>
  </div>
</template>

<script lang="ts">
import Convertor from "@/components/functional/Convertor.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  components: { Convertor },
});
</script>
<style lang="scss"></style>
