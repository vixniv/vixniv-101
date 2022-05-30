import Link from "next/link";
import { useScrollPos } from "./Context";

const CustomLink = ({ children, external_url, slug }) => {
  const { setScrollPos } = useScrollPos();
  const setScrollY = () => {
    setScrollPos(window.scrollY);
  };

  return (
    <>
      {external_url ? (
        <a
          href={external_url}
          target="_blank"
          rel="noreferrer"
          className="inline-block"
          onClick={setScrollY}
        >
          {children}
        </a>
      ) : (
        <Link href={`/work/${slug}`}>
          <a onClick={setScrollY}>{children}</a>
        </Link>
      )}
    </>
  );
};

export default CustomLink;
