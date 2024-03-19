"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import useRequest from "@/hooks/use-request";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { redirectAndRefresh } from "@/lib/utils";

const Page = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => redirectAndRefresh(router, "/"),
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    doRequest(e);
  };

  return (
    <form className="flex flex-col items-center gap-2" onSubmit={onSubmit}>
      <h1>Sign In</h1>
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
      <Button>Sign In</Button>
    </form>
  );
};

export default Page;
