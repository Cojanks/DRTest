import styles from './Pill.module.css';

type PillProps = {
  type?: string;
  text: string;
  size?: 'small' | 'normal' | 'large';
};

function Pill({ type = 'primary', size = 'normal', text }: PillProps) {
  return <div className={`${styles[type]} ${styles[size]}`}>{text}</div>;
}

export default Pill;
