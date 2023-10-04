import styles from "./Home.module.css";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  //   const { data, error, loading } = useSelector((state: any) => state.meSlice);

  return <div className={styles.container}></div>;
};

export default Home;
