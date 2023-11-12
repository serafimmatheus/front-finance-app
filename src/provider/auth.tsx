import { api } from "@/data/api";
import { ReactNode, createContext } from "react";

interface IPropsChildren {
  children: ReactNode;
}

interface IAuthContext {
  signIn: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IPropsChildren) {
  async function signIn(email: string, password: string) {
    api
      .post("/users/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
}
