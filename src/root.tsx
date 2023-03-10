// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import NotFound from "./routes/[...404]";

export default function Root() {
  return (
    <Html class="bg-neutral-800 text-white" lang="en">
      <Head>
        <Title>Henry's blog</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐺</text></svg>"
        ></link>
      </Head>
      <Suspense>
        <ErrorBoundary
          fallback={(e) => {
            if (e instanceof Error && e.message === "Invalid slug") {
              return <NotFound />;
            } else {
              return <p>Something went wrong</p>;
            }
          }}
        >
          <Body class="mx-auto max-w-[720px] p-5">
            <h1 class="my-5">
              <A href="/" class="text-4xl font-bold">
                Henry's blog
              </A>
            </h1>
            <nav class="my-5">
              <ul class="container flex items-center text-lg">
                <li class={`mr-4`}>
                  <A href="/">Home</A>
                </li>
                <li class={`mr-4`}>
                  <A href="/blog">Blog</A>
                </li>
              </ul>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </Body>
          <footer class="text-center text-lg my-6">
            Made with{" "}
            <a
              href="https://github.com/ryansolid/solid"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solid
            </a>
          </footer>
        </ErrorBoundary>
      </Suspense>
      <Scripts />
    </Html>
  );
}
