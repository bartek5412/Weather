import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

function fetchUsers(page: number) {
  return axios
    .get("https://jsonplaceholder.typicode.com/users?_page=$page&limit=5")
    .then((res) => res.data);
}
