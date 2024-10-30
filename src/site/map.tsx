import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UserList {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
///"https://jsonplaceholder.typicode.com/users"

const fetchUsers = async (): Promise<UserList[]> => {
  const { data } = await axios.get<UserList[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
};

const useFetchUsers = () => {
  return useQuery<UserList[], Error>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

const UserList: React.FC = () => {
  const { data, error, isLoading } = useFetchUsers();

  if (isLoading) return <p>Ładowanie danych...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

const Map: React.FC = () => {
  return (
    <div className="p-8 bg-gray-200 flex flex-col md:flex-row shadow-xl rounded-lg space-x-4">
      <UserList></UserList>
    </div>
  );
};

export default Map;
