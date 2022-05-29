import Link from "next/link";

const CustomLink = ({ children, external_url, slug }) => {
  return (
    <>
      {external_url ? (
        <a
          href={external_url}
          target="_blank"
          rel="noreferrer"
          className="inline-block"
        >
          {children}
        </a>
      ) : (
        <Link href={`/work/${slug}`}>{children}</Link>
      )}
    </>
  );
};

export default CustomLink;
