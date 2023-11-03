import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "./Transcribe.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import Input from "../../Components/Forms/Input";
import { fetchTranscribe } from "../../Services/Slices/transcribeSlice";
import { MdUpload } from "react-icons/md";
import Button from "../../Components/Forms/Button";
import { fetchUpload } from "../../Services/Slices/uploadSlice";
import Snackbar from "../../Components/Snackbar/Snackbar";

const Transcribe: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector(
    (state: any) => state.transcribeSlice
  );
  const uploadFile = useSelector((state: any) => state.uploadSlice);
  const [page, setPage] = useState<number>(1);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);
  const [isResponsive, setIsResponsive] = useState<boolean>(false);
  const [form, setForm] = useState<any>({ file: null });
  const [fileError, setFileError] = useState<string | null>(null);

  const columns = [
    { title: "Nome", property: "name" },
    { title: "Código", property: "code" },
    { title: "Data", property: "created_at" },
  ];

  const formatDate = (dateString: string) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    } as Intl.DateTimeFormatOptions;
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  const update = data?.results?.map((item: any) => ({
    name: item.name,
    created_at: formatDate(item.created_at),
    code: item.code,
    id: item.id,
  }));

  const handleResize = () => {
    setIsResponsive(window.innerWidth <= 750);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setForm((prev: any) => ({
      ...prev,
      file: file,
    }));
    setFileError(null);
    e.target.value = "";
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.file && validateFileFormat(form.file.name)) {
      const formData = new FormData();
      formData.append("audio_file", form.file);
      dispatch<any>(fetchUpload(formData));
      setFileError(null);
    } else {
      setFileError(
        "Formatos válidos são: MP3, MP4, WAV, FLAC, AMR, OGG e WebM"
      );
    }
    setForm({ file: null });
  };

  const validateFileFormat = (fileName: string) => {
    const acceptedFormats = ["mp3", "mp4", "wav", "flac", "amr", "ogg", "webm"];
    const fileExtension = fileName.split(".").pop()?.toLowerCase();
    return fileExtension && acceptedFormats.includes(fileExtension);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch<any>(fetchTranscribe(page.toString()));
    setIsDispatched(true);
  }, [dispatch, page, uploadFile.data?.response]);

  return (
    <div className={styles.container}>
      {uploadFile.data.response && <Snackbar type="transcribeSuccess" />}
      {uploadFile.error && <Snackbar type="transcribeError" />}
      <div className={styles.postContainer}>
        <label className={styles.fakeInput} htmlFor="file">
          <MdUpload size={isResponsive ? 18 : 24} />
        </label>
        <Input
          className={styles.file}
          name="file"
          type="file"
          id="file"
          onChange={handleFileChange}
        />
        {form.file && (
          <div className={styles.fileText}>Arquivo: {form.file.name}</div>
        )}
        <Button
          className={`${styles.button} ${styles.schedule}`}
          onClick={handleSubmit}
        >
          Transcrever
        </Button>
      </div>
      {fileError && <div className={styles.errorText}>{fileError}</div>}

      <Table
        title="Transcrições em andamento"
        columns={columns}
        data={update}
        setPage={setPage}
        page={page}
        total={data.count}
        isEmpty={isDispatched && data?.results?.length === 0}
        loading={loading || uploadFile.loading}
        error={error}
      />
    </div>
  );
};

export default Transcribe;
