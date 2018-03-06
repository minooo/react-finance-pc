import { withRouter } from "next/router";
import Link from "next/link";

const ActiveLink = ({ text, router, href, as = href, ...rest }) => (
  <Link prefetch href={href} as={as}>
    <a
      style={{ paddingLeft: "80px" }}
      className={`flex column jc-center ai-end font16 bold h-100 plr50 ${
        as.length > 1 && as.indexOf(router.asPath) !== -1 && router.asPath.indexOf(as) !== -1
          ? "c-main nav-default"
          : `${
          router.asPath === "/" && as === "/"
            ? "c-main nav-default"
            : "c333 nav-default"
          }`
        }`}
      {...rest}
    >
      {text}
    </a>
  </Link>
);

export default withRouter(ActiveLink);
