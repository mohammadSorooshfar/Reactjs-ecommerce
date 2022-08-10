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
}
