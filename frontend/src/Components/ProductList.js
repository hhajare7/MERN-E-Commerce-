import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    console.log(JSON.parse(localStorage.getItem('token')));
    let result = await fetch('http://localhost:5050/products', {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result)
  }

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5050/product/${id}`, {
      method: 'Delete',
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }

    });
    result = await result.json()
    if (result) {
      getProducts()
    }
  }
  const searchHandle = async (e) => {
    console.log(e.target.value);
    let key = e.target.value
    if (key) {
      let result = await fetch(`http://localhost:5050/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      if (result) {
        setProducts(result)
      }
    } else {
      getProducts()
    }
  }

  return (
    <div className='product-list'>
      <h3>Product List</h3>
      <input className='search-product-box' type="text" placeholder='Search Product' onChange={searchHandle} />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {
        products.length ? products.map((item, i) =>
          <ul key={item._id} >
            <li>{i + 1}</li>
            <li>{item.name}</li>
            <li>$ {item.price}</li>
            <li>{item.category}</li>
            <li style={{ paddingBottom: 2 }}><button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}><button>Update</button></Link></li>
          </ul>
        ) : <h2>No record found.</h2>
      }
    </div>
  )
}

export default ProductList