import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StartupForm from "@/components/StartupForm";
import Form from "next/form";
import React from "react";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">SUBMIT YOUR STARTUP PITCH</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default page;
