import { reactive, ref, Ref } from "vue";
import localForage from "localforage";

interface ConversionObject {
  fromCurrency: string;
  toCurrency: string;
  fromValue: number;
  toValue: number;
}

const data: Ref<Array<ConversionObject>> = ref([]);

async function save(conversion: ConversionObject) {
  data.value.push(conversion);
  await localForage.setItem("history", JSON.parse(JSON.stringify(data.value))); // Vue reactive objects can not be saved so we have to clone them
  console.log("saved");
}

async function getAll() {
  const history:
    | Array<ConversionObject>
    | undefined
    | null = await localForage.getItem("history");
  if (history) {
    data.value = history;
  }
}
async function clear() {
  localForage.setItem("history", []);
  data.value = [];
}

const conversionHistory = reactive({
  data,
  save,
  getAll,
  clear,
});

export default conversionHistory;
