import React from "react"
import axios from "axios"

export async function getStaticProps() {
  let response = await axios.get("https://jsonplaceholder.typicode.com/posts")

  return {
    props: {
      posts: response.data,
    },
  }
}

export default function Home(props) {
  return (
    <div className="p-4">
      <ul>
        {props.posts.map((post) => (
          <li key={post.id} className="mt-1">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
