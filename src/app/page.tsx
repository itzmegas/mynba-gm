"use client";

import { useEffect, useMemo, useState } from "react";
import { sortBy } from "es-toolkit";
import { Badge, Box, Flex, Group, Stack, Text, Title } from "@mantine/core";
import {
  DataTable,
  DataTableColumn,
  DataTableSortStatus,
} from "mantine-datatable";
import PlayerPhoto from "@/components/PlayerPhoto";
import { useUserStore } from "@/store/user.store";

import players_stats from "../../data/players_stats_2025_26.json";
import team_rosters from "../../data/team_rosters_2025_26.json";

import { Player, PlayerStats } from "@/types";

type ExtendedPlayer = Player & Partial<PlayerStats>;

export default function Home() {
  const { team } = useUserStore();

  const [selectedRecords, setSelectedRecords] = useState<ExtendedPlayer[]>([]);
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<ExtendedPlayer>
  >({
    columnAccessor: "PLAYER",
    direction: "asc",
  });

  const data = useMemo(() => {
    if (team) {
      const players =
        team_rosters[team.abbreviation as keyof typeof team_rosters].players;

      const playerStats = players_stats.filter(
        (player) => player.TEAM_ID === team.id
      );

      return players.map((player) => ({
        ...player,
        NAME: player.PLAYER.split(" ")[0],
        LASTNAME: player.PLAYER.split(" ").slice(1).join(" "),
        ...playerStats.find((p) => p.PLAYER_ID === player.PLAYER_ID),
      }));
    }
    return [];
  }, [team]) as ExtendedPlayer[];

  const [records, setRecords] = useState<ExtendedPlayer[]>(
    sortBy(data, ["LASTNAME"] as Array<keyof ExtendedPlayer>)
  );

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

  useEffect(() => {
    const data = sortBy(records, [sortStatus.columnAccessor] as Array<
      keyof ExtendedPlayer
    >) as ExtendedPlayer[];
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  const columns: DataTableColumn<ExtendedPlayer>[] = [
    {
      accessor: "PLAYER",
      title: "Name",
      sortable: true,
    },
    { accessor: "LASTNAME", title: "Apellido", sortable: true },
    {
      accessor: "GP",
      title: "Partidos Jugados",
    },
    {
      accessor: "MIN",
      title: "Minutos",
      /*   render: ({ MIN }: { MIN: number | null }) =>
        MIN ? MIN.toFixed(1) : null, */
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

  if (!team || !player) {
    return (
      <main>
        <Title order={2}>Selecciona un equipo para comenzar</Title>
      </main>
    );
  }

  return (
    <main>
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
                  <Text size="3rem">{player.NAME?.toLocaleUpperCase()}</Text>
                </Flex>
                <Text size="4rem" fw="900" mt={-10}>
                  {player.LASTNAME?.toLocaleUpperCase()}
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
            records={records}
            // define columns
            columns={columns}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={setSelectedRecords}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            onRowClick={({ record }) => {
              setPlayerId(record.PLAYER_ID);
              setPlayer(record);
            }}
          />
        </Stack>
      </Stack>
    </main>
  );
}
