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

export interface Cart {
  id: string;
  customerId: string;
  CartItems: {
    id: string;
    productId: string;
    cartId: string;
    quantity: number;
  }[];
}
