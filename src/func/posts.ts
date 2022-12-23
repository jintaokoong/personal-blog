import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Err, Ok } from "~/types/result";

export const findPosts = () => {
  const baseDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(baseDir);
  return files.map((file) => {
    const filePath = path.join(baseDir, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug: file.replace(".md", ""),
      title: data.title,
      date: data.date,
      tags: data.tags,
      content,
    };
  });
};

const normalize = (pth: string) => {
  return path.normalize(pth).replace(/^(\.\.(\/|\\|$))+/, "");
};

export const findPostBySlug = (slug: string) => {
  const baseDir = path.join(process.cwd(), "posts");
  const filePath = path.join(baseDir, `${normalize(slug)}.md`);
  const tmp = Ok.from(() => filePath)
    .map((fp) => {
      if (fp.indexOf(baseDir) !== 0) throw new Error("Invalid slug");
      return fp;
    })
    .flatMap((fp) => {
      return Ok.from(() =>
        fs.promises
          .readFile(fp, "utf8")
          .then((fc) => matter(fc))
          .then(({ data, content }) => ({
            slug,
            title: data.title,
            date: data.date,
            tags: data.tags,
            content,
          }))
          .catch((error) => {
            if (error.code === "ENOENT") throw new Error("Invalid slug");
            throw new Error("server error");
          })
      );
    });
  return tmp.unwrap();
};
