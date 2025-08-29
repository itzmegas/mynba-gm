"use client";

import { useUserStore } from "@/store/user.store";
import {
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

import team_rosters from "../../../data/team_rosters_2025_26.json";
import teams from "../../../data/teams.json";
import { mapValues } from "es-toolkit";
import { includes } from "es-toolkit/compat";
import { Player } from "@/types";

const AppShellLayout = ({ children }: { children: React.ReactNode }) => {
  const { team } = useUserStore();
  const [opened, { toggle }] = useDisclosure();
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Player[]>([]);

  const handleSearch = () => {
    const result = Object.values(
      mapValues(team_rosters, ({ players }) =>
        players.find((p) =>
          includes(p.PLAYER.toLowerCase(), search.toLowerCase())
        )
      )
    ).filter(Boolean);

    setSearchResult(result as Player[]);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      /*  aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }} */
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Text>
            {team ? teams.find((t) => t.id === team.id)?.full_name : "Welcome"}
          </Text>

          <Button component="a" href="/select-team">
            Seleccionar equipo
          </Button>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack>
          <TextInput
            label="Buscar jugador"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Button onClick={handleSearch}>Buscar</Button>

          {searchResult.length > 0 && (
            <Stack>
              {searchResult.map((player) => (
                <Flex key={player.PLAYER_ID}>
                  <Text size="xs" fw="bold">
                    {player.PLAYER}
                  </Text>
                  <Text size="xs" ml="auto">
                    {teams.find((t) => t.id === player.TeamID)?.full_name}
                  </Text>
                </Flex>
              ))}
            </Stack>
          )}
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      {/* <AppShell.Aside p="md">Aside</AppShell.Aside> */}
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
};

export default AppShellLayout;
