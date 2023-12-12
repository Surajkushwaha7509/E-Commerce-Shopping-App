import { Link } from "react-router-dom";
const SellerHeader = () =>{
    return(

        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container">
                <a className="navbar-brand text-white" href="#">
                    <i className="fa fa-shopping-bag fa-lg"></i> Shopping@Home
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">
                                <i className="fa fa-home"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/order">
                                <i className="fa fa-headset"></i> Manage Order 
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/newproduct">
                                <i className="fa fa-plus"></i> Add Product
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/productlist">
                                <i className="fa fa-suitcase"></i> All Product
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-warning" to="/productlist" onClick={logout}>
                                Welcome - { localStorage.getItem("sellername") } , <i className="fa fa-power-off"></i> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
export default SellerHeader;

const logout = () =>{
    localStorage.clear();
    window.location.href="#/login";
    window.location.reload();
}