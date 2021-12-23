import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getSub, updateSub } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import "../../../styles/adminDark.css";
import "../../../styles/catCreate.css";
import "../../../styles/sub.css";
import Spinner from "../../../components/spinner/Spinner";
import { useParams, useNavigate } from "react-router-dom";

const SubUpdate = ({ theme }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  let navigate = useNavigate();
  let { slug } = useParams();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const loadCategories = () =>
  getCategories().then((category) => setCategories(category?.data));
  const loadSub = () =>
  getSub(slug).then((sub) => {
    setName(sub?.data.name);
    setParent(sub?.data.parent);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, user.token)
      .then((res) => {
        loadSub();
        setLoading(false);
        setName("");
        toast.success(`The ${name} Sub-Category has been created.`);
        navigate("/admin/sub");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    user?.role === "admin" && (
      <div
        className={
          theme === "dark" ? "adminDash container-fluid" : "container-fluid"
        }
      >
        <div className="row">
          <div className="col-md-2">
            <AdminNav theme={theme} />
          </div>
          <div className="col">
            {loading ? (
              <Spinner />
            ) : (
              <h4
                className={
                  theme === "dark" ? "text-white mt-3" : "text-black mt-3"
                }
              >
                Update old Sub-Category
              </h4>
            )}

            <div className="form-group">
             {parent ? <label className="text-success p-1">Primary Category</label> : <label className="text-danger p-1">Required to choose a <strong>Primary</strong> Category</label>}
              <select
                name="category"
                className="form-control"
                onChange={(e) => setParent(e.target.value)}
              >
                <option>Please Select</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                      selected={category._id === parent}
                    >
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <label className="text-white-50 p-1 mt-3">
                Sub-Category Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                placeholder={slug}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
              <button
                className="btn btn-outline-green mt-3"
                onClick={handleSubmit}
              >
                Create {name}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
export default SubUpdate;
