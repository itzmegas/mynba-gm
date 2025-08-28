"use client";

import { Box, Image } from "@mantine/core";
import classes from "./PlayerPhoto.module.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_NBA;

type PlayerPhotoProps = { playerId: number | null; teamColor: string };

const PlayerPhoto = ({ playerId, teamColor }: PlayerPhotoProps) => {
  return (
    <Box
      className={classes.backgroundPhoto}
      w={300}
      h={300}
      style={{
        "--background-team-color": teamColor,
      }}
    >
      <Image
        src={`${baseUrl}/headshots/nba/latest/1040x760/${playerId}.png`}
        alt="player image"
        loading="lazy"
        w={300}
        h={300}
        pt="3rem"
      />
    </Box>
  );
};

export default PlayerPhoto;
