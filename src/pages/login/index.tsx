import Image from "next/image";
import logo from "src/assets/logo.png";
import { EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { MyButton } from "@/components/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Senha deve ter no mínimo 8 dígitos" }),
});

type IPropsSchema = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IPropsSchema>({
    resolver: zodResolver(schema),
  });

  const [toogle, setToogle] = useState(false);

  function onSubmit(data: IPropsSchema) {
    console.log(data);
  }
  return (
    <main className="p-8">
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

      <section>
        <h2 className="text-2xl font-semibold mb-5">Entrar na sua conta</h2>
        <p className="text-sm font-normal mb-12">
          Se não possui uma conta, você consegue
          <Link
            className="text-green-500 cursor-pointer underline"
            href="/register"
          >
            {" "}
            Criar uma!
          </Link>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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

          <p className="text-red-500 text-xs mb-10">
            {errors.password?.message}
          </p>

          <MyButton isLoad={isSubmitting} type="primary">
            Entrar
          </MyButton>
        </form>
      </section>
    </main>
  );
}
