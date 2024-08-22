// Import necessary modules and components
import { Link } from 'react-router-dom';
import './styles.css'; // Import regular CSS file
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Configure axios
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Define the SignUp component
const SignUp = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log the data being sent to the backend
         console.log("Form Data:", data);

        if (Object.values(data).some(field => field === "")) {
            setError("Please fill out all fields.");
            return;
        }

        try {
            const response = await axios.post("/api/users/register", data);
            console.log("Response:", response.data);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form-container">
                <div className="left">
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type='button' className="white-btn">
                            Sign in 
                        </button>
                    </Link>
                </div>
                <div className="right">
                    <form className="form-container" onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type="text"
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className="input"
                        />
                        <input type="text"
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className="input"
                        />
                        <input type="email"
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="input"
                        />
                        <input type="password"
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="input"
                        />
                        {error && <div className="error-msg">{error}</div>}
                        <button type='submit' className="green-btn">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;