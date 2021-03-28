<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      :type="type"
      v-model="model"
      :name="name"
      :id="id"
      :aria-label="ariaLabel"
      :disabled="disabled"
      :readonly="readonly"
    />
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "AppInput",
  props: {
    label: { type: String, default: null },
    ariaLabel: { type: String, default: null },
    name: { type: String, default: null },
    type: { type: String, default: null },
    disabled: { type: Boolean, default: null },
    readonly: { type: Boolean, default: null },
    id: { type: String, default: null },
    modelValue: { type: [String, Number], requirted: true },
  },
  components: {},
  setup(props, context) {
    const model = computed({
      get: () => {
        return props.modelValue;
      },
      set: (newVal) => {
        context.emit("update:modelValue", newVal);
      },
    });
    return { model };
  },
});
</script>
<style lang="scss"></style>
