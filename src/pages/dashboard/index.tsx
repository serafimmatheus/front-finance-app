import { HeaderAppDesktop } from "@/components/HeaderAppDesktop";
import { BalenceCard } from "@/components/balenceCard";
import { HeaderApp } from "@/components/headerApp";
import { ModalAddTransactions } from "@/components/modal/modalAddTranactions";
import { Export, Plus } from "@phosphor-icons/react";
import { NextSeo } from "next-seo";
import { useState } from "react";
import Chart from "react-google-charts";

export default function DashbordPage() {
  const [openModal, setOpenModal] = useState(false);

  const data = [
    ["Task", "Hours per Day"],
    ["Ganhos", 7000],
    ["Gastos", 2587.26],
    ["Investimentos", 0],
  ];

  const options = {
    title: "Gastos",
    pieHole: 0.3,
    is3D: false,
    colors: ["#55D462", "#FD3E3E", "#589BFF"],
  };

  return (
    <>
      <NextSeo
        title="Dashboard | Finance App"
        description="Controle suas finanças pessoais de maneira fácil e inteligente!"
        noindex
      />

      <main
        className={`${
          openModal ? "fixed" : ""
        } lg:flex relative top-0 bottom-0`}
      >
        <HeaderApp />

        <HeaderAppDesktop />

        {openModal && <ModalAddTransactions onRequestClose={setOpenModal} />}

        <section className="lg:w-3/4 lg:max-w-5xl lg:m-auto p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-normal">
              Olá, <span className="font-semibold">Matheus!</span>
            </h2>

            <select
              name="meses"
              id="meses"
              className="px-4 py-2 rounded-lg bg-gray-400 text-gray-100 text-sm"
            >
              <option value="0">Janeiro</option>
              <option value="1">Fevereiro</option>
            </select>
          </div>

          <div className="flex flex-col gap-5 mt-10 md:flex-row md:flex-wrap">
            <BalenceCard title="Saldo" value={5000} />
            <BalenceCard title="Ganhos" value={7000} />
            <BalenceCard title="Gastos" value={2587.26} />
            <BalenceCard title="Investimentos" value={0} />
          </div>

          <div className="lg:flex lg:gap-10">
            <div className="bg-gray-100 p-8 rounded-lg flex flex-col my-10 lg:w-1/2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Transações</h2>

                <div className="flex flex-1 justify-end gap-2">
                  <button
                    onClick={() => setOpenModal(true)}
                    className="bg-gray-400 text-gray-100 text-xs gap-2 rounded-lg px-4 py-2 flex items-center justify-center"
                  >
                    <Plus size={16} color="#ffffff" />
                    <span>Adicionar</span>
                  </button>

                  <button className="bg-gray-400 text-gray-100 text-xs gap-2 rounded-lg p-2 flex items-center justify-center">
                    <Export size={16} color="#ffffff" />
                  </button>
                </div>
              </div>

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
                  <tr className="border-b border-gray-200">
                    <td className="flex items-center gap-2 py-4">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <p className="text-sm font-normal text-gray-500">
                        Salário
                      </p>
                    </td>
                    <td>
                      <p className="text-sm font-semibold text-gray-500">
                        R$ 7000
                      </p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="flex items-center gap-2 py-4">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                      <p className="text-sm font-normal text-gray-500">Pizza</p>
                    </td>
                    <td>
                      <p className="text-sm font-semibold text-gray-500">
                        R$ 139.00
                      </p>
                    </td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="flex items-center gap-2 py-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <p className="text-sm font-normal text-gray-500">
                        Tesouro Direto
                      </p>
                    </td>
                    <td>
                      <p className="text-sm font-semibold text-gray-500">
                        R$ 1000.00
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

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
          </div>
        </section>
      </main>
    </>
  );
}
