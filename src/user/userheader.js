import { Link } from "react-router-dom";
const UserHeader = () =>{
    return(

        <nav className="navbar navbar-expand-lg bg-secondary">
            <div className="container">
                <a className="navbar-brand text-white" href="#">
                    <i className="fa fa-shopping-bag fa-lg"></i> Shopping@Home
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item me-4">
                            <Link className="nav-link text-white" to="/">
                                <i className="fa fa-home"></i> Shopping
                            </Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link text-white" to="/cart">
                                <i className="fa fa-shopping-cart"></i>  Cart 
                            </Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link text-white" to="/login">
                                <i className="fa fa-lock"></i> Seller Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/register">
                                <i className="fa fa-user-plus"></i> Seller New Account
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
export default UserHeader;