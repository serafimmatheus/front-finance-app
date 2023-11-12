import { createContext, ReactNode } from "react";
import { AuthProvider } from "./auth";

interface IPropsChildren {
  children: ReactNode;
}

const AllProviders = createContext({});

export function AllProvidersContext({ children }: IPropsChildren) {
  return (
    <AllProviders.Provider value={{}}>
      <AuthProvider>{children}</AuthProvider>
    </AllProviders.Provider>
  );
}
