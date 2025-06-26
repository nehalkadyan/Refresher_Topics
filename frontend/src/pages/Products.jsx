import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { FcSearch } from "react-icons/fc";


const Products = () => {

    // states

    const [searchTerm, setSearchTerm] = useState()
    const [sortBy, setSortBy] = useState("")

    console.log("sortBy:", sortBy)

    const [order, setOrder] = useState("asc")

    console.log("order:", order)

    console.log("searchTerm", searchTerm)

    const [products, setProducts] = useState([])

    console.log("products",products)

    // to load the products on initial Load

    useEffect(() => {
      fetchProducts()
    }, [])

    // function to fetch products

    const fetchProducts = async() => {
       try{
         const response = await axios.get("http://localhost:5000/product/all_products");
        //  console.log(response.data)

        setProducts(response.data.all_products)
       }catch(err){
        console.log("Error fetching products from frontend", err)
       }
    }

    // search functionality

    const handleSearch = async() => {
        try{
          const response = await axios.get("http://localhost:5000/product/search", {
            params : {
                searchTerm,
                sortBy, 
                order
            }
          })

        //   console.log(response.data)

        setProducts(response.data.products)
        }catch(err){
            console.log("Error searching products", err)
        }
    }

  return (
    <div className='h-screen'>

        <div className='flex h-[120px] items-center justify-around'>
        <div className='h-1/3 w-1/5 flex items-center gap-2 border-2 p-2 border-black rounded-md'>
            <FcSearch className='text-4xl'/>
            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder='Search...' className='text-xl border-none outline-none text-gray-700 py-2 px-3' />
        </div>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="asc">Low - High</option>
            <option value="desc">High - Low</option>
        </select>

        {/* button to search */}

        <button onClick={handleSearch} className='bg-red-800 p-2 px-5 text-white font-semibold rounded-lg cursor-pointer'>Search</button>

        {/* button to clear filters */}

        <button className='bg-slate-800 p-2 text-white font-semibold rounded-lg cursor-pointer'>Clear Filters</button>

        </div>

        <h1 className='text-5xl font-bold text-center'>Products</h1>

        <div className='flex justify-around mt-15'>

        {products.map((product, id) => (
            <div className='border-1 border-black p-3 rounded-xl' key = {id}>
               <h1 className='text-2xl font-semibold'>Name : {product.name}</h1>
               <p className='text-lg text-gray-500'>Description : {product.description}</p>
                <h2 className='text-lg'><span className='font-semibold'>Price : </span>{product.price}</h2>
                <h2 className='text-lg'><span className='font-semibold'>Stock :</span> {product.stock}</h2>

            </div>
        ))}

        </div>
    </div>
  )
}

export default Products