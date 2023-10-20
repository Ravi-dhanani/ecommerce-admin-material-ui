import MainLayout from "@/components/common/header/MainLayout";
import Head from "next/head";
import Dashboard from "../components/Dashboard/Dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </>
  );
}
