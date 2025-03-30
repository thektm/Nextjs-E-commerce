import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { supabase } from "@/Client/SupaBase";
import {toast} from "react-toastify";

interface User {
  id: string;
  email: string;
  full_name: string;
  address: string;
  phone_number: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string,
    address: string,
    phone: string,
    full_name: string,
  ) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is stored in local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) {
      console.error("Login failed:", error);
      return false;
    }

    if (data) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    }

    return false;
  };
  const signup = async (
    email: string,
    password: string,

    address: string,
    phone: string,
    full_name: string,
  ): Promise<boolean> => {
    const { data, error } = await supabase
      .from("customers")
      .insert({
        email: email,
        password: password,
        full_name: full_name,
        addres: address,
        phone_number: phone,
      })
      .select()
      .single();

    if (error) {
      console.error("Login failed:", error);
      return false;
    }

    if (data) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      return true;
    }

    return false;
  };
const notify = ()=> toast('logged out of system successfully');
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    notify();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
