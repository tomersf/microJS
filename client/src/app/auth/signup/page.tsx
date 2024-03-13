"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import useRequest from "@/hooks/use-request";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => router.push("/"),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    doRequest(e);
  };

  return (
    <form className="flex flex-col items-center gap-2" onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div>
        <label>Email Address</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <Button>Sign Up</Button>
    </form>
  );
};

export default Page;
