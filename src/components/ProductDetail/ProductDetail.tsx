import { useProduct } from '../../context/ProductContext';
import { convertToPrice } from '../../utility';
import Notification from '../Notification/Notification';
import Pill from '../Pill/Pill';
import Spinner from '../Spinner/Spinner';
import styles from './ProductDetail.module.css';

function ProductDetail() {
  const { activeProduct, isLoading, error } = useProduct();

  if (activeProduct === null)
    return <div className={styles.empty}>No Product Selected</div>;

  if (isLoading)
    return (
      <div className={styles.container}>
        <Spinner />
      </div>
    );

  if (error) return <Notification type={'error'}>{error}</Notification>;

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          src={activeProduct.images[0]}
          alt={`Image for ${activeProduct.title}`}
          className={styles.img}
        />
      </div>
      <div className={styles.informationContainer}>
        <div className={styles.title}>{activeProduct.title}</div>
        <div className={styles.company}>{activeProduct.brand}</div>
        <div className={styles.price}>
          {convertToPrice(activeProduct.price)}
        </div>
        <div className={styles.desc}>{activeProduct.description}</div>
      </div>
      <div className={styles.pillSection}>
        <Pill text={activeProduct.category} size="small"></Pill>
      </div>
    </div>
  );
}

export default ProductDetail;
