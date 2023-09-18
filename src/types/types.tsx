import { Dispatch } from 'react';

export interface ProductStateType {
  isLoading: boolean;
  error: '';
  activeProduct: ProductType | null;
  products: ProductType[];
}

export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export interface ActionType {
  type: string;
  payload?: any;
}

export interface ProductProviderType {
  isLoading: boolean;
  error: '';
  activeProduct: ProductType | null;
  products: ProductType[];
  dispatch: Dispatch<ActionType>;
  setActiveProduct: (product: ProductType | null) => void;
}
