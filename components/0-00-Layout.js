import Head from "next/head";
import React from "react";
import { Nav, HomeTop, Foot } from "@components"

export default class extends React.Component {
  componentDidMount() {}
  render() {
    const { title, footNoShow, children, ...rest } = this.props;
    return (
      <div className="bg-white" {...rest} >
        <Head>
          <title>{title}</title>
        </Head>
        <HomeTop />
        <Nav />
        {children}
        {
          footNoShow ? null : <Foot />
        }
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
