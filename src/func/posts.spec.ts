import { findPostBySlug } from "./posts";
import fs from "fs";

describe("posts", () => {
  beforeAll(async () => {
    // create a mock post in the posts directory
    await fs.promises.writeFile(
      "posts/test.md",
      "---\ntitle: Test\ndate: 01-01-1970\n---\nTest content"
    );
  });

  it("findPostBySlug", async () => {
    const post = await findPostBySlug("test");
    expect(post).toEqual({
      slug: "test",
      title: "Test",
      date: "01-01-1970",
      tags: undefined,
      content: "Test content",
    });
  });

  it("findPostBySlug with invalid slug", async () => {
    expect(async () => await findPostBySlug("test-2")).toThrow();
  });

  afterAll(async () => {
    // remove the mock post
    await fs.promises.unlink("posts/test.md");
  });
});
