import { HeaderAppDesktop } from "@/components/HeaderAppDesktop";
import { BalenceCard } from "@/components/balenceCard";
import { HeaderApp } from "@/components/headerApp";
import { ModalAddTransactions } from "@/components/modal/modalAddTranactions";
import { useAuthContext } from "@/provider/hooks/userAuthProvider";
import { Export, Plus } from "@phosphor-icons/react";
import dayjs from "dayjs";
import { NextSeo } from "next-seo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Chart from "react-google-charts";

interface IPropsBalence {
  balence: number;
  earnings: number;
  expenses: number;
  investments: number;
  userId: string;
}

type Transaction = {
  id: string;
  name: string;
  date: string;
  amount: number;
  type: string;
};

export default function DashbordPage() {
  const [openModal, setOpenModal] = useState(false);
  const [balences, setBalences] = useState<IPropsBalence>();
  const [dataUpdated, setDataUpdated] = useState<Transaction>();

  const {
    selectadeMonth,
    selectadeYear,
    setSelectadeMonth,
    setSelectadeYear,
    getTransactionsUser,
    transactions,
    createTransaction,
  } = useAuthContext();

  const dateFormater = `${selectadeYear}-${selectadeMonth}`;
  const { userAndToken } = useAuthContext();

  const router = useRouter();

  const data = [
    ["Task", "Hours per Day"],
    ["Ganhos", balences?.expenses ?? 0],
    ["Gastos", balences?.earnings ?? 0],
    ["Investimentos", balences?.investments ?? 0],
  ];

  const options = {
    title: "Gastos",
    pieHole: 0.3,
    is3D: false,
    colors: ["#55D462", "#FD3E3E", "#589BFF"],
  };

  async function fetchData() {
    //
    const response = await fetch(
      `http://localhost:5001/api/balence/${dateFormater.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${userAndToken.token}`,
        },
      }
    );

    const data = await response.json();
    setBalences(data);
  }

  useEffect(() => {
    if (!userAndToken.token && !userAndToken.user) {
      router.push("/login");
    }

    fetchData();
  }, [selectadeMonth, userAndToken.token, userAndToken.user, router]);

  async function handleUpdatedTransaction(data: Transaction) {
    setDataUpdated(data);
    setOpenModal(true);
  }

  useEffect(() => {
    getTransactionsUser();
  }, [getTransactionsUser, transactions]);

  return (
    <>
      <NextSeo
        title="Dashboard | Finance App"
        description="Controle suas finanças pessoais de maneira fácil e inteligente!"
        noindex
      />
      {!userAndToken.token && !userAndToken.user ? null : (
        <main
          className={`${
            openModal ? "fixed" : ""
          } lg:flex relative top-0 bottom-0`}
        >
          <HeaderApp />

          <HeaderAppDesktop />

          {openModal && (
            <ModalAddTransactions
              onRequestClose={setOpenModal}
              data={dataUpdated}
              onClearData={() => setDataUpdated({} as Transaction)}
            />
          )}

          <section className="lg:w-3/4 lg:max-w-5xl lg:m-auto p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-normal">
                Olá,{" "}
                <span className="font-semibold">
                  {userAndToken.user?.firstName}!
                </span>
              </h2>

              <select
                name="meses"
                id="meses"
                className="px-4 py-2 rounded-lg bg-gray-400 text-gray-100 text-sm"
                defaultValue={selectadeMonth}
                onChange={(e) => setSelectadeMonth(e.target.value)}
              >
                {Array.from({ length: Number(dayjs().format("MM")) }).map(
                  (_, index) => (
                    <option key={index} value={index + 1}>
                      {dayjs().month(index).format("MMMM")}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="flex flex-col gap-5 mt-10 md:flex-row md:flex-wrap">
              <BalenceCard title="Saldo" value={balences?.balence ?? 0} />
              <BalenceCard title="Ganhos" value={balences?.expenses ?? 0} />
              <BalenceCard title="Gastos" value={balences?.earnings ?? 0} />
              <BalenceCard
                title="Investimentos"
                value={balences?.investments ?? 0}
              />
            </div>

            <div className="lg:flex lg:gap-10">
              <div className="bg-gray-100 p-6 lg:p-8 h-96 overflow-auto rounded-lg flex flex-col my-10 lg:w-1/2">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm lg:text-lg font-semibold">
                    Transações
                  </h2>

                  <div className="flex flex-1 justify-end gap-2">
                    <button
                      onClick={() => setOpenModal(true)}
                      className="bg-gray-400 text-gray-100 text-xs gap-2 rounded-lg px-2 py-2 flex items-center justify-center"
                    >
                      <Plus size={16} color="#ffffff" />
                      <span>Adicionar</span>
                    </button>

                    <button className="bg-gray-400 text-gray-100 text-xs gap-2 rounded-lg p-2 flex items-center justify-center">
                      <Export size={16} color="#ffffff" />
                    </button>
                  </div>
                </div>

                {transactions.length === 0 ? (
                  <div className="border border-dashed mt-10 h-full flex items-center justify-center animate-pulse">
                    <p className="text-base text-gray-300">
                      Você não possui nenhuma transação!
                    </p>
                  </div>
                ) : (
                  <table className="mt-10">
                    <thead>
                      <tr>
                        <td className="text-sm font-medium text-gray-300">
                          Titulo
                        </td>
                        <td className="text-sm font-medium text-gray-300">
                          Quantidade
                        </td>
                      </tr>
                    </thead>

                    <tbody className="">
                      {transactions.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="border-b border-gray-200 last:border-gray-100 cursor-pointer"
                          onClick={() => handleUpdatedTransaction(transaction)}
                        >
                          <td className="flex items-center gap-2 py-4">
                            <div
                              className={`w-4 h-4 ${
                                (transaction.type === "perdas" &&
                                  "bg-red-500") ||
                                (transaction.type === "ganhos" &&
                                  "bg-green-500") ||
                                (transaction.type === "investimentos" &&
                                  "bg-blue-500")
                              } rounded-full`}
                            ></div>
                            <p className="text-sm w-full font-normal text-gray-500">
                              {transaction.name}
                            </p>
                          </td>
                          <td>
                            <p className="text-sm font-semibold text-gray-500">
                              {transaction.amount.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }) ?? 0}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {transactions.length === 0 ? null : (
                <div className="flex lg:w-1/2 lg:items-center ">
                  <Chart
                    className="w-full"
                    chartType="PieChart"
                    width="100%"
                    height="auto"
                    data={data}
                    options={options}
                  />
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
}
