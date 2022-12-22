import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="text-center pt-10">
      <h1 class="text-4xl font-bold">404</h1>
      <h3 class="text-4xl font-bold my-10">(⊙_⊙)</h3>
      <p class="text-lg">
        It looks like you're lost.{" "}
        <A class="underline" href="/">
          Go home
        </A>
        ?
      </p>
    </main>
  );
}
