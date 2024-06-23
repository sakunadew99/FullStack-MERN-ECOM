import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {

    const [image, setImage] = useState(null);

    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        old_price: '',
        new_price: '',
        category: 'women'
    });

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const Add_Product = async () => {
        try {
            console.log(productDetails);
            let responseData;
            let product = productDetails;

            let formData = new FormData();
            if (image) {
                formData.append('product', image);

                const uploadResponse = await fetch('http://localhost:4000/upload', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json'
                    },
                    body: formData
                });

                responseData = await uploadResponse.json();

                if (!responseData.success) {
                    throw new Error('Image upload failed');
                }

                product.image = responseData.image_url;
            }

            const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            const addProductData = await addProductResponse.json();

            console.log(addProductData);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className='add-product'>
            <div className='addproduct-itemfields'>
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className='addproduct-price'>
                <div className='addproduct-itemfields'>
                    <p>Old Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className='addproduct-itemfields'>
                    <p>New Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className='addproduct-itemfield'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className='addproduct-itemfield'>
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={handleImage} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct-btn'> ADD</button>
        </div>
    );
}

export default AddProduct;
