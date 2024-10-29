import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../components/types";

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
};
