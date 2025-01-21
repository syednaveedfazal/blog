"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/custom/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { registerSchema } from "./schema";
import { RegisterAction } from "./action";
import { startTransition, useActionState } from "react";

interface State {
  message?: string;
}

export default function RegisterPage() {
  const [state, action, isPending] = useActionState<State>(RegisterAction, undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const formSubmit = (data: FormData) => {
    startTransition(() => action(data));
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Lets Register Account</CardTitle>
          <CardDescription>
            Hello 👋, You have a grateful journey
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(formSubmit)}>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="">
                <Label htmlFor="first-name" className="inline-block mb-2">
                  First Name
                </Label>
                <Input id="first-name" {...register("firstName")} />
                {errors.firstName?.message && (
                  <span className="text-xs text-red-500">
                    {errors.firstName.message?.toString()}
                  </span>
                )}
              </div>
              <div className="">
                <Label htmlFor="last-name" className="inline-block mb-2">
                  Last Name
                </Label>
                <Input id="last-name" {...register("lastName")} />
                {errors.lastName?.message && (
                  <span className="text-xs text-red-500">
                    {errors.lastName.message?.toString()}
                  </span>
                )}
              </div>
              <div className="">
                <Label htmlFor="email" className="inline-block mb-2">
                  Email
                </Label>
                <Input id="email" {...register("email")} />
                {errors.email?.message && (
                  <span className="text-xs text-red-500">
                    {errors.email.message?.toString()}
                  </span>
                )}
                {state?.message && (
                  <p className=" text-red-400 text-sm  font-medium">
                    {state?.message}
                  </p>
                )}
              </div>
              <div className="">
                <Label htmlFor="password" className="inline-block mb-2">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password?.message && (
                  <span className="text-xs text-red-500">
                    {errors.password.message?.toString()}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Button type="submit" disabled={isPending}>
              Submit
            </Button>
            <p className="mt-2 text-sm">
              Already have an account?
              <Link
                href={"/login"}
                className="ml-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
}