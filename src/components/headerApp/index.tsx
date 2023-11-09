import { User, List, Monitor } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "src/assets/logo.png";

export function HeaderApp() {
  const pathname = usePathname();

  return (
    <header className="flex lg:hidden justify-between items-center px-8 py-10 gap-2 bg-gray-500">
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

      <div className="flex flex-1 justify-end gap-4">
        {pathname === "/profile" ? (
          <Link href="/dashboard">
            <Monitor size={24} color="#55d462" />
          </Link>
        ) : (
          <Link href="/profile">
            <User size={24} color="#55d462" />
          </Link>
        )}
        <List size={24} color="#55d462" />
      </div>
    </header>
  );
}
