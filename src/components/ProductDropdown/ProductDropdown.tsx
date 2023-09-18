import { useState } from 'react';
import styles from './ProductDropdown.module.css';
import { useProduct } from '../../context/ProductContext';
import { ProductType } from '../../types/types';

function ProductDropdown() {
  const { products, setActiveProduct } = useProduct();
  const [isOpen, setisOpen] = useState(false);
  const [selectedTitle, setselectedTitle] = useState<string>('');

  const handleToggleOpen = () => {
    setisOpen((state) => !state);
  };
  const handleTabEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleToggleOpen();
    }
  };

  // Not as DRY as I'd like
  const handleSelected = (
    _e: React.MouseEvent<HTMLButtonElement>,
    product: ProductType
  ) => {
    setselectedTitle(product.title);
    setActiveProduct(product);
    setisOpen(false);
  };
  const handleEnterSelected = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    product: ProductType
  ) => {
    if (e.key === 'Enter') {
      setselectedTitle(product.title);
      setActiveProduct(product);
      setisOpen(false);
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdown}>
        <div
          role="button"
          tabIndex={0}
          onClick={handleToggleOpen}
          onKeyDown={handleTabEnter}
          className={styles.selection}
        >
          {selectedTitle === '' ? 'Select a Product' : selectedTitle}
        </div>
        <svg
          className={styles.caret}
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 15L0.339746 -1.63133e-06L17.6603 -1.17124e-07L9 15Z"
            fill="#1AA2B0"
          />
        </svg>
        {isOpen && (
          <div className={styles.dropdownListContainer}>
            <ul className={styles.dropdownList}>
              {products.map((product) => {
                return (
                  <ol className={styles.dropdownListItem} key={product.id}>
                    <button
                      className={styles.dropdownListItemBtn}
                      onClick={(event) => {
                        handleSelected(event, product);
                      }}
                      onKeyDown={(event) => {
                        handleEnterSelected(event, product);
                      }}
                    >
                      {product.title}
                    </button>
                  </ol>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDropdown;
