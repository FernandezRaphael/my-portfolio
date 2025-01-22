"use client";

import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <div className={styles.hero}>
            <h1>Fernandez Raphaël</h1>
            <div className={styles.menuWrapper}>
                <span className={styles.menuTrigger}>Menu</span>
                <div className={styles.dropdownMenu}>
                    <ul>
                        <li><a href="#projects">Projets</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
