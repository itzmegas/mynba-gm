"use client";

import { Box, Button, Card, Group, Image, Stack, Text } from "@mantine/core";
import teams from "../../data/teams.json";
import NextImage from "next/image";

export const SelectTeam = () => {
  return (
    <Stack>
      <Group grow>
        {teams.map((team) => (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            miw="14rem"
            withBorder
            key={team.id}
          >
            <Stack align="center">
              <Card.Section>
                <Box h="150" w="150">
                  <Image
                    component={NextImage}
                    src={`https://cdn.nba.com/logos/nba/${team.id}/global/L/logo.svg`}
                    height={150}
                    width={150}
                    alt="team logo"
                  />
                </Box>
              </Card.Section>

              <Stack align="center" gap="2">
                <Text fw={500}>{team.full_name}</Text>
                <Text size="xs" c="dimmed">
                  ({team.state}-{team.city})
                </Text>
              </Stack>

              <Button color={team.colors[0]} fullWidth mt="md" radius="md">
                Seleccionar
              </Button>
            </Stack>
          </Card>
        ))}
      </Group>
    </Stack>
  );
};
