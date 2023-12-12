import { useState } from "react";
import swal from "sweetalert";

const MyLogin = () =>{
    let [ email , pickEmail] = useState( [] );
    let [ password , pickPassword ] = useState( [] );

    const Login = () =>{

        let formstatus = true;

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
            swal( "Invalid Input " , "Enter Your Login Details..." , "warning" );
        }
        else{
            //  let url = "http://localhost:1234/account?email=x@gmail.com&password=123";
            let url = "http://localhost:1234/account?email="+email+"&password="+password;
            fetch(url)
            .then(Response=>Response.json())
            .then(userinfo =>{
                if(userinfo.length>0)
                {
                    localStorage.setItem("sellerid" , userinfo[0].id );
                    localStorage.setItem("sellername" , userinfo[0].name );
                    //window.location.href="http://localhost:3000/#/";
                    window.location.href="#/";
                    window.location.reload();   // To reload the current page.
                }
                else{
                    swal( " Login Fail ! " , "Invaild or Not Exists " , "warning" );
                }
            })
            
        }
    }

    return(
        <div className="container mt-5" >
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="border rounded p-4">
                        <h3 className="mb-4 text-center"><i className="fa fa-user-plus"></i> LOGIN </h3>
                        <div className="mb-3">
                            <label> Email ID </label>
                            <input type="email" className="form-control"
                            onChange={suraj=>pickEmail(suraj.target.value)} value={email} required/>
                        </div>
                        <div className="mb-3">
                            <label> Password </label>
                            <input type="password" className="form-control"
                            onChange={suraj=>pickPassword(suraj.target.value)} value={password} required/>
                        </div>
                        <div className="mb-3 text-center">
                            <button className="btn btn-danger" onClick={Login}> Login </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default MyLogin;