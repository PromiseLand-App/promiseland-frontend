import Document, { Head, Html, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  // static async getInitialProps(ctx: DocumentContext) {
  // const initialProps = await Document.getInitialProps(ctx);
  // return { ...initialProps };
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta
            name="PromiseLand"
            content="The decentralized Social NFT Marketplace"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
