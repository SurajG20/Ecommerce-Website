import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <Layout>
      <div className="px-8 w-full h-screen flex justify-center items-center bg-login bg-no-repeat backdrop-blur-md bg-cover">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border-2 border-teal-400 bg-white p-12 flex flex-col min-w-[17rem] shadow-md sm:min-w-[22rem] md:min-w-[28rem]"
        >
          <h1 className="uppercase text-xl mb-6 font-bold">Log in</h1>

          <div className="mb-4">
            <input
              className="w-full p-2 border-2 rounded focus:outline-none focus:border-teal-500"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <input
              className="w-full p-2 border-2 rounded focus:outline-none focus:border-teal-500"
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="mb-6 bg-teal-700 hover:bg-teal-500 text-white p-2 rounded transition-colors duration-200 disabled:bg-teal-500 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <Link
            to="/register"
            className="capitalize text-center underline mb-4 text-teal-700 hover:text-teal-500 transition-colors duration-200"
          >
            Create a new account
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
