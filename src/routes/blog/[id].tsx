import { useRouteData } from "@solidjs/router";
import { createResource, Show, Suspense } from "solid-js";
import SolidMarkdown from "solid-markdown";
import { ErrorBoundary, RouteDataArgs } from "solid-start";
import server$ from "solid-start/server";
import { findPostBySlug } from "~/func/posts";
import NotFound from "../[...404]";

const fetch = server$((id: string) => findPostBySlug(id));

export function routeData({ params }: RouteDataArgs) {
  const [data] = createResource(() => fetch(params.id));
  return data;
}

const obj: { name: string } | undefined = undefined;

export default function Post() {
  const resource = useRouteData<typeof routeData>();

  return (
    <main class="my-6 text-lg">
      <Suspense fallback={<p>Loading...</p>}>
        <Show when={resource()} keyed>
          {(post) => (
            <>
              <h1 class="my-6 text-3xl font-bold">{post.title}</h1>
              <div class="my-6">
                <time class="text-xl italic">{post.date}</time>
              </div>
              <SolidMarkdown class="prose-invert prose lg:prose-lg">
                {post.content}
              </SolidMarkdown>
            </>
          )}
        </Show>
      </Suspense>
    </main>
  );
}
