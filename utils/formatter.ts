
export function formatPrice(price: number, currency: string = '₫') {
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(price) + currency;
}