import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  console.log(posts);
  return (
    <div>
      {/* loop ever the posts and show them */}
      {posts.data &&
        posts.data.map((post) => (
          <div key={post.id}>
            <h2>{post.attributes.Title}</h2>
            <p>
              {post.attributes.users_permissions_user.data.attributes.username}
            </p>
          </div>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  // get posts from our api
  const res = await fetch("http://localhost:1337/api/posts?populate=*");
  const posts = await res.json();

  console.log(posts);

  return {
    props: {
      posts,
    },
  };
}
