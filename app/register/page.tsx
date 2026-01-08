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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  fname: string;
  lname: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <div className=" w-full flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create to your account</CardTitle>
          <CardDescription>
            Enter your Credential below to Register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fname">First Name</Label>
                <Input
                  id="fname"
                  type="text"
                  placeholder="Jhon"
                  {...register("fname", { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lname">Last Name</Label>
                <Input
                  id="lname"
                  type="text"
                  placeholder="Doe"
                  {...register("lname", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="xyz@gmail.com"
                  {...register("email", { required: true })}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="phn">Phone</Label>
                </div>
                <Input
                  id="phn"
                  type="number"
                  {...register("phone", { required: true })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2 w-full  px-0 mt-5">
              <Link
                href="/login"
                className=" inline-block text-sm underline-offset-4 hover:underline"
              >
                Already have an Account?
              </Link>
              <Button type="submit" className="w-full cursor-pointer">
                Register
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
