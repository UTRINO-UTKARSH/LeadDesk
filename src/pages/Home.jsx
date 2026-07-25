import Navbar from "../components/common/Navbar";
import Footer from "../components/footer/Footer";
import HeroContent from "../components/hero/HeroContent";
import HeroLeft from "../components/hero/HeroLeft";
import Second from "../components/second/Second"
const Home = () => {
    return (
        <div className="min-h-screen gap-4 bg-[#0B0F14]">
            <Navbar />
            <div className="flex p-9 mx-20 justify-between">
                <div className="">
                    <HeroContent
                    para="Send us the details once. It lands straight in our queue,
                    gets logged, and gets a real answer — no forms lost in an
                    inbox."
                     title1="Every project starts" 
                     title2="as one" 
                     subtitle="clean entry." 
                     head="No. 01 — Intake" />
                </div>
                <div className="w-xl">
                    <HeroLeft />
                </div>
            </div>
            <Second />
            <Footer/>
        </div>
    );
};

export default Home;