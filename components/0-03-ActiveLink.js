import { withRouter } from "next/router";
import Link from "next/link";

const ActiveLink = ({ text, router, href, as = href, ...rest }) => (
  <Link prefetch href={href} as={as}>
    <a
      style={{ width: "140px" }}
      className={`flex column jc-center ai-center font18 h-100 ${
        router.pathname === href ? "c-main nav-active" : "c333 nav-default"
      }`}
      {...rest}
    >
      {text}
    </a>
  </Link>
);

export default withRouter(ActiveLink);
