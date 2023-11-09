import { HeaderAppDesktop } from "@/components/HeaderAppDesktop";
import { MyButton } from "@/components/button";
import { HeaderApp } from "@/components/headerApp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(3, { message: "Nome muito curto" }),
  lastName: z.string().min(3, { message: "Nome muito curto" }),
});

type User = z.infer<typeof schema>;

export default function ProfilePage() {
  const [editar, setEditar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: zodResolver(schema),
  });

  function handleEditUser(data: User) {
    console.log(data);
  }

  return (
    <main className="lg:flex lg:h-screen">
      <HeaderApp />

      <HeaderAppDesktop />

      <section className="lg:w-3/4 lg:max-w-5xl lg:m-auto flex flex-col p-8">
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
              defaultValue={"Matheus"}
              disabled={!editar}
              {...register("firstName")}
            />
          </div>

          <p className="text-red-500 text-xs">{errors.firstName?.message}</p>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              id="name"
              className="focus:border focus:border-green-500 disabled:text-gray-200 disabled:bg-gray-100 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300"
              placeholder="Nome"
              defaultValue={"Serafim"}
              disabled={!editar}
              {...register("lastName")}
            />
          </div>

          <p className="text-red-500 text-xs">{errors.lastName?.message}</p>

          <div className="flex flex-col gap-1">
            <input
              type="email"
              id="email"
              className="focus:border focus:border-green-500 disabled:text-gray-200 disabled:bg-gray-100 rounded-xl py-4 px-6 placeholder:text-sm placeholder:text-gray-300 mb-10"
              placeholder="Email"
              disabled
              defaultValue={"matheus18serafim@gmail.com"}
            />
          </div>

          {!editar ? (
            <MyButton
              onClick={() => setEditar(true)}
              ctaType="button"
              type="primary"
            >
              Editar
            </MyButton>
          ) : (
            <div className="flex gap-2">
              <MyButton
                onClick={() => setEditar(false)}
                ctaType="button"
                type="secondary"
              >
                Cancelar
              </MyButton>

              <MyButton type="primary">Salvar</MyButton>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
