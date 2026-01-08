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

export default function RegisterPage() {
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create to your account</CardTitle>
          <CardDescription>
            Enter your Credential below to Register to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="fname">First Name</Label>
                <Input id="fname" type="text" placeholder="Jhon" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lnmae">Last Name</Label>
                <Input id="lnmae" type="text" placeholder="Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="xyz@gmail.com"
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="phn">Phone</Label>
                </div>
                <Input id="phn" type="number" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                </div>
                <Input id="confirmPassword" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Link
            href="/login"
            className=" inline-block text-sm underline-offset-4 hover:underline"
          >
            Already have an Account?
          </Link>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
