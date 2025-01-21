import { Container } from "@/components/custom/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LoginAction } from "./action";

export default function LoginPage() {
  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <form action={LoginAction}>
          <CardContent>
            <div className="">
              <Label htmlFor="email" className="inline-block mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="">
              <Label htmlFor="password" className="inline-block mb-2">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <Button type="submit">Submit</Button>
            <p className="mt-2 text-sm">
              Don&apost have an account?
              <Link
                href={"/register"}
                className="ml-1 text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </Container>
  );
}