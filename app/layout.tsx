import type { Metadata } from 'next';
import { AuthContextProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.css';
import './globals.css';
import NavBar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Sport Booking',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <NavBar />
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
