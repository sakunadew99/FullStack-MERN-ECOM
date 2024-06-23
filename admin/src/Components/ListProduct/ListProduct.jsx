import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
    const [allproducts, setProducts] = useState([]);

    const fetchInfo = async () => {
        try {
            const res = await fetch('http://localhost:4000/allproducts');
            const data = await res.json();
            setProducts(data.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        try {
            const res = await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (data.success) {
                setProducts(allproducts.filter(product => product.id !== id));
            } else {
                console.error("Error removing product:", data.message);
            }
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    return (
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className='listproduct-format-main'>
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>

            <div className='listproduct-allproduct'>
                <hr />
                {allproducts.map((product, index) => (
                    <div key={index} className='listproduct-format-main listproduct-format'>
                        <img src={product.image} alt="" />
                        <p>{product.name}</p>
                        <p>{product.old_price}</p>
                        <p>{product.new_price}</p>
                        <p>{product.category}</p>
                        <img
                            src={cross_icon}
                            className='listproduct-remove-icon'
                            alt="Remove"
                            onClick={() => removeProduct(product.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProduct;
