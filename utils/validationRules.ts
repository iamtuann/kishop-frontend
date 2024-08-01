export function isRequired(name: string) {
  return (v: string) => !!v || `Vui lòng nhập ${name}`;
}

export function isEmail(v: string) {
  const emailRegex = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
  return emailRegex.test(v) || "Email không đúng định dạng";
}