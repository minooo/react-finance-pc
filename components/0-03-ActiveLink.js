import { withRouter } from "next/router";
import Link from "next/link";
import { isActiveLink } from "@utils";

const ActiveLink = ({ text, router, href, as = href, ...rest }) => (
  <Link prefetch href={href} as={as}>
    <a
      style={{ paddingLeft: "80px" }}
      className={`flex column ac-end ai-center font16 bold h-100 ${
        isActiveLink(as, router.asPath)
          ? "c-main nav-default"
          : "c333 nav-default"
      }`}
      {...rest}
    >
      {text}
    </a>
  </Link>
);

export default withRouter(ActiveLink);
