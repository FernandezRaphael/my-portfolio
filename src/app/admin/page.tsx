"use client"; // Cette directive marque le fichier comme côté client

import { useEffect, useState } from "react";
import Image from "next/image"; // Importation de Image de Next.js

interface Project {
    id: number;
    name: string;
    year: number;
    image: string;
    link: string;
}

export default function Admin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Récupération des projets
    useEffect(() => {
        fetch("https://portfolio-backend-production-0ee9.up.railway.app/projects")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erreur lors de la récupération des projets");
                }
                return res.json();
            })
            .then((data) => setProjects(data.projects || data)) // Assurez-vous que votre réponse contient un tableau de projets
            .catch((error) => console.error(error)) // Utilisez un console.log ou une gestion d'erreur appropriée
            .finally(() => setLoading(false));
    }, []);

    // Suppression d'un projet
    const deleteProject = async (id: number) => {
        if (!confirm("Supprimer ce projet ?")) return;

        try {
            const res = await fetch(`https://portfolio-backend-production-0ee9.up.railway.app/projects/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setProjects(projects.filter((project) => project.id !== id));
            } else {
                throw new Error("Erreur lors de la suppression du projet");
            }
        } catch (error) {
            alert("Erreur lors de la suppression");
        }
    };

    const [form, setForm] = useState<{
        name: string;
        year: string;
        link: string;
        image: File | null;
    }>({ name: "", year: "", link: "", image: null });

    // Gestion des changements dans le formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Gestion des changements d'image
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, image: e.target.files ? e.target.files[0] : null });
    };

    // Soumission du formulaire
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.image) return;  // Vérification que l'image existe

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("year", form.year);
        formData.append("link", form.link);
        formData.append("image", form.image);

        try {
            const res = await fetch("https://portfolio-backend-production-0ee9.up.railway.app/projects", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                const newProject = await res.json();
                setProjects([...projects, newProject]); // Ajoute le projet à l'état local sans recharger la page
                alert("Projet ajouté !");
            } else {
                throw new Error("Erreur lors de l'ajout du projet");
            }
        } catch (error) {
            alert("Erreur lors de l'ajout du projet");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom du projet"
                    onChange={handleChange}
                    value={form.name}
                    required
                />
                <input
                    type="text"
                    name="year"
                    placeholder="Année"
                    onChange={handleChange}
                    value={form.year}
                    required
                />
                <input
                    type="text"
                    name="link"
                    placeholder="Lien"
                    onChange={handleChange}
                    value={form.link}
                    required
                />
                <input type="file" name="image" onChange={handleFileChange} required />
                <button type="submit">Ajouter</button>
            </form>

            <h1>Administration</h1>

            {loading && <p>Chargement...</p>}

            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <h2>{project.name}</h2>
                        <p>Année : {project.year}</p>
                        <Image
                            src={project.image} // L'URL de l'image
                            alt={project.name} // Texte alternatif pour l'image
                            width={100} // Largeur de l'image
                            height={100} // Hauteur de l'image
                        />
                        <p>
                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                Voir le projet
                            </a>
                        </p>
                        <button onClick={() => deleteProject(project.id)}>❌ Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
