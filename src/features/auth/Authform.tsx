import { Button } from "@/features/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/features/ui/card";
import { Input } from "@/features/ui/input";
import { Label } from "@/features/ui/label";

import { useState } from "react";

export interface FormStateType {
  email: string;
  password: string;
}

interface AuthFormPropTypes {
  title: string;
  desc: string;
  submitHandler: (obj: FormStateType) => void;
}

function AuthForm({ title = "", desc = "", submitHandler }: AuthFormPropTypes) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                  id="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                  id="password"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              submitHandler(form);
            }}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AuthForm;
