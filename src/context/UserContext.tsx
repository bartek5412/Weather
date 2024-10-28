import React, { createContext, useContext, useState, ReactNode } from "react";
// Typy dla użytkownika
interface User {
  id: string;
  name: string;
  email: string;
}

//Typy dla wartości kontekstu

interface UserContexType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
}
//Domyśle ustawienia kontekstu
const defaultUserContext: UserContexType = {
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

//Tworzenie kontekstu

const UserContext = createContext<UserContexType>(defaultUserContext);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (newUser: User) => {
    setUser(newUser);
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
