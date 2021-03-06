import { RiArrowGoBackLine } from "react-icons/ri";
import { FaRegSadCry } from "react-icons/fa";
import Link from "next/link";
import Head from "next/head";

const Custom404 = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Head>
        <title>404: This page could not be found</title>
        <meta name="description" content="404: This page could not be found" />
      </Head>
      <FaRegSadCry size={40} />
      <h1 className="mt-2">Ups! It seems you got lost</h1>

      <Link href="/">
        <a className="px-[10px] py-[5px] mt-2 rounded-xl bg-secondary cursor-pointer hover:bg-primary">
          <RiArrowGoBackLine className="inline" size={18} /> I&apos;ll bring you
          back to home
        </a>
      </Link>
    </div>
  );
};

export default Custom404;
