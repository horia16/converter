<template>
  <div class="card" v-if="!convertor.awaitingApi">
    <div class="formatted-container">
      <div class="formatted-from">
        {{ format(convertor.currentCurrencyCode, convertor.currentCurrency) }}
        equals
      </div>
      <div class="formatted-to">
        {{
          format(convertor.conversionCurrencyCode, convertor.convertedCurrency)
        }}
      </div>
    </div>
    <div class="convertor-box">
      <div class="col">
        <app-input
          ariaLabel="Sum to convert"
          v-model="convertor.currentCurrency"
          id="convert-from-value"
          type="number"
        />
        <app-input
          ariaLabel="Converted sum"
          id="convert-to-value"
          type="number"
          readonly
          :modelValue="convertor.convertedCurrency"
        />
      </div>
      <div class="col">
        <app-select
          ariaLabel="Convert from"
          v-model="convertor.currentCurrencyCode"
          id="convert-from-select"
          :options="convertor.availableCurrencies"
          @valueChanged="changeCurrency"
        />
        <app-select
          ariaLabel="Convert to"
          v-model="convertor.conversionCurrencyCode"
          id="convert-to-select"
          :options="convertor.availableCurrencies"
        />
      </div>
    </div>
    <app-button @click="save">Save to history</app-button>
  </div>
  <div v-else class="card">
    <pulse />
  </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref, watch } from "vue";
import AppSelect from "../user-interface/AppSelect.vue";
import AppInput from "../user-interface/AppInput.vue";
import convertor from "@/hooks/convertor";
import conversionHistory from "@/hooks/history";
import { format } from "@/hooks/price-formatter";
import Pulse from "../user-interface/Pulse.vue";
import AppButton from "../user-interface/AppButton.vue";

export default defineComponent({
  name: "Convertor",
  props: {},
  components: { AppSelect, AppInput, Pulse, AppButton },
  setup() {
    // Load the initial data
    convertor.setCurrencyConversionData(convertor.currentCurrencyCode);
    conversionHistory.getAll();
    function changeCurrency(code: string) {
      convertor.setCurrencyConversionData(code);
    }

    function save() {
      conversionHistory.save({
        fromCurrency: convertor.currentCurrencyCode,
        toCurrency: convertor.conversionCurrencyCode,
        fromValue: convertor.currentCurrency,
        toValue: convertor.convertedCurrency,
      });
    }
    // We can save to the history every time the value changes but we probably don't want that
    watch(convertor, () => {
      // save();
    });
    return { convertor, changeCurrency, format, save };
  },
});
</script>
<style lang="scss">
.formatted-container {
  width: 100%;
  margin-bottom: 1rem;
}
.formatted-from {
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.7);
  word-break: break-all;
}
.formatted-to {
  font-size: 2rem;
  word-break: break-all;
}
.convertor-box {
  display: flex;
  width: 100%;
  justify-content: center;

  gap: 0.7rem;
  //   flex-wrap: wrap;
  .col {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    input,
    select {
      width: 100%;
      max-width: 230px;
      padding: 0.425rem;
      margin: 0;
      font-size: 1rem;
      box-sizing: border-box;
      border: 0;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      outline: none;
      transition: all 0.2s;
      &:focus {
        box-shadow: 0 0 0 4px rgba(56, 162, 233, 0.4);
      }
    }
    input {
      max-width: 130px;
    }
  }
}
</style>
