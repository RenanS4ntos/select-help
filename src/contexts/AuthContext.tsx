import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { API } from "../services/api";

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface LoginProps {
  email: string;
  password: string;
}

export interface UserProps {
  name: string;
  email: string;
  password: string;
  admin: boolean;
  projects: [];
}

interface AuthContextProps {
  handleLogin: (props: LoginProps) => Promise<void>;
  handleLogout: () => Promise<void>;
  isLoading: boolean;
  isLogged: boolean;
  user?: UserProps;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProps>();

  async function handleLogin({ email, password }: LoginProps) {
    setIsLoading(true);

    await API()
      .get<UserProps>("/user")
      .then((response) => {
        const user: UserProps = {
          name: response.data.name,
          email: response.data.email,
          password: response.data.password,
          admin: response.data.admin,
          projects: response.data.projects,
        };
        setUser(user);
        setIsLogged(true);
      })
      .catch((error) =>
        Alert.alert(
          "Erro",
          "Ocorreu um erro ao realizar login. Verifique as credenciais e tente novamente."
        )
      )
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleLogout() {
    setUser(undefined);
    setIsLoading(false);
    setIsLogged(false);
  }

  // useEffect(() => {
  //   try {
  //     const localToken = localStorage.getItem("token");
  //     if (!localToken) {
  //       throw new Error();
  //     }
  //     const user = validateToken(localToken);
  //     setUser(user);
  //     setIsLogged(true);
  //   } catch (error) {
  //     setIsLogged(false);
  //     localStorage.removeItem("token");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!isLoading && isLogged) {
  //     if (["/entrar", "/cadastrar"].includes(location.pathname)) {
  //       navigate("/");
  //     }

  //     const interceptor = axios.interceptors.response.use(
  //       (res) => res,
  //       (err) => {
  //         if (err.response?.status === 401) {
  //           toast({
  //             title: "Opa!",
  //             status: "warning",
  //             description: "Sessão expirada. Faça login novamente.",
  //             isClosable: true,
  //             duration: 3000,
  //           });
  //           handleLogout();
  //           return {};
  //         }

  //         return err;
  //       }
  //     );

  //     return () => {
  //       axios.interceptors.response.eject(interceptor);
  //     };
  //   }
  // }, [isLoading, isLogged]);

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        isLoading,
        isLogged,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
