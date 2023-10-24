import AuthServices from "@/components/services/AuthServices";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
