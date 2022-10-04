import { createContext, useEffect, useState } from "react";

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface LoginProps {
  email: string;
  password: string;
}

interface UserProps {
  userID: string;
  email: string;
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
    const userID = "teste@123";
    const user: UserProps = { email, userID };
    setUser(user);
    setIsLogged(true);
    localStorage.setItem("token", userID);
  }

  async function handleLogout() {
    setUser(undefined);
    setIsLoading(false);
    setIsLogged(false);
    localStorage.removeItem("token");
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
