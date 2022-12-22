import { A } from "@solidjs/router";

export default function Blog() {
  return (
    <main class="my-6 text-lg">
      <ul>
        <li class="flex gap-6">
          <time class="italic">19 Dec, 2022</time>
          <A class="text-purple-500" href="/blog/2022-12-19">
            My first blog post
          </A>
        </li>
      </ul>
    </main>
  );
}
