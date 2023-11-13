import { api } from "@/data/api";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, use, useEffect, useState } from "react";

interface IPropsChildren {
  children: ReactNode;
}

interface IPropsUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface IPropsUserEdit {
  firstName: string;
  lastName: string;
}

interface IAuthContext {
  signIn: (email: string, password: string) => Promise<void>;
  signOut(): Promise<void>;
  getUserBalences(token: string): Promise<void>;
  editUser(data: IPropsUserEdit): Promise<void>;
  token: string | undefined;
  user: IPropsUser | undefined;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IPropsChildren) {
  const [token, setToken] = useState<string | undefined>();
  const [user, setUser] = useState<IPropsUser>();

  const router = useRouter();

  async function signIn(email: string, password: string) {
    api
      .post("/users/login", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem(
          "@finance-app:token",
          JSON.stringify(response.data.token)
        );

        localStorage.setItem(
          "@finance-app:user",
          JSON.stringify(response.data.user)
        );

        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getUserBalences(token: string) {
    api
      .get("/balance", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function editUser(data: IPropsUserEdit) {
    await api
      .put(`/users/${user!.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Usuário editado com sucesso!");
      })
      .catch((error) => {
        alert("Erro ao editar usuário!");
      });
  }

  async function signOut() {
    localStorage.removeItem("@finance-app:token");
    localStorage.removeItem("@finance-app:user");

    setToken(undefined);
    setUser(null as any);

    router.push("/");
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("@finance-app:token");
    const storedUser = localStorage.getItem("@finance-app:user");

    if (storedToken && storedUser) {
      setToken(JSON.parse(storedToken));
      setUser(JSON.parse(storedUser));

      router.push("/dashboard");
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ getUserBalences, signIn, signOut, editUser, user, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
