export function format(currencyCode: string, value: number) {
  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: currencyCode,
  });
  return formatter.format(value);
}
