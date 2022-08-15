export type TDeliveryStatus = "delivered" | "notDelivered";

export type TOrder = "asc" | "desc";
export interface IProductTypes {
  color: string;
  images: string[];
}
export interface IProduct {
  id: number;
  name: string;
  gender: any;
  category: string;
  price: number;
  inventory: number;
  types: IProductTypes[];
  description: string;
}
export interface IOrder {
  id: number;
  userDescription: {
    name: string;
    family: string;
    address: string;
    phone: string;
  };
  totalPrice: number;
  requestedDeliveryDate: string;
  deliveryDate: string;
  deliveryStatus: TDeliveryStatus;
  orderSubmitDate: string;
  products: [
    {
      productId: number;
      quantity: number;
      type: number;
    }
  ];
}

export interface IProductManagement {
  id: number;
  name: string;
  category: string;
  gender: string;
  types: IProductTypes[];
}
export interface IPriceManagement {
  id: number;
  name: string;
  price: number;
  inventory: number;
}
export interface IOrderManagement {
  id: number;
  name: string;
  totalPrice: number;
  orderSubmitDate: string;
}
