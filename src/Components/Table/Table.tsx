import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Pagination from "rc-pagination";
import Button from "../Forms/Button";
import { MdArrowForward, MdDelete, MdDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
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
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [isResponsive, setIsResponsive] = useState<boolean>(false);
  const [isColorInverted, setIsColorInverted] = useState<{
    [key: string]: boolean;
  }>({});
  const colorInvertedState = useSelector(
    (state: any) => state.a11ySlice.colorInverted
  );

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleDetailsClick = (id: string) => {
    navigate("/automato/visualizacao", { state: id });
  };

  const handleDeleteClick = async (id: string) => {
    setLoadingStates({ ...loadingStates, [id]: true });
    dispatch<any>(fetchDeleteFile(id)).then(() => {
      setLoadingStates({ ...loadingStates, [id]: false });
    });
  };

  const customItemRender = (current: number, type: string) => {
    if (type === "page") {
      return (
        current === page && (
          <span
            className={styles.currentPage}
            style={{
              color: isColorInverted ? "white" : "initial",
            }}
          >
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

  useEffect(() => {
    setIsColorInverted(colorInvertedState);
  }, [colorInvertedState]);

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        {title && (
          <div
            className={styles.headerTable}
            style={{
              color: isColorInverted ? "#fafafa" : "initial",
            }}
          >
            {title}
          </div>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.tableHeader}>
          {columns.map((column, index) => (
            <div key={index} className={`${styles.columnHeader} ${index === 0 ? styles.firstColumn : ''}`}>
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
                <div
                  className={styles.empty}
                  style={{ color: isColorInverted ? "#fafafa" : "initial" }}
                >
                  {isEmpty
                    ? "Não foi encontrado nenhum conteúdo!"
                    : "Não foi possível carregar as informações!"}
                </div>
              ) : (
                <>
                  {data?.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.tableRow}>
                      {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className={`${styles.row} ${columnIndex === 0 ? styles.firstCell : ''}`}>
                          {column.property === "presigned_url" ? (
                            <Button
                              onClick={() => null}
                              className={styles.button}
                            >
                              <MdDownload size={isResponsive ? 12 : 24} />
                            </Button>
                          ) : column.property === "delete" ? (
                            <Button
                              onClick={() => handleDeleteClick(row.id)}
                              className={styles.button}
                            >
                              <MdDelete
                                size={isResponsive ? 12 : 24}
                                className={`${styles.button} ${
                                  loadingStates[row.id] ? styles.spin : ""
                                }`}
                              />
                            </Button>
                          ) : column.property === "details" ? (
                            <Button
                              onClick={() => handleDetailsClick(row.id)}
                              className={styles.button}
                            >
                              <MdArrowForward size={isResponsive ? 18 : 24} />
                            </Button>
                          ) : (
                            <div
                              className={styles.tableCell}
                              style={{
                                color: isColorInverted ? "#fafafa" : "initial",
                              }}
                            >
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
          pageSize={10}
          className={styles.customPagination}
          itemRender={customItemRender}
        />
      </div>
    </div>
  );
};

export default Table;
