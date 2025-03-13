import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth";
import useAuth from "../hooks/useAuth";
import Layout from "../components/Layout";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      reset();
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  return (
    <Layout>
      <div className="h-screen w-screen flex items-center justify-center bg-cover bg-login">
        <div className="p-[20px] w-3/4 sm:w-2/5 bg-white border-2 border-teal-400">
          <h1 className="text-[24px] font-light">CREATE AN ACCOUNT</h1>

          <form className="flex flex-wrap w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-1 min-w-[40%] mt-5 mr-2">
              <input
                type="text"
                className="w-full p-[10px] border rounded focus:outline-none focus:border-teal-500"
                placeholder="Full Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex-1 min-w-[40%] mt-5 mr-2">
              <input
                type="email"
                className="w-full p-[10px] border rounded focus:outline-none focus:border-teal-500"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="flex-1 min-w-[40%] mt-5 mr-2">
              <input
                type="password"
                className="w-full p-[10px] border rounded focus:outline-none focus:border-teal-500"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div className="flex-1 min-w-[40%] mt-5 mr-2">
              <input
                type="password"
                className="w-full p-[10px] border rounded focus:outline-none focus:border-teal-500"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="w-full mt-5">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  {...register("acceptTerms")}
                />
                <span className="text-sm">
                  By creating an account, I consent to the processing of my personal data in accordance with the{" "}
                  <b>PRIVACY POLICY</b>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="mt-1 text-sm text-red-500">{errors.acceptTerms.message}</p>
              )}
            </div>

            <div className="w-full mt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/5 py-[15px] px-[20px] bg-teal-700 hover:bg-teal-500 text-white cursor-pointer rounded transition-colors duration-200 disabled:bg-teal-500 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "CREATE"}
              </button>
            </div>
          </form>

          <Link to="/login">
            <p className="mt-4 text-sm cursor-pointer hover:text-gray-400 transition-colors duration-200">
              ALREADY HAVE AN ACCOUNT?{" "}
              <span className="text-blue-500 ml-1 underline">SIGN IN</span>
            </p>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
