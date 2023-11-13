import { useAuthContext } from "@/provider/hooks/userAuthProvider";
import { Monitor, SignOut, User } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "src/assets/logo.png";

export function HeaderAppDesktop() {
  const pathName = usePathname();

  const { signOut } = useAuthContext();

  return (
    <aside className="max-lg:hidden w-1/5 bg-gray-500 h-screen">
      <header className="flex flex-col h-full px-4 py-10 gap-2">
        <div className="flex items-center gap-4 mb-14">
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
        </div>

        <div className="flex flex-1 flex-col gap-8">
          <Link className="flex items-center gap-3" href="/dashboard">
            <Monitor
              size={30}
              color={`${pathName === "/dashboard" ? "#55D462" : "#cccc"}`}
            />
            <span className="text-gray-100 text-base font-semibold">
              Dashboard
            </span>
          </Link>

          <Link className="flex items-center gap-3" href="/profile">
            <User
              size={30}
              color={`${pathName === "/profile" ? "#55D462" : "#cccc"}`}
            />
            <span className="text-gray-100 text-base font-semibold">
              Profile
            </span>
          </Link>

          <div
            onClick={signOut}
            className="flex flex-1 items-end gap-3 cursor-pointer"
          >
            <SignOut size={30} color="#FD3E3E" />
            <span className="text-red-500 text-base font-semibold">Sair</span>
          </div>
        </div>
      </header>
    </aside>
  );
}
