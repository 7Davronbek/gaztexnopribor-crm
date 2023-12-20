import {useState} from "react";
import openEye from "@/assets/opneEye.svg";
import closeEye from "@/assets/closeEye.svg";
import axios from "axios";
import {API_PATH} from "@/constants/index.js";
import {toast} from "react-toastify";

const AddUserPage = () => {
    const [isPassword, setIsPassword] = useState(true);
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("receiver");
    const [isLoading, setIsLoading] = useState(false)
    const addUser = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        await axios.post(API_PATH + "/user/register/", {
            username,
            password,
            role,
            full_name: fullName,
            is_active: true
        })
            .then(() => {
                toast.success("User registered successfully.")
                setUsername("")
                setPassword("")
                setFullName("")
                setRole("receiver")
                setIsLoading(false)
            })
            .catch(() => {
                toast.error("Username is already exist. Network error")
                setIsLoading(false)
            })

    }

    return (
        <div className="AddUserPage RightStyle ">
            <div className="row">
                <form onSubmit={addUser} className="col-lg-6 mx-auto">

                    <h1 className="text-center mb-5">Добавить пользователя</h1>
                    <div className="cards">

                        <label className="mb-2" htmlFor="full_name">Full name*</label>
                        <input value={fullName} onChange={e => setFullName(e.target.value)} required id="full_name"
                               className='form-control mb-3' type="text"/>

                        <label className="mb-2" htmlFor="username">Username*</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} required id="username"
                               className='form-control mb-3' type="text"/>

                        <label className="mb-2" htmlFor="password">Password*</label>

                        <div className="inputWrap mb-3">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type={isPassword ? "password" : "text"}
                                id="password"
                                className="form-control"
                            />
                            {isPassword ? (
                                <div
                                    onClick={() => setIsPassword(false)}
                                    className="openEye eye"
                                >
                                    <img src={openEye} alt=""/>
                                </div>
                            ) : (
                                <div
                                    onClick={() => setIsPassword(true)}
                                    className="closeEye eye"
                                >
                                    <img src={closeEye} alt=""/>
                                </div>
                            )}
                        </div>

                        <label className="mb-2" htmlFor="role">Role</label>
                        <select defaultValue="receiver" onChange={e => setRole(e.target.value)} id="role"
                                className="form-control">
                            <option value="receiver">Принимающий</option>
                            <option value="specialist">Специалист</option>
                            <option value="accountant">Бухгалтер</option>
                            <option value="client">Client</option>
                            <option value="uz_standard">Uz Standard</option>
                            <option value="inspector_1">Inspector 1</option>
                            <option value="inspector_2">Inspector 2</option>
                            <option value="sten">в стенд</option>
                        </select>

                        <button disabled={isLoading} type={"submit"}
                                className="btn myBtn d-block mt-4 ms-auto">{isLoading && (
                            <i className="spinner-border spinner-border-sm text-white text-dark me-2"></i>
                        )}
                            Create user
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default AddUserPage