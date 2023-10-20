import React, { useEffect, useState } from "react";
import styles from "./Transcriptions.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import { fetchTranscriptions } from "../../Services/Slices/transcriptionsSlice";
import { useNavigate } from "react-router-dom";

const Transcriptions: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getTranscriptions = useSelector(
    (state: any) => state.transcriptionsSlice
  );
  const [page, setPage] = useState<number>(1);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [isResponsive, setIsResponsive] = useState<boolean>(false);

  const formatDate = (dateString: string) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const handleResize = () => {
    setIsResponsive(window.innerWidth <= 750);
  };

  const columns = [
    { title: "Nome", property: "name" },
    { title: "Código", property: "code" },
    { title: "Data", property: "created_at" },
    { title: "Excluir", property: "delete" },
  ];

  const handleRowClick = (id: number) => {
    navigate("/visualizacao", { state: id });
  };

  const data = getTranscriptions?.data?.results?.map((item: any) => {
    return {
      name: item.name,
      created_at: formatDate(item.created_at),
      code: item.code,
      id: item.id,
    };
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch<any>(fetchTranscriptions(page.toString()));
    setIsDispatched(true);
  }, [dispatch, page]);

  return (
    <div className={styles.container}>
      <Table
        title="Transcrições"
        columns={columns}
        data={data}
        setPage={setPage}
        page={page}
        total={getTranscriptions.data.count}
        isEmpty={isDispatched && getTranscriptions?.data?.results?.length === 0}
        loading={getTranscriptions.loading}
        error={getTranscriptions.error}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default Transcriptions;
