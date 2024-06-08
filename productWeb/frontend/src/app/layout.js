import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/**
 * Add Bootstrap
 */
import 'bootstrap/dist/css/bootstrap.min.css';

import HeaderComponent from "productWeb/components/shared/header/page";
import FooterComponent from "productWeb/components/shared/footer/page";
import Container from "react-bootstrap/Container";


export const metadata = {
  title: "productWeb",
  description: "Frontend web development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body>
      <Container className={"container"}>
        <HeaderComponent/>
        {children}
        <FooterComponent/>
      </Container>
    </body>
    </html>
  );
}
