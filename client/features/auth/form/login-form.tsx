"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TLoginUser, ZLoginUser } from "@/features/auth/schema/user";
import { BACKEND_URL } from "@/utils/constants";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginUser>({
    resolver: zodResolver(ZLoginUser),
  });

  const onSubmit = async (data: TLoginUser) => {
    try {
      await axios.post(`${BACKEND_URL}/login`, data, {
        withCredentials: true,
      });
      router.push("/dashboard"); // or /notes
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
        <p className="text-gray-400 text-sm">
          Log in to access your notes and bookmarks
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 text-sm"
        autoComplete="off"
      >
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Redirect to Register */}
      <p className="text-center text-gray-400 text-sm mt-6">
        New here?{" "}
        <Link
          href="/register"
          className="text-blue-400 hover:underline font-medium"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
