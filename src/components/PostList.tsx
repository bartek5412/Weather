import { usePosts } from "../hooks/usePosts";
import { usePostContext } from "../context/PostContext";
import { Link } from "react-router-dom";

const PostList: React.FC = () => {
  const { data, error, isLoading } = usePosts();
  const { setSelectedPost } = usePostContext();

  if (isLoading) return <div>Ładowanie danych....</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Posts
      </h1>
      <ul className="space-y-4">
        {data?.map((post) => (
          <li
            key={post.id}
            className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg shadow-md transition duration-200"
          >
            <Link
              to={`/posts/${post.id}`}
              onClick={() => setSelectedPost(post)}
              className="text-xl font-semibold text-blue-600 hover:text-blue-800"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
