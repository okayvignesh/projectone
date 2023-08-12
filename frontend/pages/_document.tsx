import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel='icon' href='./ico.png' />
        <title>My Project</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
