import React, { useEffect, useState, ChangeEvent } from 'react';
import styles from './Transcribe.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../Components/Table/Table';
import Input from '../../Components/Forms/Input';
import { fetchTranscribe } from '../../Services/Slices/transcribeSlice';
import {
    fetchUpload,
    postUploadSuccess,
} from '../../Services/Slices/uploadSlice';
import Snackbar from '../../Components/Snackbar/Snackbar';
import Button from '../../Components/Forms/Button';
import { MdUpload } from 'react-icons/md';
import PlayerCutAudio from '../../Components/CutAudio/CutAudio';
import { acceptedFormats } from '../../Components/Helper';

const Transcribe: React.FC = () => {
    const dispatch = useDispatch();
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const { data, error, loading } = useSelector(
        (state: any) => state.transcribeSlice
    );
    const uploadFile = useSelector((state: any) => state.uploadSlice);
    const sliderValues = useSelector(
        (state: any) => state.cutAudioSlice.sliderValues
    );
    const [isColorInverted] = useState<{
        [key: string]: boolean;
    }>({});

    const [page, setPage] = useState<number>(1);
    const [isDispatched, setIsDispatched] = useState<boolean>(false);
    const [isResponsive, setIsResponsive] = useState<boolean>(false);
    const [form, setForm] = useState<any>({ file: null });
    const [isInvalidfile, setIsInvalidfile] = useState<boolean>(false);
    const [updated, setUpdated] = useState<any>([]);

    const handleResize = () => {
        setIsResponsive(window.innerWidth <= 750);
    };

    const columns = [
        { title: 'Nome', property: 'name' },
        { title: 'Código', property: 'code' },
        { title: 'Data', property: 'created_at' },
    ];

    const formatDate = (dateString: string) => {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        } as Intl.DateTimeFormatOptions;
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file && validateFileFormat(file.name)) {
            setForm((prev: any) => ({
                ...prev,
                file: file,
            }));
        }

        e.target.value = '';
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (form.file && validateFileFormat(form.file.name)) {
            const formData = new FormData();
            formData.append('audio_file', form.file);
            formData.append('start_time', parseInt(sliderValues[0]).toString());
            formData.append('end_time', parseInt(sliderValues[1]).toString());

            dispatch<any>(fetchUpload(formData));
            setIsInvalidfile(false);
        }
        setForm({ file: null });
    };

    const validateFileFormat = (fileName: string) => {
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        const isValid =
            fileExtension && acceptedFormats.includes(fileExtension);
        if (isValid) {
            setIsInvalidfile(false);
        } else {
            setIsInvalidfile(true);
            setShowSnackbar(true);
        }
        return isValid;
    };

    const update = () => {
        const updatedData = data?.results?.map((item: any) => ({
            name: item.name,
            created_at: formatDate(item.created_at),
            code: item.code,
            id: item.id,
        }));
        setUpdated(updatedData);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        dispatch<any>(fetchTranscribe(page.toString()));
        setIsDispatched(true);
    }, [dispatch, page, uploadFile.data?.response]);

    useEffect(() => {
        update();
    }, [data]);

    useEffect(() => {
        if (
            !loading &&
            !error &&
            uploadFile.data?.response === 'Transcrição agendada com sucesso'
        ) {
            setShowSnackbar(true);
            dispatch(postUploadSuccess(null));
        }
    }, [loading, error, uploadFile.data?.response, dispatch]);

    useEffect(() => {
        if (!uploadFile?.loading && uploadFile?.error) {
            setShowSnackbar(true);
        }
    }, [uploadFile?.loading, uploadFile?.error]);

    return (
        <div className={styles.container}>
            {showSnackbar && (
                <Snackbar
                    setShowSnackbar={setShowSnackbar}
                    type={
                        uploadFile?.error
                            ? 'transcribeError'
                            : 'transcribeSuccess'
                    }
                />
            )}
            {showSnackbar && uploadFile?.error?.status === 429 && (
                <Snackbar
                    setShowSnackbar={setShowSnackbar}
                    type="transcribeExceededError"
                />
            )}
            {showSnackbar && isInvalidfile && (
                <Snackbar
                    setShowSnackbar={setShowSnackbar}
                    type="invalidFileError"
                />
            )}
            <div className={styles.containera}>
                <div
                    className={styles.fileText}
                    style={{ color: isColorInverted ? '#fafafa' : 'initial' }}
                ></div>

                <div className={styles.audioContainer}>
                    <PlayerCutAudio audioFile={form.file} />
                    <div className={styles.postContainer}>
                        <div className={styles.align}>
                            <div className={styles.fakeContainer}>
                            <Button
                                className={`${styles.buttonUpload} ${styles.schedule}`}
                                onClick={() => {
                                document.getElementById('file')?.click();
                                }}
                            >
                                <MdUpload size={isResponsive ? 18 : 24} color="#1e293b" />
                            </Button>
                            <Input
                                className={styles.file}
                                name="file"
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                            />
                            </div>
                            <div className={styles.schedule}>
                            <Button
                                className={`${styles.button} ${styles.schedule}`}
                                onClick={handleSubmit}
                            >
                                Transcrever
                            </Button>
                            </div>
                        </div>
                </div>

                </div>
            </div>

            <Table
                title="Transcrições em andamento"
                columns={columns}
                data={updated}
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
