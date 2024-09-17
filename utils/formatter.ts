
export function formatPrice(price: number, currency: string = '₫') {
  const formatter = new Intl.NumberFormat('en-US');
  return formatter.format(price) + currency;
}

export function formatAddress(city: string, district: string, ward: string, detail?: string) {
  if (detail) {
    return city + ", " + district + ", " + ward + ", " + detail + ".";
  } else {
    return city + ", " + district + ", " + ward + ".";
  }
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

export function formatDateFull(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/) || cleaned.match(/^(\d{4})(\d{3})(\d{3})$/);

  if (match) {
    if (match[1].length === 3) {
      return `${match[1]} ${match[2]} ${match[3]}`; // Định dạng 0XX XXX XXXX
    } else if (match[1].length === 4) {
      return `${match[1]} ${match[2]} ${match[3]}`; // Định dạng 0XXX XXX XXX
    }
  }
  return phoneNumber;
}
