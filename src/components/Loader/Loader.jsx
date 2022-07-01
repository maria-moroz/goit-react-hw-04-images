import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css';

export default function Loader() {
  return (
    <div className={s.loader}>
      <ThreeDots color="#3f51b5" height={80} width={80} />
    </div>
  );
}
