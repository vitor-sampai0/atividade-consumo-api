"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./classes.module.css";

const ClassList = () => {
    const url = "https://eldenring.fanapis.com/api/classes";

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setClasses(response.data.data); // Acesse a propriedade correta
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar classes na API", error);
                setError("Erro ao buscar classes na API. Tente novamente mais tarde.");
                setLoading(false);
            }
        };
        fetchClasses();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Carregando classes...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Classes de Elden Ring</h1>
            <div className={styles.classGrid}>
                {Array.isArray(classes) && classes.map((cls) => (
                    <div key={cls.id} className={styles.classCard}>
                        <div className={styles.imageContainer}>
                            {cls.image ? (
                                <img src={cls.image} alt={cls.name} className={styles.image} />
                            ) : (
                                <div className={styles.noImage}>Sem imagem</div>
                            )}
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.className}>{cls.name}</h2>
                            <p className={styles.description}>{cls.description}</p>
                            <p className={styles.stats}>
                                <strong>Stats:</strong> {Object.entries(cls.stats).map(([key, value]) => `${key}: ${value}`).join(", ")}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassList;