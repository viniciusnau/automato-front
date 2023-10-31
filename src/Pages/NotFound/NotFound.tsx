import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/automato/transcricoes/");
    }, [navigate]);

    return (
        <div></div>
    );
};

export default NotFound;
