import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <div>
      {/* loop ever the posts and show them */}
      {posts.data &&
        posts.data.map((post) => (
          <Link href={`/${post.attributes.Slug}`} key={post.id}>
            <a>
              <h2>{post.attributes.Title}</h2>
              <p>
                {
                  post.attributes.users_permissions_user.data.attributes
                    .username
                }
              </p>
            </a>
          </Link>
        ))}
    </div>
  );
}

export async function getStaticProps() {
  // get posts from our api
  const res = await fetch("http://localhost:1337/api/posts?populate=*");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}
