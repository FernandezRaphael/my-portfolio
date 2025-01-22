import Footer from "./Footer";
import styles from "./page.module.css";
import Hero from "./Hero";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.centered_box}>
        <Hero />

      </div>
      <Footer />
    </div >
  );
}
