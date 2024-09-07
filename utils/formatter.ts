
export function formatPrice(price: number, currency: string = '₫') {
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(price) + currency;
}

export function formatAddress(city: string, district: string, ward: string, detail: string) {
  return city + ", " + district + ", " + ward + ", " + detail + ".";
}