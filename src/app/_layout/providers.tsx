import { theme } from "@/lib/mantine";
import { MantineProvider } from "@mantine/core";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => (
  <MantineProvider theme={theme}>{children}</MantineProvider>
);

export default Providers;
