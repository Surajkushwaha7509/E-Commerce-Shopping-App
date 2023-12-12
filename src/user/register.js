import { useState } from "react";
import swal from "sweetalert";


const Myregister = () =>{
    let [ fullname , pickName ] = useState( [] );
    let [ mobile , pickMobile ] = useState( [] );
    let [ email , pickEmail] = useState( [] );
    let [ password , pickPassword ] = useState( [] );
    const save = () =>{
        let formstatus = true;
        if (fullname === "" )
        {
            formstatus = false;
        }

        // Mobile Validation
        var mpattern = /^[0]?[6789]\d{9}$/;
        if ( !mpattern.test(mobile) )
        {
            formstatus = false;
        }

        // Email Validation
        var epatern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( !epatern.test(email) )
        {
            formstatus = false;
        }

        // Password Validation
        if (password === "" )
        {
            formstatus = false;
        }

        // Check all fields
        if ( formstatus === false )
        {
            swal( "Invalid Input " , "Please Fill the Required Fields..." , "warning" );
        }
        else{
            let url = "http://localhost:1234/account";
            let userdata = {
                name : fullname,
                mobile : mobile,
                email : email,
                password : password
            }
            let postdata = {
                headers : { 'content-type':'application/json' },
                method : 'POST',
                body : JSON.stringify(userdata)
            }
            fetch( url , postdata )
            .then(Response=>Response.json())
            .then(sellerinfo=>{
                swal("Welcome , " + fullname , "Your Account Create Successfully ! " , "success");
                pickName();
                pickEmail();
                pickMobile();
                pickPassword();
            })
        }
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="border rounded p-4">
                        <h3 className="mb-4 text-center"><i className="fa fa-user-plus"></i> Create New Account </h3>
                        <p className="text-danger text-center"> * Marked fields are Mendatory</p>
                        <div className="mb-3">
                            <label> Seller Name <i className="text-danger">*</i> </label>
                            <input type="text" className="form-control mt-2"
                            onChange={suraj=>pickName(suraj.target.value)} value={fullname} />
                        </div>
                        <div className="mb-3">
                            <label> Mobile Number <i className="text-danger">*</i></label>
                            <input type="text" className="form-control mt-2"
                            onChange={suraj=>pickMobile(suraj.target.value)} value={mobile} maxLength={11} required/>
                        </div>
                        <div className="mb-3">
                            <label> Email ID <i className="text-danger">*</i></label>
                            <input type="email" className="form-control mt-2"
                            onChange={suraj=>pickEmail(suraj.target.value)} value={email} required/>
                        </div>
                        <div className="mb-3">
                            <label> Password <i className="text-danger">*</i></label>
                            <input type="password" className="form-control mt-2"
                            onChange={suraj=>pickPassword(suraj.target.value)} value={password} required/>
                        </div>
                        <div className="mb-3 text-center">
                            <button className="btn btn-primary" onClick={save}> Crate Account </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Myregister;