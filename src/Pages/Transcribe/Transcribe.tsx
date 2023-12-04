import React, { useEffect, useState, ChangeEvent } from 'react';
import styles from './Transcribe.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../Components/Table/Table';
import Input from '../../Components/Forms/Input';
import { fetchTranscribe } from '../../Services/Slices/transcribeSlice';
import { MdUpload } from 'react-icons/md';
import Button from '../../Components/Forms/Button';
import { fetchUpload } from '../../Services/Slices/uploadSlice';
import Snackbar from '../../Components/Snackbar/Snackbar';
import Player from '../../Components/AudioPlayer/AudioPlayer';

const Transcribe: React.FC = () => {
    const dispatch = useDispatch();
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const { data, error, loading } = useSelector(
        (state: any) => state.transcribeSlice
    );
    const uploadFile = useSelector((state: any) => state.uploadSlice);
    const [isColorInverted, setIsColorInverted] = useState<{
        [key: string]: boolean;
    }>({});

    const colorInvertedState = useSelector(
        (state: any) => state.a11ySlice.colorInverted
    );
    const [page, setPage] = useState<number>(1);
    const [isDispatched, setIsDispatched] = useState<boolean>(false);
    const [isResponsive, setIsResponsive] = useState<boolean>(false);
    const [form, setForm] = useState<any>({ file: null });
    const [isInvalidfile, setIsInvalidfile] = useState<boolean>(false);
    const [updated, setUpdated] = useState<any>([]);
    const [barWidth, setBarWidth] = useState(200); // Initial width

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

    const update = () => {
        setUpdated(
            data?.results?.map((item: any) => ({
                name: item.name,
                created_at: formatDate(item.created_at),
                code: item.code,
                id: item.id,
            }))
        );
    };

    const handleResize = () => {
        setIsResponsive(window.innerWidth <= 750);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setShowSnackbar(true);
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
            dispatch<any>(fetchUpload(formData));
            setIsInvalidfile(false);
            setShowSnackbar(true);
        }
        setForm({ file: null });
    };

    const validateFileFormat = (fileName: string) => {
        const acceptedFormats = ['mp3', 'mp4', 'wav', 'flac', 'amr', 'ogg'];
        const fileExtension = fileName.split('.').pop()?.toLowerCase();
        const isValid =
            fileExtension && acceptedFormats.includes(fileExtension);
        isValid ? setIsInvalidfile(false) : setIsInvalidfile(true);
        return isValid;
    };

    const handleMouseDown = (e: any) => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: any) => {
        const newWidth = e.clientX;

        setBarWidth(newWidth);
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
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
        setShowSnackbar(false);
    }, []);

    useEffect(() => {
        setIsColorInverted(colorInvertedState);
    }, [colorInvertedState]);
    console.log(`form? `, form);
    return (
        <div className={styles.container}>
            {showSnackbar && uploadFile.data.response && (
                <Snackbar
                    setShowSnackbar={setShowSnackbar}
                    type="transcribeSuccess"
                />
            )}
            {showSnackbar &&
                uploadFile?.error?.status &&
                uploadFile?.error?.status !== 429 && (
                    <Snackbar
                        setShowSnackbar={setShowSnackbar}
                        type="transcribeError"
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

                <Button
                    className={`${styles.button} ${styles.schedule}`}
                    onClick={handleSubmit}
                >
                    Transcrever
                </Button>
            </div>
            <div className={styles.containera}>
                <div
                    className={styles.fileText}
                    style={{ color: isColorInverted ? '#fafafa' : 'initial' }}
                >
                </div>
                {form.file && uploadFile && (
                <Player audioFile={form.file}  />
                )}
                <div className={styles.resizableContainer}>
                    <div
                        className={styles.leftContent}
                        style={{ width: barWidth }}
                        onClick={() => {
                            console.log('left');
                        }}
                    ></div>
                    <div
                        className={styles.resizableBar}
                        onMouseDown={handleMouseDown}
                    ></div>
                    <div
                        className={styles.rightContent}
                        onClick={() => {
                            console.log('right');
                        }}
                    ></div>
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
