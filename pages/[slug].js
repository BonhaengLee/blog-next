import Link from "next/link";

export default function Post({ post }) {
  return (
    <div>
      <Link href="/">
        <a>Go Home</a>
      </Link>
      <h1>{post.attributes.Title}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:1337/api/posts`);
  const posts = await res.json();

  // paths will be an array of the paths to the posts
  const paths = posts.data.map((post) => ({
    params: {
      slug: post.attributes.Slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const res = await fetch(
    `http://localhost:1337/api/posts?filters[Slug]=${slug}`
  );
  const data = await res.json();
  const post = data.data[0];

  return {
    props: {
      post,
    },
  };
}
