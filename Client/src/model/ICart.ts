export interface CartItem {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface Cart {
  CartId: number;
  CustomerId: string;
  cartItems: CartItem[];
}
