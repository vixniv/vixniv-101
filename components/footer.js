const Footer = () => {
  return (
    <footer className="mb-16 flex flex-col md:flex-row-reverse md:justify-between">
      <div className="mb-3">
        <a className="hover:underline" href="mailto:hello@vixniv.com">
          hello@vixniv.com
        </a>
      </div>
      <h4>
        <a
          href="https://linkedin.com/in/arasyyoram"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          LinkedIn
        </a>{" "}
        —{" "}
        <a
          href="https://twitter.com/vixniv"
          target="_blank"
          rel="noreferrer"
          className="hover:underline"
        >
          Twitter
        </a>{" "}
        — v1.0.1 © 2022
      </h4>
    </footer>
  );
};

export default Footer;
