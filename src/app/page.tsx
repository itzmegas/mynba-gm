"use client";

import { useUserStore } from "@/store/user.store";
import { Box, Button, Flex, Image, Stack, Text, Title } from "@mantine/core";
import { DataTable } from "mantine-datatable";

import players from "../../data/players_stats_2023_24.json";
import { useMemo, useState } from "react";
import { Player } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_NBA;

export default function Home() {
  const { team } = useUserStore();

  const data = useMemo(
    () => players.filter((player) => player.TEAM_ID === team?.id) ?? [],
    [team]
  );

  console.log("🚀 ~ Home ~ data:", data);

  const [player, setPlayer] = useState<Player>(data[0]);

  const columns = [
    {
      accessor: "PLAYER_NAME",
      title: "Name",
    },
    {
      accessor: "GP",
      title: "Partidos Jugados",
    },
    {
      accessor: "MIN",
      title: "Minutos",
      render: ({ MIN }: { MIN: number }) => MIN.toFixed(1),
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
          {player && (
            <Stack>
              <Flex>
                <Box w={200} h={150}>
                  <Image
                    src={`${baseUrl}/headshots/nba/latest/1040x760/${player.PLAYER_ID}.png`}
                    alt="player image"
                  />
                </Box>

                <Title>{player.PLAYER_NAME}</Title>
              </Flex>

              <Text>AGE {player.AGE}</Text>
            </Stack>
          )}
          <Stack>
            <Text>Plantilla</Text>

            <DataTable
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
                setPlayer(record);
              }}
            />
          </Stack>
        </Stack>
      )}
    </main>
  );
}
