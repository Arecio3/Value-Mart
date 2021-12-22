import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { createSub, getSub, removeSub, getSubs } from '../../../functions/sub';
import { getCategories } from '../../../functions/category';
import '../../../styles/adminDark.css'
import '../../../styles/catCreate.css'
import '../../../styles/sub.css'
import { AiOutlineEdit } from 'react-icons/ai'
import Spinner from '../../../components/spinner/Spinner'
import { Link } from "react-router-dom";
import { MdDelete } from 'react-icons/md'
import SearchForm from "../../../components/forms/SearchForm";

const SubCreate = ({theme}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [subs, setSubs] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories()
    loadSubs()
  }, [])
  
  const loadCategories = () => getCategories().then((category) => setCategories(category?.data));
  const loadSubs = () => getSubs().then((sub) => setSubs(sub?.data));
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({name, parent: category}, user.token)
    .then((res) => {
      setLoading(false)
      setName('')
      toast.success(`Awesome! ${name} Sub-Category was created.`);
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
      toast.error(err.message)
    })
  }

  const handleRemove = async(slug) => {
    // let answer = toast.warning(
    // <>You are about to delete the {slug.charAt(0).toUpperCase() + slug.slice(1)} Category, do you wish to continue?<button onClick={setDeleteCat(true)} className="btn btn-sm btn-info">Confirm</button></>
    // ,{ autoClose: false,})

    if (window.confirm(`You are about to delete ${slug.charAt(0).toUpperCase() + slug.slice(1)}. Do you wish to continue?`)) {
      setLoading(true)
      removeSub(slug, user.token)
      .then((res) => {
        setLoading(false)
        toast.error(`${slug.charAt(0).toUpperCase() + slug.slice(1)} was deleted!`)
      })
      .catch(err => {
        setLoading(false)
        toast.error(err)
      })
    } 
  }

  const searched = (search) => (category) => category.name.toLowerCase().includes(search)


  return user?.role === "admin" && (
    <div className={theme === "dark" ? "adminDash container-fluid" : "container-fluid"}>
      <div className="row">
        <div className="col-md-2">
          <AdminNav theme={theme}/>
        </div>
        <div className="col">
          {loading ? <Spinner /> : <h4 className={theme === "dark" ? 'text-white mt-3' : 'text-black mt-3'}>Create new Sub-Category</h4>}
        
            <div className="form-group">
                <label className="text-warning p-1">Primary Category</label>
                <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                    <option>Please Select</option>
                    {categories.length > 0 && categories.map((category) => (<option key={category._id} value={category._id}>{category.name}</option>))}
                </select>
            </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <label className="text-white-50 p-1 mt-3">Sub-Category Name</label>
            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Name" autoFocus required />
            <button className="btn btn-outline-green mt-3" onClick={handleSubmit}>Create {name}</button>
          </form>

          <h4 className={theme === "dark" ? 'text-white mt-4' : 'text-black mt-2'}>Search Category</h4>
          <SearchForm search={search} setSearch={setSearch}/>
          <hr />
          {subs.filter(searched(search)).map((sub) => (
          <div className="alert alert-primary catContainer" key={sub._id}>
            {sub.name} <span className="btn btn-sm deleteBtn" onClick={() => handleRemove(sub.slug)}>
              <MdDelete className="text-danger"/>
              </span> 
            <Link className="btn btn-sm editBtn" to={`/admin/sub/${sub.slug}`}>
              <AiOutlineEdit className="text-info"/>
              </Link>
          </div>
          ))}
        </div>
      </div>
    </div>
  ) 
};
export default SubCreate;
