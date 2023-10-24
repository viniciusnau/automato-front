import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Callback.module.css";

const Callback: React.FC = () => {
    const { apiToken } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (apiToken) {
            sessionStorage.setItem("apiToken", apiToken);
        }

        navigate("/automato/transcricoes/");
    }, [apiToken, navigate]);

    return (
        <div className={styles.container}>
            <h1>Callback Page</h1>
            {apiToken && <p>apiToken: {apiToken}</p>}
        </div>
    );
};

export default Callback;
