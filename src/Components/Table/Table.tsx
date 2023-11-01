import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Pagination from "rc-pagination";
import Button from "../Forms/Button";
import { MdArrowForward, MdDelete, MdDownload } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchDeleteFile } from "../../Services/Slices/deleteFileSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

interface Column {
  title: string;
  property: string;
}

interface TableProps {
  title?: string;
  columns: Column[];
  data: any[];
  setPage: (page: number) => void;
  page: number;
  total?: number;
  isEmpty?: boolean;
  loading?: boolean;
  error?: boolean;
}

const Table: React.FC<TableProps> = ({
  title,
  columns,
  data,
  setPage,
  page,
  total,
  isEmpty,
  loading,
  error,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isResponsive, setIsResponsive] = useState(false);
  const [deletingRowIndex, setDeletingRowIndex] = useState(-1);

  useEffect(() => {
    const handleResize = () => {
      setIsResponsive(window.innerWidth <= 750);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleDetailsClick = (id: string) => {
    navigate("/automato/visualizacao", { state: id });
  };

  const handleDeleteClick = async (id: string) => {
    dispatch<any>(fetchDeleteFile(id));
  };

  const customItemRender = (current: number, type: string) => {
    if (type === "page") {
      return (
        current === page && (
          <span className={styles.currentPage}>
            {data?.length > 0 ? page : "0"}
          </span>
        )
      );
    }

    if (type === "prev") {
      return (
        <Button className={styles.backButton} title="Voltar">
          Voltar
        </Button>
      );
    }

    if (type === "next") {
      return (
        <Button className={styles.backButton} title="Avançar">
          Avançar
        </Button>
      );
    }

    return null;
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        {title && <div className={styles.headerTable}>{title}</div>}
      </div>
      <div className={styles.container}>
        <div className={styles.tableHeader}>
          {columns.map((column, index) => (
            <div key={index} className={styles.columnHeader}>
              <div className={styles.columnTitle}>{column.title}</div>
            </div>
          ))}
        </div>
        <div className={styles.tableBody}>
          {loading ? (
            <div style={{ marginBottom: "3rem" }}>
              <Loading size="4rem" type="spin" />
            </div>
          ) : (
            <>
              {isEmpty || error ? (
                <div className={styles.empty}>
                  {isEmpty
                    ? "Não foi encontrado nenhum conteúdo"
                    : "Não foi possível carregar as informações!"}
                </div>
              ) : (
                <>
                  {data?.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.tableRow}>
                      {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className={styles.row}>
                          {column.property === "presigned_url" ? (
                            <Button
                              onClick={() => null}
                              className={styles.button}
                            >
                              <MdDownload size={isResponsive ? 18 : 24} />
                            </Button>
                          ) : column.property === "delete" ? (
                            <Button
                              onClick={() => handleDeleteClick(row.id)}
                              className={styles.button}
                            >
                              {deletingRowIndex === rowIndex ? (
                                <MdDelete
                                  size={isResponsive ? 18 : 24}
                                  className={styles.spin}
                                />
                              ) : (
                                <MdDelete size={isResponsive ? 18 : 24} />
                              )}
                            </Button>
                          ) : column.property === "details" ? (
                            <Button
                              onClick={() => handleDetailsClick(row.id)}
                              className={styles.button}
                            >
                              <MdArrowForward size={isResponsive ? 18 : 24} />
                            </Button>
                          ) : (
                            <div className={styles.tableCell}>
                              {row[column.property]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          current={page}
          onChange={handlePageChange}
          total={total}
          pageSize={20}
          className={styles.customPagination}
          itemRender={customItemRender}
        />
      </div>
    </div>
  );
};

export default Table;
