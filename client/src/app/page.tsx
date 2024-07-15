import ImageSlider from "./components/ImageSlider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './globals.css';
export default function Home() {

  return (
    <div className="relative h-screen">
    <Header />
   <ImageSlider />
   <Footer />
   </div>
  )
}
