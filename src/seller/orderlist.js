import { useState , useEffect } from "react";
const Myorder = () =>{
    let [ allorder , updateorder ] = useState([]);

    const getorder = () =>{
        let url = "http://localhost:1234/order";
        fetch(url)
        .then(response=>response.json())
        .then(orderArray=>{
            updateorder( orderArray.reverse() );
        })
    }

    useEffect(()=>{
        getorder();
    },[1]);

    let sellerid = localStorage.getItem("sellerid");

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <h1 className="text-primary"> 
                        <i className="fa fa-headset"></i> Orader List
                    </h1>
                </div>
            </div>
            {
                allorder.map(( order , index )=>{
                    return(
                        <div className="row mb-5 shadow rounded" key={index}>
                            <div className="col-lg-3">
                                <h4>{ order.fullname}</h4>
                                <address>
                                    <p>{ order.mobile}</p>
                                    <p>{ order.email}</p>
                                    <p>{ order.address}</p>
                                </address>
                            </div>
                            <div className="col-lg-9">
                                <table className="table">
                                    <thead>
                                        <tr> 
                                            <th> Product Name </th>
                                            <th> Photo </th>
                                            <th> Price </th>
                                            <th> Quantity </th>
                                            <th> Total Cost </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.itemlist.map(( eachitem , index2 )=>{
                                                if( sellerid == eachitem.seller )
                                                {
                                                    return(
                                                        <tr key={index2}>
                                                            <td> { eachitem.name  } </td>
                                                            <td> 
                                                                <img src ={ eachitem.photo } height={50} width={50} />
                                                            </td>
                                                            <td> { eachitem.price  } </td>
                                                            <td> { eachitem.qty  } </td>
                                                            <td> { eachitem.price * eachitem.qty  } </td>

                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Myorder;