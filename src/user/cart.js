import { useState , useEffect } from "react";
import swal from "sweetalert";

const Mycart = () =>{
    let [allproduct , updateProduct ] = useState( [] );

    const getproduct = () =>{
        let url = "http://localhost:1234/cart";
        fetch(url)
        .then(Response=>Response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse() );
        })
    }

    useEffect(()=>{
        getproduct();
    }, [1]);

    const delcart = ( id, name ) =>{
        let url = "http://localhost:1234/cart/" + id;
        let postdata = {"method":"delete"}
        fetch(url,postdata)
        .then(response=>response.json())
        .then(productArray=>{
            getproduct();
            swal( name , "deleted from Your Cart" , "success" );
        })
    }

    let total = 0;

    const updatecart = ( product , input ) =>{
        if( input == "Y")
        {
            product["qty"] = product.qty + 1 ;
        }
        else{
            product["qty"] = product.qty - 1 ;
        }
        if (product.qty==0)
        {
            delcart(product.id , product.name );
        }

        let url = "http://localhost:1234/cart/" + product.id;
        let postdata = {
            headers : {'Content-type':'application/json'},
            method:'put',
            body:JSON.stringify(product)
        }
        fetch(url,postdata)
        .then(response=>response.json())
        .then(info=>{
            getproduct(); // reload the list after update
            swal(product.name, "Quantity Updated to " + product.qty , "success");
        })

    }

    let [ customer , pickCustomer ] = useState("");
    let [ customerMobile , pickCustomerMobile ] = useState("");
    let [ customerEmail , pickCustomerEmail ] = useState("");
    let [ customerAdd , pickCustomerAdd ] = useState("");

    const placeholder = () =>{
        let url = "http://localhost:1234/order";
        let orderdata = {
            fullname : customer,
            email : customerEmail,
            mobile : customerMobile,
            address : customerAdd,
            itemlist : allproduct
        }
        let postdata = {
            headers : {'Content-Type':'application/json'},
            method:'POST',
            body:JSON.stringify(orderdata)
        }
        fetch(url,postdata)
        .then(response=>response.json())
        .then(info=>{
            swal( "Hi "+ customer , " We have Received Your Order " , "success");
            //allproduct.map((p, index)=>{
            //  delcart(p.id, p.name);
            //})
            pickCustomer("");pickCustomerAdd("");pickCustomerEmail("");pickCustomerMobile("");
        })
        
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-3">
                    <div className="shadow-lg p-3 mb-5">
                        <h4 className="text-center"> Customer Details</h4>
                        <div className="mb-3 mt-3">
                            <label> Customer Name </label>
                            <input type="text" className="form-control"
                            onChange={suraj=>pickCustomer(suraj.target.value)} value={customer}/>
                        </div>
                        <div className="mb-3">
                            <label> Mobile Number </label>
                            <input type="number" className="form-control"
                            onChange={suraj=>pickCustomerMobile(suraj.target.value)} value={customerMobile}/>
                        </div>
                        <div className="mb-3">
                            <label> Email </label>
                            <input type="email" className="form-control"
                            onChange={suraj=>pickCustomerEmail(suraj.target.value)} value={customerEmail}/>  
                        </div>
                        <div className="mb-3">
                            <label> Delivery Address </label>
                            <textarea className="form-control"
                            onChange={suraj=>pickCustomerAdd(suraj.target.value)} value={customerAdd}></textarea>
                        </div> 
                        <div className="mb-3 text-center">
                                <button className="btn btn-primary" onClick={placeholder}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <h3 className="text-center text-dark"> { allproduct.length } :  Item in Your Cart </h3>
                    <table className="table table-bordered mt-5 text-center">
                        <thead>
                            <tr>
                                <th> SL No. </th>
                                <th> Item Name </th>
                                <th> Photo </th>
                                <th> Quantity </th>
                                <th> Price </th>
                                <th> Total </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.map(( product , index )=>{
                                    total = total + ( product.price * product.qty );
                                    return(
                                        <tr key={index}>
                                            <td> { index + 1 } </td>
                                            <td> { product.name } </td>
                                            <td> <img src ={ product.photo} height={50} width={50}/></td>
                                            <td className="input-group"> 
                                                <button className="btn btn-sm-sm btn-info"
                                                onClick={updatecart.bind(this , product , "Y")}>+</button>
                                                <input type="text" 
                                                className="form-control" 
                                                readonly="readonly"
                                                value={product.qty}/>
                                                <button className="btn btn-sm-sm btn-warning"
                                                onClick={updatecart.bind(this , product , "N")}>-</button>
                                            </td>
                                            <td> { product.price } </td>
                                            <td> { product.qty * product.price } </td>
                                            <td>
                                                <button className="btn btn-danger btn-sm" 
                                                onClick={delcart.bind(this , product.id , product.name )}> 
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            <tr>
                                <td colSpan={7} className="text-end bg-light text-dark">
                                    <strong>Rs. : { total } - Total Cost , { allproduct.length } Item in Cart </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Mycart;