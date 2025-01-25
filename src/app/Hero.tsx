"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <div className={styles.hero}>
            <Link href="/"><h1 className={styles.h1}>Fernandez Raphaël</h1></Link>
            <div className={styles.menuWrapper}>
                <span className={styles.menuTrigger}>Menu</span>
                <div className={styles.dropdownMenu}>
                    <ul>
                        <li><Link href="/projets">Projets</Link></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
