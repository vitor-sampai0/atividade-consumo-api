"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ammos.module.css";

const AmmoList = () => {
    const url = "https://eldenring.fanapis.com/api/ammos";

    const [ammos, setAmmos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAmmos = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                // Acesse a propriedade correta da resposta
                setAmmos(response.data.data); // Supondo que o array está em response.data.data
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar ammos na API");
                setError("Erro ao buscar ammos na API. Tente novamente mais tarde.");
                setLoading(false);
            }
        };
        fetchAmmos();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                Carregando ammos
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                {error}
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.name}>Munições de Elden Ring</h1>
            <div className={styles.ammosGrid}>
                {Array.isArray(ammos) && ammos.map((ammo) => (
                    <div key={ammo.id} className={styles.ammoCard}>
                        <div className={styles.imageContainer}>
                            <img src={ammo.image} alt={ammo.name} className={styles.image} />
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.ammoname}>{ammo.name}</h2>
                            <p className={styles.description}>Description: {ammo.description}</p>
                            <p className={styles.type}>{ammo.type}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmmoList;