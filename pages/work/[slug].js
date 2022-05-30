import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { RiArrowGoBackLine } from "react-icons/ri";
import Footer from "../../components/footer";
import ReactMarkdown from "react-markdown";

const Work = ({
  frontmatter: { title, desc, cover_image, role, timeline, team, type },
  content,
  slug,
}) => {
  const components = {
    img: (props) => {
      console.log(props);
      return (
        <div className="imageContainer w-full mt-8">
          <Image
            src={props.src}
            alt={props.alt}
            layout="fill"
            className="image"
          />
        </div>
      );
    },
    p: (props) => {
      if (props.node.children[0].tagName === "img") {
        const image = props.node.children[0].properties;
        return (
          <div className="imageContainer w-full mt-8">
            <Image
              src={image.src}
              alt={image.alt}
              layout="fill"
              className="image"
            />
          </div>
        );
      }
      return <p>{props.children}</p>;
    },
  };

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="layout">
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Head>
      <div className="thisisheader mb-24">
        <div className="mt-14 mb-8">
          <Link href="/" scroll={false}>
            <a className="text-sm font-title px-[10px] py-[5px] mt-2 rounded-xl bg-secondary cursor-pointer hover:bg-primary">
              <RiArrowGoBackLine className="inline" size={16} /> Back to home
            </a>
          </Link>
        </div>

        <div className="thisisworktitle flex flex-col mb-10 sm:flex-row">
          <div className="mb-6 sm:mb-0 sm:mr-6 sm:w-1/2">
            <h1 className="font-title text-2xl mb-3">{title}</h1>
            <h4
              className={`px-[10px] py-[5px] rounded-xl font-bold inline-block ${
                type === "Development" ? "bg-[#DAA6FF]" : "bg-[#C0EEFF]"
              }`}
            >
              {type}
            </h4>
          </div>
          <h2 className="font-desc text-2xl">{desc}</h2>
        </div>

        <div className="bg-secondary w-full pt-[37.5%] relative rounded-[20px] mb-8">
          {cover_image && (
            <Image
              src={cover_image}
              alt="Profile Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-[20px]"
            />
          )}
        </div>
        {/* <div>
          <div className="bg-secondary w-full h-[482px] rounded-[20px] flex justify-center items-center relative mb-4">
            {cover_image ? (
              <Image
                src={cover_image}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-[20px]"
              />
            ) : (
              icon
              // <BsCardImage size={48} />
            )}
          </div>
        </div> */}

        <div className="flex flex-col gap-y-6 sm:flex-row sm:gap-x-16 lg:gap-x-24">
          <div className="sm:w-1/4">
            <h3 className="text-2xl mb-2">Role</h3>
            <p className="text-tertiary">{role}</p>
          </div>
          <div className="sm:w-1/4">
            <h3 className="text-2xl mb-2">Timeline</h3>
            <p className="text-tertiary">{timeline}</p>
          </div>
          <div className="sm:w-1/4">
            <h3 className="text-2xl mb-2">Team</h3>
            <p className="text-tertiary">{team}</p>
          </div>
        </div>
      </div>

      <div className="prose max-w-none thisisbody sm:w-[70%] mb-60 m-auto">
        {/* <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div> */}
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
      </div>

      <div
        className="flex justify-end mb-5 sm:justify-center"
        onClick={goToTop}
      >
        <p className="px-[10px] py-[5px] rounded-xl bg-secondary cursor-pointer inline-block hover:bg-primary">
          Back to top
        </p>
      </div>

      <Footer />
    </section>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: { frontmatter, content, slug },
  };
}

export default Work;
