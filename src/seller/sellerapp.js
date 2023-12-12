import { HashRouter , Routes , Route } from "react-router-dom";
import Mydadhboard from "./dashboard";
import Myproduct from "./productlist";
import Myorder from "./orderlist";
import Newproduct from "./newproduct";
import SellerHeader from "./sellerheader";

const SellerModule = () =>{
    return(
        <HashRouter>
            <SellerHeader/>
            <Routes>
                <Route exact path="/" element={<Mydadhboard/>}/>
                <Route exact path="/productlist" element={<Myproduct/>}/>
                <Route exact path="/newproduct" element={<Newproduct/>}/>
                <Route exact path="/order" element={<Myorder/>}/>
            </Routes>
        </HashRouter>
    )
}
export default SellerModule;