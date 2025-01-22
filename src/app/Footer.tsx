"use client"; // Ajoute ce flag pour permettre l'utilisation des hooks React.

import { useState } from "react";
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
            className={`${styles.footer} ${isDarkMode ? styles.dark : styles.light
                }`}
        >
            <button className={styles.toggleButton} onClick={toggleTheme} >
                <img
                    src={isDarkMode ? "/light_mode.svg" : "/dark_mode.svg"}
                    alt={isDarkMode ? "Light mode" : "Dark mode"}
                    width={24}
                    height={24}
                />
            </button>
        </footer>
    );
}
