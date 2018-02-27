import Head from "next/head";
import React from "react";
import { getCookie, cache } from "@utils";
import { Nav, HomeTop, Foot } from "@components";

export default class extends React.Component {
  state = {};
  componentDidMount() {
    const token = getCookie("token");
    const userPhone = cache.getItem("userPhone");
    const userName = cache.getItem("userName");
    if (token) {
      if (userName) {
        // eslint-disable-next-line
        this.setState(() => ({ me: userName }));
      } else {
        // eslint-disable-next-line
        this.setState(() => ({ me: userPhone }));
      }
    }
  }
  render() {
    const { me } = this.state
    const { title, footNoShow, children, ...rest } = this.props;
    return (
      <div className="bg-white" {...rest}>
        <Head>
          <title>{title}</title>
        </Head>
        <HomeTop me={me} />
        <Nav />
        {children}
        {footNoShow ? null : <Foot />}
      </div>
    );
  }
}

// export default ({ children, title = 'This is the default title' }) => (
//   <div className="box bg-body h-full flex column" style={{ touchAction: 'none' }}>
//     <Head>
//       <title>{ title }</title>
//     </Head>
//     { children }
//   </div>
// )
