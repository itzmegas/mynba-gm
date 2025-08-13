import { Select } from "@mantine/core";

import teams from "../../data/teams.json";

export default function Home() {
  const teamOptions = teams.map((team) => ({
    label: team.full_name,
    value: team.id.toString(),
  }));

  return (
    <div>
      <Select label="Equipos" data={teamOptions} />
    </div>
  );
}
