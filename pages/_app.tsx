import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google"
const inter = Inter({ subsets: ['latin'] });
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId='971340474639-96bl2d6rpqf19e7aqb68p5injcq4vkmq.apps.googleusercontent.com'>
        <Component {...pageProps} />
        <Toaster />
        <ReactQueryDevtools/>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </div>
}
