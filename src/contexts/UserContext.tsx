import { api } from "@/lib/api";
import { UserProfile } from "@/models/user.model";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import React from "react";

interface UserProps {
  user: UserProfile | undefined;
  setUser: Dispatch<SetStateAction<UserProfile | undefined>>;
  setUserRequest: () => Promise<void>;
}

export const UserContext = createContext<UserProps>({} as UserProps);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserProfile>();

  const setUserRequest = async () => {
    await api.get("3/account/13062000").then((response) => {
      setUser(response.data);
    });
  };

  const value: UserProps = {
    user,
    setUser,
    setUserRequest,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
