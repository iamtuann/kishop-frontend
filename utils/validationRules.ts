export function isRequired(name: string) {
  return (v: string | object) => !isEmptyValue(v) || `Vui lòng nhập ${name}`;
}

export function isEmptyValue(value: string | object) {
  if (typeof value === 'object') {
    for (const prop in value) {
      if (Object.hasOwn(value, prop)) {
        return false;
      }
    }
    return true;
  } else {
    return !value;
  }
}

export function isEmail(v: string) {
  const emailRegex = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  return emailRegex.test(v) || "Email không đúng định dạng";
}