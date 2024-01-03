import { api } from "@/data/api";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

interface IPropsChildren {
  children: ReactNode;
}

type Transaction = {
  name: string;
  date: string;
  amount: number;
  type: string;
};

interface IPropsUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface IPropsUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

interface IPropsUserEdit {
  firstName: string;
  lastName: string;
}

interface AuthState {
  token: string;
  user: IPropsUser;
}

interface IPropsTransactions {
  amount: number;
  createdAt: string;
  date: string;
  id: string;
  name: string;
  type: string;
  userId: string;
}

interface IAuthContext {
  signIn: (
    email: string,
    password: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
  signOut(): Promise<void>;
  registerUser: (data: IPropsUserRegister) => Promise<void>;
  editUser: (data: IPropsUserEdit) => Promise<void>;
  getUserBalences: (token: string) => Promise<void>;
  createTransactions: (data: Transaction) => Promise<void>;
  setSelectadeMonth: Dispatch<SetStateAction<string>>;
  setSelectadeYear: Dispatch<SetStateAction<string>>;
  getTransactionsUser: () => Promise<void>;
  updatedTranactions: (data: Partial<IPropsTransactions>) => Promise<void>;
  deleteTransactions: (id: string) => Promise<void>;
  userAndToken: AuthState;
  selectadeYear: string;
  selectadeMonth: string;
  transactions: IPropsTransactions[];
  createTransaction: undefined;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IPropsChildren) {
  const [userAndToken, setUserAndToken] = useState<AuthState>({} as AuthState);
  const [transactions, setTransactions] = useState<IPropsTransactions[]>(
    [] as IPropsTransactions[]
  );
  const [selectadeYear, setSelectadeYear] = useState(dayjs().format("YYYY"));
  const [selectadeMonth, setSelectadeMonth] = useState(dayjs().format("MM"));

  const [createTransaction, setCreateTransaction] = useState();
  const [updatedTransaction, setUpdatedTransaction] = useState();
  const [deletedTransaction, setDeletedTransaction] = useState();

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      setUserAndToken({ token: response.data.token, user: response.data.user });

      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUserBalences = useCallback(async (token: string) => {
    await api.get("/balance", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, []);

  const registerUser = useCallback(async (data: IPropsUserRegister) => {
    await api.post("/users", data);
  }, []);

  const editUser = useCallback(
    async (data: IPropsUserEdit) => {
      await api.put(`/users/${userAndToken.user!.id}`, data, {
        headers: {
          Authorization: `Bearer ${userAndToken.token}`,
        },
      });
    },
    [userAndToken]
  );

  const createTransactions = useCallback(
    async (data: Transaction) => {
      await api
        .post("/transactions", data, {
          headers: { Authorization: `Bearer ${userAndToken.token}` },
        })
        .then((response) => {
          setCreateTransaction(response.data);
        });
    },
    [userAndToken.token]
  );

  const getTransactionsUser = useCallback(async () => {
    await api
      .get("/transactions", {
        headers: {
          Authorization: `Bearer ${userAndToken.token}`,
        },
      })
      .then((response) => {
        setTransactions(
          response.data.filter(
            (transaction: any) =>
              dayjs(transaction.date).format("MM") ===
              dayjs().format(selectadeMonth)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userAndToken.token, selectadeMonth, createTransaction]);

  const updatedTranactions = useCallback(
    async (data: Partial<IPropsTransactions>) => {
      const newData = {
        id: data.id,
        name: data.name,
        amount: data.amount,
      };

      await api
        .put(`/transactions/${data.id}`, newData, {
          headers: {
            Authorization: `Bearer ${userAndToken.token}`,
          },
        })
        .then((response) => {
          setUpdatedTransaction(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [userAndToken.token, createTransaction, updatedTransaction]
  );

  const deleteTransactions = useCallback(
    async (id: string) => {
      await api
        .delete(`/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${userAndToken.token}`,
          },
        })
        .then((response) => {
          setDeletedTransaction(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [userAndToken.token, createTransaction, deletedTransaction]
  );

  async function signOut() {
    localStorage.removeItem("@finance-app:token");
    localStorage.removeItem("@finance-app:user");

    setUserAndToken({} as AuthState);
  }

  useEffect(() => {
    const token = localStorage.getItem("@finance-app:token");
    const user = localStorage.getItem("@finance-app:user");

    if (token && user) {
      setUserAndToken({ token, user: JSON.parse(user) });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        registerUser,
        editUser,
        getUserBalences,
        createTransactions,
        setSelectadeMonth,
        setSelectadeYear,
        getTransactionsUser,
        updatedTranactions,
        deleteTransactions,
        selectadeMonth,
        selectadeYear,
        transactions,
        userAndToken,
        createTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
