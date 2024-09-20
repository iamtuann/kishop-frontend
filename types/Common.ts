

export interface IResponse<T> {
  statusCode: number,
  message: string,
  output: T,
  error: string
}

export interface Brand {
  id: number,
  name: string,
  origin: string,
  description: string
}

export interface Color {
  id: number,
  name: string,
  engName: string,
  description?: string
  code: string
}

export interface Size {
  id?: number,
  name: string,
  description?: string
}

export interface Category {
  id?: number,
  name: string,
  slug: string,
  description?: string
}

export interface IPage<T> {
  content: T,
  totalElements: number,
  totalPages: number,
  size: number,
  number: number,
  first: boolean,
  last: boolean,
  empty: boolean
}