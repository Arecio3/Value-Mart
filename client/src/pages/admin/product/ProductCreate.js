import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from '../../../functions/category';
import {
  createProduct
} from "../../../functions/product";
import "../../../styles/adminDark.css";
import "../../../styles/catCreate.css";
// import Spinner from "../../../components/spinner/Spinner";
// import { Tooltip } from "antd";

const initialState = { 
    title: 'Macbook Pro M1 Max',
    description: '16 inch screen. OLED display, 16GB of RAM and 32 cores of GPU',
    price: '3500',
    categories: [],
    category: '',
    subs: [],
    shipping: 'No',
    quantity: '10',
    images: [],
    colors: ["Black", "Gold", "Silver", "White", "Blue", "None" ],
    brands: ["Apple", "Microsoft", "Samsung", "Android", "Hollister", "None" ],
    color: 'Black',
    conditions : ["Very Used", "Barely Used", "New Open Box", "Refurbished", "Brand New"],
    brand: 'None',
    condition: 'Brand New'
}

const ProductCreate = ({theme}) => {
    const [values, setValues] = useState(initialState);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
      loadCategories();
    }, []);
  

    // destructure values from state
    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        condition,
        conditions,
        images,
        colors,
        brands,
        color,
        brand,
      } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
        .then((res)=> {
            toast.success(`${title} was created !`)
            window.location.reload();
        })
        .catch(err => {
            toast.error(err.response.data.err)
        })
    }
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value })
        // console.log(e.target.name)
    }

      const loadCategories = () => getCategories().then((category) => setValues({...values, categories: category?.data}));


  return user?.role === "admin" && (
      <div className={ theme === "dark" ? "adminDash container-fluid" : "container-fluid"}>
        <div className="row">
          <div className="col-md-2">
            <AdminNav theme={theme} />
          </div>
          <div className="col-md-10">
              <h3 className={theme === "dark" ? "text-white" : "text-black"}>Create Product Form</h3>
              <hr />
              <form onSubmit={handleSubmit}>
                  {/* Title */}
                <div className="form-group">
                <label className="p-1" style={{fontSize: '14px'}}>Title</label>
                <input type="text" name="title" className="form-control" value={title} onChange={handleChange}/>
                </div>
                {/* Description */}
                <div className="form-group">
                <label className="p-1" style={{fontSize: '14px'}}>Description <small className="text-white-50"> sell this so we can get rich biotch</small></label>
                <textarea type="text" name="description" className="form-control" value={description} onChange={handleChange}/>
                </div>
                {/* Price */}
                <div className="form-group">
                <label className="p-1" style={{fontSize: '14px'}}>Price </label>
                <input type="number" name="price" className="form-control" value={price} onChange={handleChange}/>
                </div>
                {/* Shipping */}
                <div className="form-group">
                <label className="p-1" style={{fontSize: '14px'}}>Shipping Status</label>
                <select name="shipping" className="form-control" onChange={handleChange}>
                    <option>Please Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
                </div>
                {/* Quantity */}
                <div className="form-group">
                <label className="p-1" style={{fontSize: '14px'}}>Quantity</label>
                <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange}/>
                </div>
                {/* Color */}
                <div className="form-group">
                <label className="p-1" style={{fontSize: '14px'}}>Color</label>
                <select name="color" className="form-control" onChange={handleChange}>
                    {colors.map(color => <option key={color} value={color}>{color}</option>)}
                </select>
                </div>
                <div className="form-group">
                <label className="p-1" style={{fontSize: '14px'}}>Brand</label>
                <select name="brand" className="form-control" onChange={handleChange}>
                    {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                </select>
                </div>
                <div className="form-group">
                <label className="p-1" style={{fontSize: '14px'}}>Condition</label>
                <select name="condition" className="form-control" onChange={handleChange}>
                    {conditions.map(condition => <option key={condition} value={condition}>{condition}</option>)}
                </select>
                </div>
                <div className="form-group">
                <label className="text-warning p-1 fw-bold">Category</label>
                <select name="category" className="form-control" onChange={handleChange}>
                    <option>Please Select</option>
                    {categories.length > 0 && categories.map((category) => (<option key={category._id} value={category._id}>{category.name}</option>))}
                </select>
            </div>
                <button className="btn btn-outline-info">
                    Create
                </button>
              </form>
          </div>
        </div>
      </div>
  );
};

export default ProductCreate;
