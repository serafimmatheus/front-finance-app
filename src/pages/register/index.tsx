import Image from "next/image";
import logo from "src/assets/logo.png";
import { EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { MyButton } from "@/components/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextSeo } from "next-seo";

import imagLogin from "src/assets/login.jpg";

const schema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 dígitos" }),
});

type IPropsSchema = z.infer<typeof schema>;

export default function RegisterPage() {
  const [toogle, setToogle] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IPropsSchema>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: IPropsSchema) {
    console.log(data);
  }

  return (
    <>
      <NextSeo
        title="Registro | Finance App"
        description="Controle suas finanças pessoais de maneira fácil e inteligente!"
      />

      <main className="p-8 max-w-4xl m-auto md:h-screen md:relative md:top-0 md:bottom-0 md:justify-center md:flex md:flex-col">
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
          <h2 className="text-lg font-semibold cursor-pointer">
            <Link href={"/"}>Simple Finance</Link>
          </h2>
        </header>

        <section className="md:flex md:gap-10">
          <div className="relative hidden md:flex md:w-1/2">
            <Image src={imagLogin} alt="Imagem do login ilustrativa" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-5">Criar sua conta</h2>
            <p className="text-sm font-normal mb-12">
              Se já possui uma conta, você consegue fazer
              <Link
                className="text-green-500 cursor-pointer underline"
                href="/login"
              >
                {" "}
                Login aqui!
              </Link>
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  id="firstName"
                  className="focus:border focus:border-green-500 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                  placeholder="Nome"
                  {...register("firstName", {
                    required: "Campo obrigatório",
                  })}
                />
              </div>

              <p className="text-red-500 text-xs">
                {errors.firstName?.message}
              </p>

              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  id="name"
                  className="focus:border focus:border-green-500 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                  placeholder="Sobrenome"
                  {...register("lastName", {
                    required: "Campo obrigatório",
                  })}
                />
              </div>

              <p className="text-red-500 text-xs">{errors.lastName?.message}</p>

              <div className="flex flex-col gap-1">
                <input
                  type="email"
                  id="email"
                  className="focus:border focus:border-green-500 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                  placeholder="Email"
                  {...register("email", {
                    required: "Campo obrigatório",
                  })}
                />
              </div>

              <p className="text-red-500 text-xs">{errors.email?.message}</p>

              <div className="flex flex-col gap-1 relative">
                <input
                  type={toogle ? "password" : "text"}
                  id="password"
                  className="focus:border focus:border-green-500 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                  placeholder="Senha"
                  {...register("password", {
                    required: "Campo obrigatório",
                  })}
                />

                <div className="absolute right-4 top-4">
                  <EyeSlash size={24} onClick={() => setToogle(!toogle)} />
                </div>
              </div>

              <p className="text-red-500 text-xs">{errors.password?.message}</p>

              <MyButton isLoad={isSubmitting} type="primary">
                Cadastrar
              </MyButton>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
