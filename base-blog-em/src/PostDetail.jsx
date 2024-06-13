import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation }) {
  // 10+11 . Create Query for Blog Comments
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (isError) {
    return <h3>Error: {error.toString()}</h3>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button>Update title</button>
      <p>{post.body}</p>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
