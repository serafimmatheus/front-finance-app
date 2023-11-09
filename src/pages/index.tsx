import { MyButton } from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import imageHome from "src/assets/ILLUSTRATION.png";
import logo from "src/assets/logo.png";

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-7xl mx-auto h-screen justify-between p-8">
      <header className="flex items-center gap-2 mb-14">
        <div className="relative">
          <Image
            src={logo}
            width={24}
            height={15}
            objectFit="contain"
            alt="Logo simple finance app"
          />
        </div>
        <h2 className="text-lg text-gray-100 font-semibold cursor-pointer">
          <Link href={"/"}>Simple Finance</Link>
        </h2>
      </header>

      <section className="flex flex-col items-center">
        <div className="relative mb-12">
          <Image src={imageHome} alt="Simple Finance app" />
        </div>

        <h2 className="text-3xl font-semibold mb-5">
          Controle suas finanças pessoais de maneira
          <b className="text-green-500"> fácil e inteligente!</b>
        </h2>
        <p className="text-sm font-normal text-gray-300 mb-5">
          Organize e planeje suas metas financeiras com nossa plataforma
          simplificada.
        </p>

        <div className="flex flex-col gap-3">
          <MyButton rota="/register" type="primary">
            Experimente agora mesmo!
          </MyButton>
          <MyButton rota="/login" type="secondary">
            Entrar na minha conta
          </MyButton>
        </div>
      </section>
    </main>
  );
}
