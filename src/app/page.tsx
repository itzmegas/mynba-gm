"use client";

import { useEffect, useMemo, useState } from "react";
import { useUserStore } from "@/store/user.store";
import {
  Badge,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";

import players_stats from "../../data/players_stats_2023_24.json";
import team_rosters from "../../data/team_rosters_2023_24.json";

import { Player, PlayerStats } from "@/types";
import PlayerPhoto from "@/components/PlayerPhoto";

export default function Home() {
  const { team } = useUserStore();

  const [playerId, setPlayerId] = useState<number | null>(null);
  const [player, setPlayer] = useState<(Player & Partial<PlayerStats>) | null>(
    null
  );

  const data = useMemo(() => {
    if (team) {
      const players =
        team_rosters[team.abbreviation as keyof typeof team_rosters].players;

      const playerStats = players_stats.filter(
        (player) => player.TEAM_ID === team.id
      );

      console.log(playerStats);

      return players.map((player) => ({
        ...player,
        ...playerStats.find((p) => p.PLAYER_ID === player.PLAYER_ID),
      }));
    }
    return [];
  }, [team]) as (Player & PlayerStats)[];

  useEffect(() => {
    if (team) {
      const findedPlayer =
        team_rosters[team.abbreviation as keyof typeof team_rosters].players[0];

      if (findedPlayer) {
        setPlayer(findedPlayer);
        setPlayerId(findedPlayer.PLAYER_ID);
      }
    }
  }, [team]);

  const columns = [
    {
      accessor: "PLAYER",
      title: "Name",
    },
    {
      accessor: "GP",
      title: "Partidos Jugados",
    },
    {
      accessor: "MIN",
      title: "Minutos",
      render: ({ MIN }: { MIN: number | null }) =>
        MIN ? MIN.toFixed(1) : null,
    },
    {
      accessor: "PTS",
      title: "Puntos",
    },
    {
      accessor: "AST",
      title: "Asistencias",
    },
    {
      accessor: "REB",
      title: "Rebotes",
    },
    {
      accessor: "BLK",
      title: "Tapones",
    },
    {
      accessor: "STL",
      title: "Robos",
    },
  ];

  return (
    <main>
      {!team ? (
        <Button component="a" href="/select-team">
          Seleccionar equipo
        </Button>
      ) : (
        <Stack>
          {playerId && player && (
            <Flex gap="md">
              <Box pos="relative">
                <PlayerPhoto playerId={playerId} teamColor={team.colors[0]} />
                <Text pos="absolute" top={5} right={15} size="4rem" c="white">
                  {player.NUM}
                </Text>
              </Box>
              <Stack>
                <Box>
                  <Flex gap="sm" align="center">
                    <Badge size="xl" color={team.colors[0]} radius="xs">
                      {player.POSITION.toLocaleUpperCase()}
                    </Badge>
                    <Text size="3rem">
                      {player.PLAYER.split(" ")[0].toLocaleUpperCase()}
                    </Text>
                  </Flex>
                  <Text size="4rem" fw="900" mt={-10}>
                    {player.PLAYER.split(" ")
                      .slice(1)
                      .join(" ")
                      .toLocaleUpperCase()}
                  </Text>
                </Box>

                <Group>
                  <Text>Age {player.AGE}</Text>
                  <Text>Height {player.HEIGHT}</Text>
                  <Text>Weight {player.WEIGHT}</Text>
                  <Text>Experience {player.EXP}</Text>
                  <Text>{player.HOW_ACQUIRED}</Text>
                </Group>
              </Stack>
            </Flex>
          )}
          <Stack>
            <Text>Plantilla</Text>

            <DataTable
              idAccessor="PLAYER_ID"
              withTableBorder
              borderRadius="sm"
              withColumnBorders
              striped
              highlightOnHover
              // provide data
              records={data}
              // define columns
              columns={columns}
              onRowClick={({ record }) => {
                setPlayerId(record.PLAYER_ID);
                setPlayer(record);
              }}
            />
          </Stack>
        </Stack>
      )}
    </main>
  );
}
