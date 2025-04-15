import ArmorList from "@/components/armors/armos";
import Ammolist from "../components/ammos/ammos";  
import styles from "./page.module.css";
import BossList from "@/components/bosses/bosses";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Ammolist />
        <ArmorList />
        <BossList />
      </main>

      <footer className={styles.footer}>
        <p>Desenvolvido durante o curso de Desenvolvimento de Sistemas</p>
      </footer>
    </div>
  );
}