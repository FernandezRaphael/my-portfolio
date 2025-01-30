"use client"; // Ajoute ce flag pour permettre l'utilisation des hooks React.

import { useState } from "react";
import Image from "next/image"; // Importation du composant Image de Next.js
import styles from "./Footer.module.css";

export default function Footer() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.setAttribute(
            "data-theme",
            isDarkMode ? "light" : "dark"
        );
    };

    return (
        <footer
            className={`${styles.footer} ${isDarkMode ? styles.dark : styles.light}`}
        >
            <p className={styles.leftText}>© Raphaël Fernandez 2025</p>
            <button className={styles.toggleButton} onClick={toggleTheme}>
                <Image
                    src={isDarkMode ? "/light_mode.svg" : "/dark_mode.svg"} // Source des icônes
                    alt={isDarkMode ? "Light mode" : "Dark mode"} // Texte alternatif pour l'accessibilité
                    width={24} // Largeur de l'image
                    height={24} // Hauteur de l'image
                />
            </button>
        </footer>
    );
}
