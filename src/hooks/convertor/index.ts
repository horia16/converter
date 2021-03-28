import axios, { AxiosError, AxiosResponse } from "axios";
import { computed, ComputedRef, reactive, ref, Ref } from "vue";

interface Currency {
  code: string;
  alphaCode: string;
  numericCode: string;
  name: string;
  rate: number;
  date: string;
  inverseRate: number;
}

interface ConversionData {
  [key: string]: Currency;
}

// Assume the default currency codes, most popular would be from gbp to eur in the UK
const currentCurrencyCode = ref("gbp");
const conversionCurrencyCode = ref("eur");
/**
 * Marks if we are awaiting for a response from the api
 */
const awaitingApi = ref(false);
/**
 * The list of available currencies in array format. Used for the <app-select> component
 */
const availableCurrencies: Ref<Array<{
  value: string;
  name: string;
  disabled: boolean;
}>> = ref([{ value: "gbp", name: "U.K. Pound Sterling", disabled: true }]);
/**
 * The conversion data object. Contains a list of currencies and their respective rates
 */
const conversionData: Ref<ConversionData | null> = ref(null);
/**
 * The currency value that the user wants to convert
 */
const currentCurrency = ref(1);

/**
 * The converted value of our currency
 */
const convertedCurrency = computed(() => {
  if (conversionData.value) {
    if (conversionData.value[conversionCurrencyCode.value])
      return parseFloat(
        (
          currentCurrency.value *
          conversionData.value[conversionCurrencyCode.value].rate
        ).toFixed(2)
      );
  }
  return currentCurrency.value;
}) as ComputedRef<number>;
/**
 * Get the conversion data from the api and save it to the conversionData variable.
 * @param currencyCode The code of the currency that we want to convert
 */
async function setCurrencyConversionData(currencyCode: string) {
  // We are awaiting
  awaitingApi.value = true;
  try {
    // Make the api call
    const result: AxiosResponse<ConversionData> = await axios({
      method: "GET",
      url: `http://www.floatrates.com/daily/${currencyCode}.json`,
    });
    /**
     * ! The api does not provide any data like name about the currency that we are converting to so we have to create a workaround by saving
     * ! the current currency in the available array
     */
    if (conversionData.value) {
      // Check if the currency is already in che old conversionData object
      if (conversionData.value[currencyCode]) {
        availableCurrencies.value = [
          {
            name: conversionData.value[currencyCode].name,
            value: currencyCode,
            disabled: true,
          },
        ];
      } else {
        // The code is not in there (this should only happen when we switch from GBP the first time) so find the currency in the availableCurrencies array
        const currency = availableCurrencies.value.find(
          (x) => (x.value = currencyCode)
        );
        // If we found it add it back to a clear array
        if (currency) {
          availableCurrencies.value = [currency];
        } else {
          //! Custom error handler here
        }
      }
    }

    // Update our conversions array
    conversionData.value = result.data;
    // Add all other currencies
    for (const [key, value] of Object.entries(result.data)) {
      availableCurrencies.value.push({
        value: key,
        name: value.name,
        disabled: false,
      });
    }
  } catch (error) {
    //! Custom error handler here
  }

  // Job finished
  awaitingApi.value = false;
}

const convertor = reactive({
  currentCurrencyCode,
  conversionCurrencyCode,
  conversionData,
  currentCurrency,
  convertedCurrency,
  availableCurrencies,
  awaitingApi,
  setCurrencyConversionData,
});

export default convertor;
