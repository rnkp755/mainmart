import NavBar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Navigation from "../features/navbar/Navigation";

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