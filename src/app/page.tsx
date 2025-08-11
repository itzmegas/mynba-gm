import Image from "next/image";
import styles from "./page.module.css";
import { Select } from "@mantine/core";

import teams from "../../data/teams.json";

export default function Home() {
  const teamOptions = teams.map((team) => ({
    label: team.full_name,
    value: team.id.toString(),
  }));

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Select label="Equipos" data={teamOptions} />
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}
