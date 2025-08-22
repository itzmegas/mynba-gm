"use client";

import { useUserStore } from "@/store/user.store";
import { Button, Stack, Text, Title } from "@mantine/core";

export default function Home() {
  const { team } = useUserStore();

  return (
    <main>
      {!team ? (
        <Button component="a" href="/select-team">
          Seleccionar equipo
        </Button>
      ) : (
        <Stack>
          <Title>{team.full_name}</Title>

          <Stack>
            <Text>Plantilla</Text>
          </Stack>
        </Stack>
      )}
    </main>
  );
}
