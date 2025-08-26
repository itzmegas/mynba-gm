"use client";

import { Box, Image } from "@mantine/core";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_NBA;

type PlayerPhotoProps = { playerId: number | null; teamColor: string };

const PlayerPhoto = ({ playerId, teamColor }: PlayerPhotoProps) => {
  return (
    <Box w={300} h={300} bg={teamColor}>
      <Image
        src={`${baseUrl}/headshots/nba/latest/1040x760/${playerId}.png`}
        alt="player image"
        loading="lazy"
        w={300}
        h={300}
      />
    </Box>
  );
};

export default PlayerPhoto;
