import styles from './App.module.css';
import ProductDetail from './components/ProductDetail/ProductDetail';
import ProductDropdown from './components/ProductDropdown/ProductDropdown';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <div className={styles.container}>
      <ProductProvider>
        <ProductDropdown></ProductDropdown>
        <ProductDetail></ProductDetail>
      </ProductProvider>
    </div>
  );
}

export default App;
