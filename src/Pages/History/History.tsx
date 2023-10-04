import styles from "./History.module.css";
import { useDispatch } from "react-redux";

const History = () => {
  const dispatch = useDispatch();
  //   const { data, error, loading } = useSelector((state: any) => state.meSlice);

  return <div className={styles.container}></div>;
};

export default History;
