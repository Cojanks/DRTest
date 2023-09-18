import {
  createContext,
  useContext,
  useReducer,
  PropsWithChildren,
  useEffect,
} from 'react';
import {
  ActionType,
  ProductProviderType,
  ProductStateType,
  ProductType,
} from '../types/types';
import { API_URL } from '../constant/constant';

const ProductContext = createContext<ProductProviderType | null>(null);

const initialState: ProductStateType = {
  products: [],
  activeProduct: null,
  error: '',
  isLoading: false,
};

function productReducer(
  state: ProductStateType,
  action: ActionType
): ProductStateType {
  switch (action.type) {
    case 'products/loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'products/loaded':
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case 'products/errored':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'product/selected':
      return {
        ...state,
        activeProduct: action.payload,
      };
    default:
      throw new Error('Action is unknown');
  }
}

export const ProductProvider = ({ children }: PropsWithChildren) => {
  const [{ products, activeProduct, error, isLoading }, dispatch] = useReducer(
    productReducer,
    initialState
  );

  useEffect(function () {
    async function getProducts() {
      dispatch({ type: 'products/loading' });

      try {
        const res = await fetch(`${API_URL}`);
        const data = await res.json();
        dispatch({ type: 'products/loaded', payload: data.products });
      } catch {
        dispatch({
          type: 'products/errored',
          payload: 'There was an error loading the product list',
        });
      }
    }

    getProducts();
  }, []);

  const setActiveProduct = (product: ProductType | null) => {
    if (product === null) return;
    dispatch({ type: 'product/selected', payload: product });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        activeProduct,
        error,
        isLoading,
        setActiveProduct,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);

  // if `null`, throw an error
  if (context === null || context === undefined) {
    throw new Error('Product Context was used outside of its Provider');
  }

  return context;
};
