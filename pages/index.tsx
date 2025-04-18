import NewHero from "@/componenets/NewHero";
import { Navbar } from "@/componenets/Navbar";
import { Footer } from "@/componenets/Footer";
import Cataloge from "@/componenets/Cataloge";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { SelectionProvider } from "@/context/SelectionCOntext";
import ToastContainerComponent from "@/componenets/ToastContainerComponent";
import AboutUs from "@/componenets/AboutUs";
import { ReactLenis } from "lenis/react";

export default function Home() {
  return (
    <main className="">
      <ReactLenis root>
        <AuthProvider>
          <SelectionProvider>
            <CartProvider>
              <ToastContainerComponent />
              <Navbar />
              <NewHero />
              <Cataloge />
              <AboutUs />
              <Footer />
            </CartProvider>
          </SelectionProvider>
        </AuthProvider>
      </ReactLenis>
    </main>
  );
}
