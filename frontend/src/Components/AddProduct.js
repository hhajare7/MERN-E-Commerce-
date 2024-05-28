import React, { useState } from 'react'

const AddProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState(false)



  const addProduct = async () => {

    if (!name || !price || !category || !company) {
      setError(true);
      return false;

    }
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch('http://localhost:5050/add-product', {
      method: 'post',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

      },
    });

    result = await result.json();
    console.log(result);
  }

  return (
    <div className='add-product'>
      <h1>Product</h1 >
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
      <button onClick={addProduct} className='app-button'>Add Product</button>
    </div>


  )
}

export default AddProduct