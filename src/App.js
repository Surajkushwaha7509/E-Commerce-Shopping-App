import SellerModule from "./seller/sellerapp";
import UserModule from "./user/userapp";

function App() {

  if( localStorage.getItem("sellerid") != null )
    return( <SellerModule/> )
  else
    return( <UserModule/> )

}

export default App;
