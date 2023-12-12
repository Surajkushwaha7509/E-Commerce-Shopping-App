import { useState ,useEffect } from "react";
const Mydadhboard = () =>{

    let [allproduct , updateProduct ] = useState( [] );
    let sellerid = localStorage.getItem("sellerid");

    const getproduct = () =>{
        let url = "http://localhost:1234/product?seller="+sellerid;
        fetch(url)
        .then(Response=>Response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse() );
        })
    }

    let [ allorder , updateorder ] = useState([]);

    const getorder = () =>{
        let url = "http://localhost:1234/order";
        fetch(url)
        .then(Response=>Response.json())
        .then(orderArray=>{
            updateorder( orderArray.reverse() );
        })
    }

    useEffect(()=>{
        getproduct();
        getorder();
    },[1]);
    
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1 className="text-primary"> My dashboard </h1>
                </div>
            </div>

            <div className="row mt-5 text-center">
                <div className="col-lg-2"></div>
                <div className="col-lg-4">
                    <i className="fa fa-suitcase fa-5x text-info"></i>
                    <h3 className="text-danger mt-3"> { allproduct.length } - Products in stock </h3>
                </div>
                <div className="col-lg-4">
                    <i className="fa fa-headset fa-5x text-success"></i>
                    <h3 className="text-danger mt-3"> { allorder.length } - Orders Received  </h3>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </div>
    )
}
export default Mydadhboard;