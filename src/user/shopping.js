import { useState , useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";

const Myhome = () =>{

    let [allproduct , updateProduct ] = useState( [] );

    const getproduct = () =>{
        let url = "http://localhost:1234/product";
        fetch(url)
        .then(Response=>Response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse() );
        })
    }

    useEffect(()=>{
        getproduct();
    }, [1]);

    const addtocart = async( productinfo ) =>{
        productinfo["qty"] = 1;
        let url = "http://localhost:1234/cart";
        let postdata = {
            headers : {"Content-Type":"application/json"},
            method : "POST",
            body : JSON.stringify(productinfo)
        }
        try{
            await fetch(url ,postdata)
            .then(response=>response.json())
            .then(pinfo=>{
                swal( productinfo.name , "Added in your cart", "success");
            })
        }
        catch(error){
            swal( productinfo.name , "Already in your cart", "warning");
        }
    }

    let[keyword, updateKeyword] = useState(""); // For Search

    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return(
        <>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                    <div className="carousel-item active">
                        <img src="1.avif" className="d-block w-100" height={400} alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5> Shop From Home </h5>
                            <p> the Online shop is open 24/7 all the days </p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="2.avif" className="d-block w-100" height={400} alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>  50% Discount on all Items </h5>
                            <p> If you can buy 4 item, you will get 8 items </p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="3.webp" className="d-block w-100" height={400} alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Kids, Female, Male, All Types of Dresses </h5>
                            <p>Some representative placeholder content for the third slide.</p>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-lg-8"></div>
                    <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Search"
                        onChange={obj=>updateKeyword(obj.target.value)}/>
                    </div>
                </div>

                <div className="row mt-4 mb-5">
                    {
                        allproduct.slice(offset, offset + PER_PAGE).map(( product , index )=>{
                            if (product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                            product.price.includes(keyword) ) 
                            return(
                                <div className="col-lg-3 mb-4" key={index}>
                                    <div className="p-4">
                                        <h4 className="text-center text-primary"> { product.name } </h4>
                                        <img src={product.photo} className="rounded" height={200} width="100%"/>
                                        <p className="mt-2 mb-2 c1"> 
                                            { product.details } 
                                        </p>
                                        <p className="p-2 rounded border text-primary text-center"> 
                                            Rs. { product.price } 
                                        </p>
                                        <p className="text-center d-grid">
                                            <button className="btn btn-danger btn-sm" onClick={ addtocart.bind(this , product ) }>
                                                <i className="fa fa-plus"></i> Add to Cart
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="mb-4 mt-4">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
            </div>
            
        </>
    )
}

export default Myhome;