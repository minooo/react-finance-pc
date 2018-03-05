import { withRouter } from "next/router";
import Link from "next/link";
import { isActiveLink } from "@utils";

const ActiveLink = ({ text, router, href, as = href, ...rest }) => (
  <Link prefetch href={href} as={as}>
    <a
      style={{ width: "140px" }}
      className={`flex column jc-center ai-center font16 bold h-100 ${
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
