
export function formatPrice(price: number, currency: string = '₫') {
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(price) + currency;
}

export function formatAddress(city: string, district: string, ward: string, detail: string) {
  return city + ", " + district + ", " + ward + ", " + detail + ".";
}

export function formatDate(date: Date | null): string {
  if (date != null) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } else {
    return "--/--/----"
  }
}