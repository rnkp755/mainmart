import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Navigation from "../features/navbar/Navigation";
import ImageCarousel from "../features/carousel/Categories.js";
import Slider from "../features/slider/Slider.js"
import Tabs from "../features/Tabs/Tabs.js"

import { Link } from "react-router-dom";

function Home() {
    let homePageSlides = [
        "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
        "https://wallpapercave.com/wp/wp3386769.jpg",
        "https://wallpaperaccess.com/full/809523.jpg",
        "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
    ];

    return (
        <div className="w-full">
            <NavBar>
                <div className="flex flex-col max-h-[45vh]">
                    <Slider slides={homePageSlides} />
                </div>
                <Tabs />
                <ImageCarousel />
                <ProductList></ProductList>
            </NavBar>
            
        </div>
    );
}

export default Home;