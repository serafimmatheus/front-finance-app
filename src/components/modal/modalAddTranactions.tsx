import { api } from "@/data/api";
import { useAuthContext } from "@/provider/hooks/userAuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ModalAddTransactionsProps {
  onRequestClose: (value: boolean) => void;
}

const schema = z.object({
  name: z.string(),
  amount: z.string(),
  date: z.string(),
});

type Transaction = z.infer<typeof schema>;

export function ModalAddTransactions({
  onRequestClose,
}: ModalAddTransactionsProps) {
  const [ctatype, setCtaType] = useState<"perdas" | "ganhos" | "investimentos">(
    "ganhos"
  );

  const { token } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Transaction>({
    resolver: zodResolver(schema),
  });

  async function handleAddTransaction(data: Transaction) {
    const newData = {
      ...data,
      amount: Number(data.amount),
      date: dayjs(data.date).toISOString(),
      type: ctatype,
    };

    await api
      .post("/transactions", newData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        onRequestClose(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="absolute z-10 w-full h-screen bg-gray-70080">
      <section className="w-4/5 lg:w-4/12 p-8 bg-gray-100 opacity-100 m-auto mt-20 rounded-lg">
        <header>
          <h2 className="text-center text-xl font-semibold">
            Adicionar Transação
          </h2>
        </header>

        <section>
          <form
            onSubmit={handleSubmit(handleAddTransaction)}
            className="mt-10 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <input
                type="text"
                id="title"
                className="bg-gray-150 focus:border focus:border-green-500 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                placeholder="Titulo"
                {...register("name")}
              />
            </div>

            <p className="text-red-500 text-xs">{errors.name?.message}</p>

            <div className="flex flex-col gap-1">
              <input
                type="number"
                id="valor"
                className="bg-gray-150 focus:border focus:border-green-500 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                placeholder="Valor"
                {...register("amount")}
              />
            </div>

            <p className="text-red-500 text-xs">{errors.amount?.message}</p>

            <div className="flex flex-col gap-1">
              <input
                type="datetime-local"
                id="data"
                className="bg-gray-150 focus:border focus:border-green-500 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                placeholder="Data"
                {...register("date")}
                max={dayjs().format("YYYY-MM-DDThh:mm")}
              />
            </div>

            <p className="text-red-500 text-xs">{errors.date?.message}</p>

            <div className="flex gap-4">
              <button
                onClick={() => setCtaType("ganhos")}
                type="button"
                className={`px-4 py-2 border ${
                  ctatype === "ganhos"
                    ? "border-green-500 text-green-500"
                    : "border-gray-400 text-gray-400"
                }  rounded-lg text-sm font-semibold`}
              >
                Ganho
              </button>
              <button
                onClick={() => setCtaType("perdas")}
                type="button"
                className={`px-4 py-2 border ${
                  ctatype === "perdas"
                    ? "border-green-500 text-green-500"
                    : "border-gray-400 text-gray-400"
                }  rounded-lg text-sm font-semibold`}
              >
                Gastos
              </button>
              <button
                onClick={() => setCtaType("investimentos")}
                type="button"
                className={`px-4 py-2 border ${
                  ctatype === "investimentos"
                    ? "border-green-500 text-green-500"
                    : "border-gray-400 text-gray-400"
                }  rounded-lg text-sm font-semibold`}
              >
                Invest.
              </button>
            </div>

            <footer className="flex gap-2 mt-5">
              <button
                disabled={isSubmitting}
                onClick={() => onRequestClose(false)}
                className="px-4 py-2 border border-gray-400 text-gray-400 rounded-lg text-sm font-semibold"
              >
                Cancelar
              </button>
              <button
                disabled={isSubmitting}
                type="submit"
                className="px-4 py-2 border bg-gray-400 text-gray-100 rounded-lg text-sm font-semibold"
              >
                Adicionar
              </button>
            </footer>
          </form>
        </section>
      </section>
    </main>
  );
}
