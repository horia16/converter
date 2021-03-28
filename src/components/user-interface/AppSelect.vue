<template>
  <div>
    <label v-if="label" :for="id">{{ label }}</label>
    <select
      v-model="model"
      :name="name"
      :id="id"
      :aria-label="ariaLabel"
      @change="onChange"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :disabled="option.disabled"
        >{{ option.name }}</option
      >
    </select>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
export default defineComponent({
  name: "AppSelect",
  props: {
    label: { type: String, default: null },
    ariaLabel: { type: String, default: null },
    name: { type: String, default: null },
    id: { type: String, default: null },
    modelValue: { type: String, requirted: true },
    options: {
      type: Array as PropType<
        Array<{ name: string; value: string | number; disabled: boolean }>
      >,
      required: true,
    },
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
    function onChange(e: Event) {
      const target = e.target as HTMLInputElement;
      context.emit("valueChanged", target.value);
    }
    return { model, onChange };
  },
});
</script>
<style lang="scss"></style>
