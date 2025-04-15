"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./location.module.css";

const LocationList = () => {
    const url = "https://eldenring.fanapis.com/api/locations";

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url);
                setLocations(response.data.data); // Acesse a propriedade correta
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar localizações na API", error);
                setError("Erro ao buscar localizações na API. Tente novamente mais tarde.");
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Carregando localizações...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Localizações de Elden Ring</h1>
            <div className={styles.locationGrid}>
                {Array.isArray(locations) && locations.map((location) => (
                    <div key={location.id} className={styles.locationCard}>
                        <div className={styles.imageContainer}>
                            {location.image ? (
                                <img src={location.image} alt={location.name} className={styles.image} />
                            ) : (
                                <div className={styles.noImage}>Sem imagem</div>
                            )}
                        </div>
                        <div className={styles.content}>
                            <h2 className={styles.locationName}>{location.name}</h2>
                            <p className={styles.description}>{location.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationList;