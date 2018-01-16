import Head from "next/head";
import React from "react";
import { Nav } from "@components"

export default class extends React.Component {
  componentDidMount() {}
  render() {
    const { title, children } = this.props;
    return (
      <div className="bg-white">
        <Head>
          <title>{title}</title>
        </Head>
        <Nav />
        {children}
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
