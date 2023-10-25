import React, { useEffect, useState, ChangeEvent } from "react";
import styles from "./Transcribe.module.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table/Table";
import Input from "../../Components/Forms/Input";
import { fetchTranscribe } from "../../Services/Slices/transcribeSlice";
import { MdUpload } from "react-icons/md";
import Button from "../../Components/Forms/Button";
import { fetchUpload } from "../../Services/Slices/uploadSlice";
import Loading from "../../Components/Loading/Loading";

const Transcribe: React.FC = () => {
    const dispatch = useDispatch();
    const getTranscriptions = useSelector((state: any) => state.transcribeSlice);
    const [page, setPage] = useState<number>(1);
    const [isDispatched, setIsDispatched] = useState<boolean>(false);
    const [isResponsive, setIsResponsive] = useState<boolean>(false);
    const [form, setForm] = useState<any>({ file: null });
    const [fileError, setFileError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    const formatDate = (dateString: string) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as Intl.DateTimeFormatOptions;
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

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
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.file && validateFileFormat(form.file.name)) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("audio_file", form.file);
            dispatch<any>(fetchUpload(formData))
                .then(() => {
                    setIsUploading(false);
                })
                .catch(() => {
                    setIsUploading(false);
                });
            setForm({ file: null });
            setFileError(null);
        } else {
            setFileError("Formatos válidos são: MP3, MP4, WAV, FLAC, AMR, OGG e WebM");
        }
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
        setIsLoadingPage(true);
        dispatch<any>(fetchTranscribe(page.toString()))
            .then(() => {
                setIsLoadingPage(false);
            })
            .catch(() => {
                setIsLoadingPage(false);
            });
        setIsDispatched(true);
    }, [dispatch, page]);

    const columns = [
        { title: "Nome", property: "name" },
        { title: "Código", property: "code" },
        { title: "Data", property: "created_at" }
    ];

    const data = getTranscriptions?.data?.results?.map((item: any) => ({
        name: item.name,
        created_at: formatDate(item.created_at),
        code: item.code,
        id: item.id
    }));

    return (
        <div className={styles.container}>
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
            {fileError && (
                <div className={styles.errorText}>{fileError}</div>
            )}

            {isUploading ? (
                <Loading size="5rem" type="spin" />
            ) : isLoadingPage ? (
                <Loading size="5rem" type="spin" />
            ) : (
                <Table
                    title="Transcrições em andamento"
                    columns={columns}
                    data={data}
                    setPage={setPage}
                    page={page}
                    total={getTranscriptions.data.count}
                    isEmpty={isDispatched && getTranscriptions?.data?.results?.length === 0}
                    loading={getTranscriptions.loading}
                    error={getTranscriptions.error}
                />
            )}
        </div>
    );
};

export default Transcribe;
