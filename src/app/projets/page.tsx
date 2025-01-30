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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);

    useEffect(() => {
        fetch(`https://portfolio-backend-production-0ee9.up.railway.app/projects`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des projets.");
                }
                return response.json();
            })
            .then((data) => {
                setProjects(data.projects);
            })
            .catch((error) => {
                console.error("Erreur :", error);
                setError("Impossible de récupérer les projets pour le moment.");
            })
            .finally(() => setLoading(false));
    }, []);

    const nextProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
        setRotation(prev => prev - (360 / projects.length));
    };

    const previousProject = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
        setRotation(prev => prev + (360 / projects.length));
    };

    const handleWheel = (event: React.WheelEvent) => {
        if (event.deltaY > 0) {
            nextProject();
        } else {
            previousProject();
        }
    };

    const handleTouchStart = (event: React.TouchEvent) => {
        setTouchStart(event.touches[0].clientX);
    };

    const handleTouchMove = (event: React.TouchEvent) => {
        if (!touchStart) return;

        const touchEnd = event.touches[0].clientX;
        const diff = touchStart - touchEnd;

        // Si le mouvement est suffisant (plus de 50px)
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextProject();
            } else {
                previousProject();
            }
            setTouchStart(null);
        }
    };

    const handleTouchEnd = () => {
        setTouchStart(null);
    };

    const getProjectStyle = (index: number) => {
        const totalProjects = projects.length;
        const angle = (360 / totalProjects) * index;
        const radius = 270; // Comme dans l'exemple

        return {
            transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        };
    };

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
                    <div className={stylesProjects.carouselContainer}>
                        <div
                            className={stylesProjects.carousel}
                            style={{ transform: `rotateY(${rotation}deg)` }}
                            onWheel={handleWheel}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className={`${stylesProjects.projectCard} ${stylesAbout.containerDiv}`}
                                    style={{
                                        backgroundImage: `url(${project.image})`,
                                        backgroundSize: '100% 100%',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        ...getProjectStyle(index)
                                    }}
                                    onClick={() => {
                                        const diff = index - currentIndex;
                                        const shortestPath = ((diff + projects.length / 2) % projects.length) - projects.length / 2;
                                        setRotation(prev => prev - (360 / projects.length) * shortestPath);
                                        setCurrentIndex(index);
                                    }}
                                >
                                    <div className={stylesAbout.content}>
                                        <h2>{project.name}</h2>
                                        <span>{project.year}</span>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={stylesProjects.projectLink}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Voir le projet
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

