import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { updateCategory, getCategory, } from '../../../functions/category';
import '../../../styles/adminDark.css'
import '../../../styles/catCreate.css'
import Spinner from '../../../components/spinner/Spinner'
import { useNavigate,  useParams } from "react-router-dom";

const CategoryUpdate = ({theme}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  let {slug} = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    loadCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const loadCategory = () => getCategory(slug).then((category) => setName(slug));
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, {name}, user?.token)
    .then((res) => {
      setLoading(false)
      setName('')
      toast.success(`Awesome! ${name} Category was updated!`);
      navigate('/admin/category/')
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
          {loading ? <Spinner /> : <h4 className={theme === "dark" ? 'text-white' : 'text-black'}>Update Category</h4>}
          <form onSubmit={handleSubmit}>
            <label>Category Name</label>
            <input type="text" className="mt-1 form-control" value={name} onChange={e => setName(e.target.value)} autoFocus required />
            <button className="btn btn-outline-green">Update</button>
          </form>
          <hr />
        </div>
      </div>
    </div>
  ) 
};

export default CategoryUpdate;