import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Footer from "../components/footer";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import CustomLink from "../utils/customLink";
import { sortByDate } from "../utils/sorting";
import { HiExternalLink } from "react-icons/hi";
import { useScrollPos, useActiveLink, useWorkData } from "../utils/Context";

export default function Home({ posts }) {
  // const [activeLink, setActiveLink] = useState("All Work");
  // const [newHomeData, setNewHomeData] = useState(posts);
  const { scrollPos, setScrollPos } = useScrollPos();
  const { activeLink, setActiveLink } = useActiveLink();
  const { workData, setWorkData } = useWorkData();

  useEffect(() => {
    if (scrollPos) {
      window.scrollTo(0, scrollPos);
    }
  }, [scrollPos]);

  useEffect(() => {
    if (workData.length === 0) {
      setWorkData(posts);
    }
  }, [posts, setWorkData, workData.length]);

  const activeLinkHandler = (e) => {
    setActiveLink(e.target.textContent);
  };

  const hiddenHandler = (e) => {
    setWorkData((prev) => {
      let temp = [];
      prev.map((item) => {
        if (e.target.textContent === "All Work") {
          temp = [
            ...temp,
            { ...item, frontmatter: { ...item.frontmatter, isHidden: false } },
          ];
        } else if (item.frontmatter.type !== e.target.textContent) {
          temp = [
            ...temp,
            { ...item, frontmatter: { ...item.frontmatter, isHidden: true } },
          ];
        } else {
          temp = [
            ...temp,
            { ...item, frontmatter: { ...item.frontmatter, isHidden: false } },
          ];
        }
      });

      return temp;
    });
  };

  return (
    <div className="layout">
      <Head>
        <title>Vixniv - Hi there! 👋</title>
        <meta
          name="description"
          content="Hola! I'm Yoram Amalian Arasy, aka Vixniv, a UX Designer and Software Engineer based in mostly sunny ☀ Jakarta, ID."
        />
      </Head>
      <div className="thisisheader mt-14 mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-end">
        <div className="sm:max-w-[80%] xl:max-w-[943px]">
          <h2 className="mb-8 text-sm">Hola!</h2>
          <h1 className="text-2xl mb-8 sm:mb-0">
            I&#39;m Yoram Amalian Arasy, <i>aka Vixniv</i>, a{" "}
            <span className="font-title">UX Designer</span> and{" "}
            <span className="font-title">Software Engineer</span> based in
            mostly sunny ☀ Jakarta, ID. Currently designing and developing for
            clients around the world.
          </h1>
        </div>
        <div className="flex flex-col items-center sm:flex-col-reverse">
          <div className="bg-secondary w-[84px] h-[81px] rounded-full relative mb-3 sm:mt-3">
            <Image
              src="/vixnivpp.jpg"
              alt="Profile Picture"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
          <div>
            <Link href="/about">
              <a
                className="px-[10px] py-[5px] rounded-xl hover:bg-secondary"
                onClick={() => setScrollPos(window.scrollY)}
              >
                About me
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="thisisnav mb-8 overflow-auto whitespace-nowrap sm:mb-11">
        <ul className="flex items-center">
          <li
            className={`navlink mr-3 ${
              activeLink == "All Work" ? "bg-primary" : ""
            }`}
            onClick={(e) => {
              activeLinkHandler(e);
              hiddenHandler(e);
            }}
          >
            All Work
          </li>
          <li
            className={`navlink mr-3 ${
              activeLink == "Design" ? "bg-primary" : ""
            }`}
            onClick={(e) => {
              activeLinkHandler(e);
              hiddenHandler(e);
            }}
          >
            Design
          </li>
          <li
            className={`navlink ${
              activeLink == "Development" ? "bg-primary" : ""
            }`}
            onClick={(e) => {
              activeLinkHandler(e);
              hiddenHandler(e);
            }}
          >
            Development
          </li>
        </ul>
      </div>

      <div className="thisiswork grid grid-cols-1 gap-y-10 gap-x-8 mb-60 sm:grid-cols-2 md:grid-cols-3">
        {workData.map((item) => (
          <div
            className={`thisiscard flex flex-col ${
              item.frontmatter.isHidden ? "hidden" : ""
            }`}
            key={item.frontmatter.date}
          >
            <CustomLink
              slug={item.slug}
              external_url={item.frontmatter.external_url}
            >
              <div className="bg-secondary w-full h-auto pt-[100%] rounded-[20px] flex justify-center items-center relative mb-4 cursor-pointer duration-300 hover:brightness-90">
                <Image
                  src={item.frontmatter.image}
                  alt="Profile Picture"
                  layout="fill"
                  className="rounded-[20px]"
                />
              </div>
            </CustomLink>
            <div className="flex flex-col-reverse justify-between lg:flex-row">
              <div className="lg:max-w-[75%]">
                <CustomLink
                  slug={item.slug}
                  external_url={item.frontmatter.external_url}
                >
                  <h3 className="text-2xl mb-[6px] cursor-pointer">
                    {item.frontmatter.title}
                    {item.frontmatter.external_url && (
                      <HiExternalLink className="inline-block pb-1" />
                    )}
                  </h3>
                </CustomLink>
                <p className="text-tertiary">{item.frontmatter.desc}</p>
              </div>
              <div className="mb-2">
                <h4
                  className={`px-[10px] py-[5px] rounded-xl font-bold inline-block ${
                    item.frontmatter.type === "Development"
                      ? "bg-[#DAA6FF]"
                      : "bg-[#C0EEFF]"
                  }`}
                >
                  {item.frontmatter.type}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: { posts: posts.sort(sortByDate) },
  };
}

// MUST:
// add proper work content v
// restructuring the code
// add about page

// GOOD TO HAVE:
// on detail work, add next previous work
// archive feature
