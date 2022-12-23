import { A } from "@solidjs/router";
import { Suspense } from "solid-js";
import { createServerData$ } from "solid-start/server";
import { findPosts } from "~/func/posts";

export default function Blog() {
  const posts = createServerData$(findPosts);

  return (
    <main class="my-6 text-lg">
      <Suspense fallback={<p>Loading...</p>}>
        <ul>
          {posts()?.map((post) => (
            <li class="flex gap-6">
              <time class="italic">{post.date}</time>
              <A class="text-purple-500" href={`/blog/${post.slug}`}>
                {post.title}
              </A>
            </li>
          ))}
        </ul>
      </Suspense>
    </main>
  );
}
