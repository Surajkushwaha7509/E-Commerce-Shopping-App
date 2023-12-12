import { useState , useEffect } from "react";
import ReactPaginate from "react-paginate";

const Myproduct = () =>{
    let [allproduct , updateProduct ] = useState( [] );
    let sellerid = localStorage.getItem("sellerid");

    const getproduct = () =>{
        let url = "http://localhost:1234/product?seller="+sellerid;
        fetch(url)
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct( productArray.reverse() );
        })
    }

    useEffect(()=>{
        getproduct();
    }, [1]);

    let[keyword, updateKeyword] = useState(""); // For Search

    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-9 text-center">
                    <h1 className="text-primary"> 
                        <i className="fa fa-suitcase"></i> Manage Product : { allproduct.length }
                    </h1>
                </div>
                <div className="col-lg-3 pt-4">
                    <input type="text" className="form-control" placeholder="Search" 
                    onChange={obj=>updateKeyword(obj.target.value)}/>   
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-lg-12">
                    <table className="table table-bordered table-hover text-center">
                        <thead>
                            <tr>
                                <th> # </th>
                                <th> Product Name </th>
                                <th> Price </th>
                                <th> Details </th>
                                <th> Photo </th>
                                <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allproduct.slice(offset, offset + PER_PAGE).map(( product , index )=>{
                                    if (product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                                    product.price.includes(keyword) ) 
                                    {
                                        return(
                                            <tr key={ index }>
                                                <td> { product.id } </td>
                                                <td> { product.name } </td>
                                                <td> { product.price } </td>
                                                <td> { product.details } </td>
                                                <td> <img src={ product.photo } height={50} width={60}/> </td>
                                                <td>
                                                    <button className="btn btn-danget btn-sm">
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>

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
            </div>
        </div>
    )
}
export default Myproduct;