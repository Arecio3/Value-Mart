import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { createCategory, getCategories, removeCategory } from '../../../functions/category';
import '../../../styles/adminDark.css'
import '../../../styles/catCreate.css'
import Spinner from '../../../components/spinner/Spinner'
import { Link } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import SearchForm from "../../../components/forms/SearchForm";

const CategoryCreate = ({theme}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

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
      toast.success(`Awesome! ${name}Category was created.`);
      loadCategories();
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
      toast.error(err)
    })
  }

  const handleRemove = async(slug) => {
    // let answer = toast.warning(
    // <>You are about to delete the {slug.charAt(0).toUpperCase() + slug.slice(1)} Category, do you wish to continue?<button onClick={setDeleteCat(true)} className="btn btn-sm btn-info">Confirm</button></>
    // ,{ autoClose: false,})

    if (window.confirm(`You are about to delete ${slug.charAt(0).toUpperCase() + slug.slice(1)}. Do you wish to continue?`)) {
      setLoading(true)
      removeCategory(slug, user.token)
      .then((res) => {
        setLoading(false)
        toast.error(`${slug.charAt(0).toUpperCase() + slug.slice(1)} was deleted!`)
        loadCategories();
      })
      .catch(err => {
        setLoading(false)
        toast.error(err)
      })
    } 
    // console.log(answer, slug)
  }

  const searched = (search) => (category) => category.name.toLowerCase().includes(search)


  return user?.role === "admin" && (
    <div className={theme === "dark" ? "adminDash container-fluid" : "container-fluid"}>
      <div className="row">
        <div className="col-md-2">
          <AdminNav theme={theme}/>
        </div>
        <div className="col">
          {loading ? <Spinner /> : <h4 className={theme === "dark" ? 'text-white mt-3' : 'text-black mt-3'}>Create Category</h4>}
          <form onSubmit={handleSubmit}>
            <label className="text-white-50">Category Name</label>
            <input type="text" className="mt-1 form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Name" autoFocus required />
            <button className="btn btn-outline-green" onClick={handleSubmit}>Create {name}</button>
          </form>
          <h4 className={theme === "dark" ? 'text-white mt-2' : 'text-black mt-2'}>Search Category</h4>
          <SearchForm search={search} setSearch={setSearch}/>
          <hr />
          {categories.filter(searched(search)).map((c) => (
          <div className="alert alert-primary catContainer" key={c._id}>
            {c.name} <span className="btn btn-sm deleteBtn" onClick={() => handleRemove(c.slug)}>
              <MdDelete className="text-danger"/>
              </span> 
            <Link className="btn btn-sm editBtn" to={`/admin/category/${c.slug}`}>
              <AiOutlineEdit className="text-info"/>
              </Link>
          </div>
          ))}
        </div>
      </div>
    </div>
  ) 
};

export default CategoryCreate;