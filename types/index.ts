export interface PaginationParams {
  page: number;
  perPage: number;
}
export interface Product {
  category: string;
  name: string;
  id: string;
  photo: string;
  suppliers: string;
  stock: number;
  price: number;
}
