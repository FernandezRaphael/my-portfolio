"use client";

import Footer from "../Footer";
import Hero from "../Hero";
import styles from "../page.module.css";
import stylesAbout from "../About.module.css";
import stylesProjects from "./Projects.module.css";
import { useEffect, useState } from "react";

interface Project {
    id: number;
    name: string;
    year: number;
    image: string;
    link: string;
}

export default function Projets() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [projectsLimit, setProjectsLimit] = useState(5);

    useEffect(() => {
        const updateLimit = () => {
            setProjectsLimit(window.innerWidth <= 1000 ? 2 : 5);
        };

        // Définir la limite initiale
        updateLimit();

        // Ajouter un écouteur pour le redimensionnement
        window.addEventListener('resize', updateLimit);

        return () => window.removeEventListener('resize', updateLimit);
    }, []);

    useEffect(() => {
        fetch(`https://portfolio-backend-production-0ee9.up.railway.app/projects?page=${currentPage}&limit=${projectsLimit}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des projets.");
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data.projects);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error("Erreur :", error);
                setError("Impossible de récupérer les projets pour le moment.");
            })
            .finally(() => setLoading(false));
    }, [currentPage, projectsLimit]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.centered_box}>
                    <h2>Chargement des projets...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.centered_box}>
                    <h2>{error}</h2>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.centered_box}>
                <Hero />
                <div className={stylesAbout.about}>
                    <div className={stylesProjects.projectContainer}>
                        {projects.map((project) => (
                            <div
                                className={`${stylesProjects.projectCard} ${stylesAbout.containerDiv}`}
                                key={project.id}
                                style={{
                                    backgroundImage: `url(${project.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <div className={stylesAbout.content}>
                                    <h2>{project.name}</h2>
                                    <span>{project.year}</span>
                                    <p><a href={project.link} target="_blank" rel="noopener noreferrer">Voir le projet</a></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={stylesProjects.pagination}>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Précédent
                    </button>
                    <span>Page {currentPage} / {totalPages}</span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Suivant
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

