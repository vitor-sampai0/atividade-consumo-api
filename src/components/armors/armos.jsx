"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./armors.module.css";

const ArmorList = () => {
    const url = "https://eldenring.fanapis.com/api/armors";

    const [armors, setArmors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArmors = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setArmors(response.data.data); // Acesse a propriedade correta
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar armaduras na API", error);
                setError("Erro ao buscar armaduras na API. Tente novamente mais tarde.");
                setLoading(false);
            }
        };
        fetchArmors();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Carregando armaduras...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Armaduras de Elden Ring</h1>
            <div className={styles.armorGrid}>
                {Array.isArray(armors) && armors.map((armor) => (
                    <div key={armor.id} className={styles.armorCard}>
                        <div className={styles.imageContainer}>
                            {armor.image ? (
                                <img src={armor.image} alt={armor.name} className={styles.image} />
                            ) : (
                                <div className={styles.noImage}>Sem imagem</div>
                            )}
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.armorName}>{armor.name}</h2>
                            <p className={styles.description}>{armor.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArmorList;