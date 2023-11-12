import { MyButton } from "@/components/button";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import imageHome from "src/assets/ILLUSTRATION.png";
import logo from "src/assets/logo.png";

export default function Home() {
  return (
    <>
      <NextSeo
        title="HOME | Finance App"
        description="Controle suas finanças pessoais de maneira fácil e inteligente!"
      />

      <main className="flex flex-col w-full max-w-4xl mx-auto h-screen justify-between lg:justify-center p-8">
        <header className="flex items-center gap-2 mb-14 lg:mb-6">
          <div className="relative">
            <Image
              src={logo}
              width={24}
              height={15}
              objectFit="contain"
              alt="Logo simple finance app"
            />
          </div>
          <h2 className="text-lg font-semibold cursor-pointer">
            <Link href={"/"}>Simple Finance</Link>
          </h2>
        </header>

        <section className="flex flex-col items-center">
          <div className="relative mb-12">
            <Image src={imageHome} alt="Simple Finance app" />
          </div>

          <h2 className="text-3xl font-semibold mb-5 sm:w-96">
            Controle suas finanças pessoais de maneira
            <b className="text-green-500"> fácil e inteligente!</b>
          </h2>
          <p className="text-sm font-normal text-gray-300 mb-5 sm:w-96">
            Organize e planeje suas metas financeiras com nossa plataforma
            simplificada.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <MyButton rota="/register" type="primary">
              Experimente agora mesmo!
            </MyButton>
            <MyButton rota="/login" type="secondary">
              Entrar na minha conta
            </MyButton>
          </div>
        </section>
      </main>
    </>
  );
}
