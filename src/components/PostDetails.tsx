import { usePostContext } from "../context/PostContext";

const PostDetails: React.FC = () => {
  const { selectedPost } = usePostContext();
  if (!selectedPost) return <div>Select a post to see the details</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {selectedPost.title}
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed">
        {selectedPost.body}
      </p>
    </div>
  );
};
export default PostDetails;
