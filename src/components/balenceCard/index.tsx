import Image from "next/image";
import saldo from "src/assets/saldo.png";
import ganhos from "src/assets/ganhos.png";
import perdas from "src/assets/perdas.png";
import investimentos from "src/assets/investimentos.png";

interface BalenceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: "Saldo" | "Ganhos" | "Gastos" | "Investimentos";
  value: number;
}

export function BalenceCard({ title, value, ...rest }: BalenceCardProps) {
  return (
    <div
      {...rest}
      className="bg-gray-100 flex justify-between px-8 py-4 rounded-lg md:w-[48%]"
    >
      <div>
        <h4 className="text-sm font-normal">{title}</h4>
        <p className="text-xl font-semibold">R$ {value.toFixed(2)}</p>
      </div>

      <div>
        {title === "Saldo" && <Image src={saldo} alt="wallet" />}
        {title === "Ganhos" && <Image src={ganhos} alt="wallet" />}
        {title === "Gastos" && <Image src={perdas} alt="wallet" />}
        {title === "Investimentos" && (
          <Image src={investimentos} alt="wallet" />
        )}
      </div>
    </div>
  );
}
