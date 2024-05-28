import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState(false)
  const params = useParams()
  const navigate = useNavigate()

  const UpdateProduct = async () => {
    console.log('result');
  }
  useEffect(() => {
    getProductById();
  }, [])

  const getProductById = async () => {
    let result = await fetch(`http://localhost:5050/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5050/product/${params.id}`, {
      method: 'Put',
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

      },
    })
    result = await result.json();
    navigate('/')

  }


  return (
    <div className='add-product'>
      <h1>Update Product</h1 >
      <input type="text" value={name}
        placeholder='Enter product Name' className='input-box'
        onChange={(e) => { setName(e.target.value) }} />
      {!name && error && <span className='invalid-input'>Enter valid name</span>}
      <input type="text" value={price}
        placeholder='Enter product Price' className='input-box'
        onChange={(e) => { setPrice(e.target.value) }} />
      {error && !price && <span className='invalid-input'>Enter valid price</span>}
      <input type="text" value={category}
        placeholder='Enter product Category' className='input-box'
        onChange={(e) => { setCategory(e.target.value) }} />
      {error && !category && <span className='invalid-input'>Enter valid category</span>}
      <input type="text" value={company}
        placeholder='Enter product Company' className='input-box'
        onChange={(e) => { setCompany(e.target.value) }} />
      {error && !company && <span className='invalid-input'>Enter valid company</span>}
      <button onClick={updateProduct} className='app-button'>Update Product</button>
    </div>


  )
}

export default UpdateProduct