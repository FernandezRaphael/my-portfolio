"use client";

import Footer from "../Footer";
import Hero from "../Hero";
import styles from "./Projects.module.css";

export default function Projets() {
    return (
        <div className={styles.container}>
            <div className={styles.centered_box}>
                <Hero />
            </div>
            <Footer />
        </div >
    );
}
