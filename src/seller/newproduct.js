import { useState , useEffect } from "react";
import swal from "sweetalert";

const Newproduct = () =>{

    let [ pname , pickName ] = useState( [] );
    let [ pprice , pickPrice ] = useState( [] );
    let [ pphoto , pickPhoto ] = useState( [] );
    let [ pdetails , pickDetails ] = useState( [] );

    //State variable for error message
    let [ nameError , updateNameError ] = useState( "" );
    let [ priceError , updatePriceError ] = useState( "" );
    let [ photoError , updatePhotoError ] = useState( "" );
    let [ detailsError , updateDetailsError ] = useState( "" );

    const save = () =>{
        let formStatus = true;

        /** Name Validation */
        if(pname == ""){
            formStatus = false;
            updateNameError("Invalid Product Name ! ")
        }
        else{
            updateNameError("");
        }

        /** Price Validation  */
        if( isNaN( pprice) || pprice=="" ){
            formStatus = false;
            updatePriceError("Invalid Price !");
        }
        else{
            updatePriceError("");
        }

        /** Photo Validation  */
        if( pphoto=="" ){
            formStatus = false;
            updatePhotoError("Invalid Photo URL !");
        }
        else{
            updatePhotoError("");
        }

        /** Details Validation  */
        if( pdetails.length < 15 || pdetails.length > 100 ){
            formStatus = false;
            updateDetailsError("Enter Details Between 15 to 100 Characters !");
        }
        else{
            updateDetailsError("");
        }


        if( formStatus == true )
        {
            let newproduct = {
                name : pname,
                price : pprice,
                photo : pphoto,
                details : pdetails,
                seller : localStorage.getItem("sellerid")
            };
            let url = "http://localhost:1234/product";
            let postdata={
                headers : {'Content-Type' : "application/json"},
                method : "POST",
                body : JSON.stringify(newproduct)
            }
            fetch( url , postdata )
            .then(Response=>Response.json())
            .then(pinfo=>{
                swal( pname,"Save Successfully..." , "success" );
                pickName("");
                pickPrice("");
                pickPhoto("");
                pickDetails("");
            })
        }
        else{
            swal("Invalid Input", "Please enter Product Details", "warning");
        }
        
    }
    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 text-center mb-4">
                    <h1 className="text-primary"> 
                        <i className="fa fa-plus"></i> Enter Product Details
                    </h1>
                </div>

                <div className="col-lg-4 mb-3">
                    <label> Enter Product Name </label>
                    <input type="text" className="form-control" value={pname}
                    onChange={obj=>pickName(obj.target.value)}/>
                    <small className="text-danger"> { nameError } </small>
                </div>

                <div className="col-lg-4 mb-3">
                    <label> Enter Product Price </label>
                    <input type="number" className="form-control" value={pprice}
                    onChange={obj=>pickPrice(obj.target.value)}/>
                    <small className="text-danger"> { priceError } </small>
                </div>

                <div className="col-lg-4 mb-3">
                    <label> Enter Product Photo </label>
                    <input type="text" className="form-control" value={pphoto}
                    onChange={obj=>pickPhoto(obj.target.value)}/>
                    <small className="text-danger"> { photoError } </small>
                </div>

                <div className="col-lg-9 mb-3">
                    <label> Enter Product Details </label>
                    <textarea className="form-control" value={pdetails}
                    onChange={obj=>pickDetails(obj.target.value)}></textarea>
                    <small className="text-danger"> { detailsError } </small>
                </div>

                <div className="col-lg-3 mb-3 mt-3 text-center">
                    <br/>
                    <button className="btn btn-danger" onClick={save}> Save Product </button>
                </div>
            </div>
        </div>
    )
}
export default Newproduct;