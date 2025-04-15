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
                // Acesse a propriedade correta da resposta
                setArmors(response.data.data); // Supondo que o array está em response.data.data
                setLoading(false);
            } catch (error) {
                console.log("Erro ao buscar armors na API");
                setError("Erro ao buscar armors na API. Tente novamente mais tarde.");
                setLoading(false);
            }
        };
        fetchArmors();
    }, []);

    if (loading) {
        return (
            <div className={styles.loading}>
                Carregando armors
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
            <h1 className={styles.name}>Armarduras de Elden Ring</h1>
            <div className={styles.armorsGrid}>
                {Array.isArray(armors) && armors.map((armor) => (
                    <div key={armor.id} className={styles.armorCard}>
                        <div className={styles.imageContainer}>
                            <img src={armor.image} alt={armor.name} className={styles.image} />
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.armorname}>{armor.name}</h2>
                            <p className={styles.description}>Description: {armor.description}</p>
                            <div className={styles.attributes}>
                            <p className={styles.category}><p className={styles.type}>👇 Type 👇</p> {armor.category}</p>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArmorList;