<template>
  <div class="view">
    <div class="card">
      <div v-for="(entry, index) in conversionHistory.data" :key="index">
        <span class="mr-3 bold">
          {{ format(entry.fromCurrency, entry.fromValue) }}
        </span>

        <span class="mr-3">to</span>
        <span class="mr-1 bold">
          {{ format(entry.toCurrency, entry.toValue) }}
        </span>
      </div>
      <div v-if="!conversionHistory.data[0]">
        History is empty
      </div>
      <app-button v-else @click="conversionHistory.clear">Clear</app-button>
    </div>
    <router-link to="/" class="link" replace>Home</router-link>
  </div>
</template>
<script lang="ts">
import AppButton from "@/components/user-interface/AppButton.vue";
import conversionHistory from "@/hooks/history";
import { format } from "@/hooks/price-formatter";
import { defineComponent, Ref, ref } from "vue";
export default defineComponent({
  name: "History",
  props: {},
  components: { AppButton },
  setup() {
    conversionHistory.getAll();
    return {
      format,
      conversionHistory,
    };
  },
});
</script>
<style lang="scss">
.mr-1 {
  margin-right: 0.2rem;
}
.mr-2 {
  margin-right: 0.4rem;
}
.mr-3 {
  margin-right: 0.6rem;
}
.bold {
  font-weight: 700;
}
</style>
