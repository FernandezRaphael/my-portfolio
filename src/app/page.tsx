import Footer from "./Footer";
import styles from "./page.module.css";
import Hero from "./Hero";
import About from "./About";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.centered_box}>
        <Hero />
        <About />
      </div>
      <Footer />
    </div >
  );
}
