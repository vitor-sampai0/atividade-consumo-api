import ArmorList from "../components/armors/armos";
import Ammolist from "../components/ammos/ammos";  
import BossList from "../components/bosses/bosses";
import ClassList from "../components/classe/classes";
import LocationList from "../components/location/location";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.leftColumn}>
          <Ammolist />
          <ArmorList />
          <BossList />
          <ClassList />
          <LocationList />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Desenvolvido durante o curso de Desenvolvimento de Sistemas</p>
      </footer>
    </div>
  );
}