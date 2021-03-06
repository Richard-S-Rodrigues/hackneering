import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";

import MDComponents from "../components/MDComponents";
import { formatSlug } from "./utils";

const postsDirectory = join(process.cwd(), "src/_posts");

const dateSortDesc = (a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
  return 0;
};

export const getPostsFiles = async () => {
  return fs.readdirSync(postsDirectory);
};

export const getAllPosts = async () => {
  const files = await getPostsFiles();

  const allFilesContent = [];

  files.forEach((file) => {
    const source = fs.readFileSync(join(postsDirectory, file), "utf8");

    const { data } = matter(source);

    allFilesContent.push({ ...data, slug: formatSlug(file) });
  });

  return allFilesContent.sort((a, b) => dateSortDesc(a.date, b.date));
};

export const getPostBySlug = async (slug) => {
  const source = fs.readFileSync(join(postsDirectory, `${slug}.md`), "utf8");

  const { data, content } = matter(source);

  const body_markdown = await renderToString(content, {
    components: MDComponents,
  });

  return { data, body_markdown };
};
