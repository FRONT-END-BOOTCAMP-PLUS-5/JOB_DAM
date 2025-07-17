import { CircularProgress } from '@mui/material';
import styles from './spinner.module.scss';

interface IProps {
  size?: number;
}

const Spinner = ({ size = 80 }: IProps) => {
  return (
    <section className={styles.spinner_section}>
      <CircularProgress size={size} />
    </section>
  );
};

export default Spinner;
