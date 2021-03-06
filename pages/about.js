import { FiArrowUpRight } from "react-icons/fi";
import { RiArrowGoBackLine } from "react-icons/ri";
import Link from "next/link";
import Head from "next/head";

const About = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Head>
        <title>About</title>
        <meta name="description" content="Vixniv about page" />
      </Head>
      <h1>My apologize, I am still finding myself.</h1>
      <a
        href="https://linkedin.com/in/arasyyoram"
        target="_blank"
        rel="noreferrer"
        className="px-[10px] py-[5px] mt-2 rounded-xl bg-secondary hover:bg-primary"
      >
        Please, go to my LinkedIn instead{" "}
        <FiArrowUpRight className="inline" size={24} />
      </a>
      <Link href="/">
        <a className="px-[10px] py-[5px] mt-2 rounded-xl bg-secondary cursor-pointer hover:bg-primary">
          <RiArrowGoBackLine className="inline" size={18} /> or go back to home
        </a>
      </Link>
    </div>
  );
};

export default About;
