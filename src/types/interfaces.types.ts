export type TDeliveryStatus = "delivered" | "notDelivered";

export type TOrder = "asc" | "desc";

export interface IProduct {
  id: number;
  name: string;
  gender: { en: string; fa: string };
  category: { en: string; fa: string };
  price: number;
  inventory: number;
  colors: string[];
  images: string[];
  description: string;
}
export interface ICart {
  id: number;
  name: string;
  price: number;
  inventory: number;
  image: string;
  quantity: number;
}
export interface IOrder {
  id?: number;
  userDescription: {
    name: string;
    family: string;
    address: string;
    phone: string;
  };
  totalPrice: number;
  requestedDeliveryDate: string;
  deliveryDate?: string;
  deliveryStatus: TDeliveryStatus;
  orderSubmitDate: string;
  products: ICart[];
}

export interface IProductManagement {
  id: number;
  name: string;
  category: { en: string; fa: string };
  gender: { en: string; fa: string };
  images: string[];
}
export interface IPriceManagement {
  id: number;
  name: string;
  price: number;
  inventory: number;
}
export interface IOrderManagement {
  id?: number;
  name: string;
  totalPrice: number;
  orderSubmitDate: string;
}

export interface IEditRow {
  id: number;
  priceEdit: boolean;
  inventoryEdit: boolean;
  priceData: number;
  inventoryData: number;
}
