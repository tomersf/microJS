"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";

import { ApiError, APIError } from "@/lib/types";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<APIError[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
    } catch (error) {
      setErrors((error as ApiError).response.data.errors);
    }
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
      {errors.length > 0 && (
        <div className="flex flex-col bg-red-600/30 rounded-md p-2">
          <ul>
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      <Button>Sign Up</Button>
    </form>
  );
};

export default Page;
