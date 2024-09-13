export interface AddressResponse {
  error: string,
  error_text: string,
  data_name: string,
  data: AddressData[]
}

export interface AddressData {
  id: string,
  name: string,
  name_en: string,
  full_name: string,
  full_name_en: string,
  latitude: string | number,
  longitude: string | number
}