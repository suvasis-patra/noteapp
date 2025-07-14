"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TRegisterUser, ZRegisterUser } from "@/features/auth/schema/user";
import { BACKEND_URL } from "@/utils/constants";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterUser>({
    resolver: zodResolver(ZRegisterUser),
  });

  const onSubmit = async (data: TRegisterUser) => {
    try {
      await axios.post(`${BACKEND_URL}/users/register`, data);
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Create an Account</h1>
        <p className="text-gray-400 text-sm">
          Sign up to start saving notes and bookmarks
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-sm"
        autoComplete="off"
      >
        {/* Username */}
        <div className="flex flex-col">
          <label htmlFor="username" className="text-gray-300 mb-1">
            Username
          </label>
          <input
            {...register("username")}
            id="username"
            placeholder="yourusername"
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-400 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-300 mb-1">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            placeholder="you@example.com"
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-300 mb-1">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            placeholder="••••••••"
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword")}
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Redirect to Login */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-400 hover:underline font-medium"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
