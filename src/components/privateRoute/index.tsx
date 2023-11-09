import { checkAuthenticationUser } from "@/utils/checkAuthenticationUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { push } = useRouter();
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("@finance-app:token") ?? "");

    if (!token) {
      push("/login");
    }

    console.log(token);
  }, [token, push]);

  return (
    <>
      {!token && null}
      {token && children}
    </>
  );
}
