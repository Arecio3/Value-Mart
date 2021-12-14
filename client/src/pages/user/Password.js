import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import LoadingToRedirect from "../../components/routes/LoadingToRedirect";
import Spinner from "../../components/spinner/Spinner";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import '../../styles/password.css';

const Password = ({theme}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();
     setLoading(true)
      await auth.currentUser.updatePassword(password)
      .then(() => {
        setLoading(false)
        setPassword("")
        toast.success(`Password was updated!`)
      })
      .catch(err => {
        setLoading(false)
        toast.error(err.message)
      })
  }

  return user && user.token ? (
    <div className={theme === "light" ? "container-fluid"  : "password-update container-fluid"}>
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ?
          <>
          <h4 className="text-success">Updating</h4>
          <Spinner />
          </> 
          :
           <h4 className={theme === "light" ? "text-black" : "text-white"}>Update Password</h4>}
          <form onSubmit={handleSubmit}>
            <div className="form-group ">
              <label className="password-title">Your Password</label>
              <input 
              type="password" 
              onChange={e => setPassword(e.target.value)} 
              className="form-control mt-2" 
              placeholder="Enter your new password"
              disabled={loading}
              value={password}
              />
              <button className="btn btn-primary mt-3" disabled={!password || password.length < 6 || loading }>Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <>
      <Spinner /> <LoadingToRedirect />
    </>
  );
};

export default Password;
