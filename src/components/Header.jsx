import Link from "next/link";
import { IoLogoGithub, IoMailOutline } from "react-icons/io5";

function Header() {
  return (
    <nav className="bg-gray-100">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href={"/"} className="items-start">
          <h1 className="text-3xl font-bold text-slate-900">
            FastChargers<span className="text-blue-900">Here</span>
          </h1>
        </Link>

        <div className="flex gap-5 text-right items-end text-2xl">
          <Link href={"https://github.com/nf1973/fastcharger"} target="_blank">
            <p>
              <IoLogoGithub />
            </p>
          </Link>
          <Link href={"/"} target="_blank">
            <p>
              <IoMailOutline />
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
