import { GetStaticProps } from "next";

import PostsList from "../components/PostsList";

import { getAllPosts } from "../lib/getPosts.js";

export const getStaticProps: GetStaticProps = async () => {
    const posts = await getAllPosts();

    return {
        props: { posts },
    };
};

interface IndexProps {
    posts: object[];
}

const Index = ({ posts }: IndexProps) => (
    <div>
        <PostsList posts={posts} />
    </div>
);

export default Index;
