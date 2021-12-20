import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import '../../../styles/adminDark.css'
import Spinner from '../../../components/spinner/Spinner'

const CategoryCreate = ({theme}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories()
  }, [])
  
  const loadCategories = () => getCategories().then((category) => setCategories(category?.data));
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({name}, user.token)
    .then((res) => {
      setLoading(false)
      setName('')
      toast.success(`Awesome! ${name} Category was created !`);
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
      toast.error(err)
    })
  }

  return user?.role === "admin" && (
    <div className={theme === "dark" ? "adminDash container-fluid" : "container-fluid"}>
      <div className="row">
        <div className="col-md-2">
          <AdminNav theme={theme}/>
        </div>
        <div className="col">
          {loading ? <Spinner /> : <h4 className={theme === "dark" ? 'text-white' : 'text-black'}>Create Category</h4>}
          <form onSubmit={handleSubmit}>
            <label>Category Name</label>
            <input type="text" className="mt-1 form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Name" autoFocus required />
            <button className="btn btn-outline-green" onClick={handleSubmit}>Save</button>
          </form>
          <hr />
          {categories.map((c) => (
          <div className="alert alert-primary" key={c._id}>
            {c.name}
          </div>
          ))}
        </div>
      </div>
    </div>
  ) 
};

export default CategoryCreate;