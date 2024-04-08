import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Navigation from "../features/navbar/Navigation";

import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            
        </div>
    );
}

export default Home;