"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./bosses.module.css";

const BossList = () => {
    const url = "https://eldenring.fanapis.com/api/bosses";

    const [bosses, setBosses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBosses = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setBosses(response.data.data); // Acesse a propriedade correta
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar bosses na API", error);
                setError("Erro ao buscar bosses na API. Tente novamente mais tarde.");
                setLoading(false);
            }
        };
        fetchBosses();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Carregando bosses...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Bosses de Elden Ring</h1>
            <div className={styles.bossGrid}>
                {Array.isArray(bosses) && bosses.map((boss) => (
                    <div key={boss.id} className={styles.bossCard}>
                        <div className={styles.imageContainer}>
                            {boss.image ? (
                                <img src={boss.image} alt={boss.name} className={styles.image} />
                            ) : (
                                <div className={styles.noImage}>Sem imagem</div>
                            )}
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.bossName}>{boss.name}</h2>
                            <p className={styles.region}>Região: {boss.region}</p>
                            <p className={styles.description}>{boss.description}</p>
                            <p className={styles.location}>Localização: {boss.location}</p>
                            <p className={styles.drops}>
                                Drops: {boss.drops.join(", ")}
                            </p>
                            <p className={styles.healthPoints}>HP: {boss.healthPoints}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BossList;