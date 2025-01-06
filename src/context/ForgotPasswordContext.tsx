import { createContext, useState } from "react";

type ForgotPasswordContextType = {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPasswordContext = createContext<ForgotPasswordContextType>({
  token: "",
  setToken: () => {},
  loading: false,
  setLoading: () => {},
});

export default ForgotPasswordContext;

export const ForgotPasswordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ForgotPasswordContext.Provider
      value={{ token, setToken, loading, setLoading }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};
