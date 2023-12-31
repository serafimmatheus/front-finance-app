import { HeaderAppDesktop } from "@/components/HeaderAppDesktop";
import { HeaderApp } from "@/components/headerApp";
import { zodResolver } from "@hookform/resolvers/zod";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-toastify";

import minhaConta from "src/assets/minha-conta.jpg";
import { useAuthContext } from "@/provider/hooks/userAuthProvider";
import { useRouter } from "next/navigation";

const schema = z.object({
  firstName: z.string().min(3, { message: "Nome muito curto" }),
  lastName: z.string().min(3, { message: "Nome muito curto" }),
});

type User = z.infer<typeof schema>;

export default function ProfilePage() {
  const [editar, setEditar] = useState(false);

  const { userAndToken, editUser } = useAuthContext();

  const { user } = userAndToken;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  async function handleEditUser(data: User) {
    await editUser(data)
      .then(() => {
        toast.success(
          "Usuário atualizado com sucesso, saia da conta para atualizar os dados.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (!userAndToken.token && !userAndToken.user) {
      router.push("/login");
    }
  }, [router, userAndToken.token, userAndToken.user]);

  return (
    <>
      <NextSeo
        title="Minha Conta | Finance App"
        description="Controle suas finanças pessoais de maneira fácil e inteligente!"
        noindex
      />

      {!userAndToken.token && !userAndToken.user ? null : (
        <main className="lg:flex lg:h-screen">
          <HeaderApp />

          <HeaderAppDesktop />

          <section className="lg:w-3/4 lg:gap-10 lg:max-w-5xl lg:flex-row lg:m-auto flex flex-col p-8">
            <div className="hidden relative lg:flex lg:w-1/2">
              <Image src={minhaConta} alt="Minha conta" />
            </div>

            <div className="lg:w-1/2">
              <h1 className="text-xl font-bold mb-5">Minha conta</h1>

              <form
                onSubmit={handleSubmit(handleEditUser)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    id="name"
                    className="focus:border focus:border-green-500 disabled:text-gray-200 disabled:bg-gray-100 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                    placeholder="Nome"
                    defaultValue={user?.firstName}
                    disabled={!editar}
                    {...register("firstName")}
                  />
                </div>

                <p className="text-red-500 text-xs">
                  {errors.firstName?.message}
                </p>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    id="name"
                    className="focus:border focus:border-green-500 disabled:text-gray-200 disabled:bg-gray-100 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
                    placeholder="Nome"
                    defaultValue={user?.lastName}
                    disabled={!editar}
                    {...register("lastName")}
                  />
                </div>

                <p className="text-red-500 text-xs">
                  {errors.lastName?.message}
                </p>

                <div className="flex flex-col gap-1">
                  <input
                    type="email"
                    id="email"
                    className="focus:border focus:border-green-500 disabled:text-gray-200 disabled:bg-gray-100 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300 mb-10"
                    placeholder="Email"
                    disabled
                    defaultValue={user?.email}
                  />
                </div>

                {!editar ? (
                  <button
                    onClick={() => setEditar(true)}
                    type="button"
                    className="rounded-xl p-4 text-xs bg-green-500 text-gray-100"
                  >
                    Editar
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditar(false)}
                      type="button"
                      className="rounded-xl p-4 text-xs bg-gray-400 text-gray-100"
                      disabled={isSubmitting}
                    >
                      Cancelar
                    </button>

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="rounded-xl p-4 text-xs bg-green-500 text-gray-100"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </form>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
