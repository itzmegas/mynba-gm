"use client";

import { useUserStore } from "@/store/user.store";
import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import teams from "../../../data/teams.json";

const AppShellLayout = ({ children }: { children: React.ReactNode }) => {
  const { team } = useUserStore();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Text>
            {team ? teams.find((t) => t.id === team.id)?.full_name : "Welcome"}
          </Text>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      {/* <AppShell.Aside p="md">Aside</AppShell.Aside> */}
      <AppShell.Footer p="md">Footer</AppShell.Footer>
    </AppShell>
  );
};

export default AppShellLayout;
