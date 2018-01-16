import Document, { Head, Main, NextScript } from "next/document";

const dev = process.env.NODE_ENV !== "production";
const path = dev ? "" : "http://public.duduapp.net/finance/static";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    return {
      html,
      head,
      errorHtml,
      chunks
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="嘟嘟e融，一站式专业贷款服务平台！" />
          <link rel="icon" href="/pages/favicon.ico" />
          <link rel="stylesheet" href={`${path}/static/styles/antd_min.css`} />
          <link rel="stylesheet" href={`${path}/static/styles/app_min.css`} />
          <title>嘟嘟e融</title>
        </Head>
        <body>
          {this.props.customValue}
          <Main />
          <NextScript />
          <script src={`${path}/static/scripts/local-storage.js`} />
        </body>
      </html>
    );
  }
}
