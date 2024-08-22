// Import necessary modules and components
import { Link } from 'react-router-dom'; // Import Link component for navigation between routes
import styles from './styles.modules.css' // Import CSS module for styling
import { useState } from 'react'; // Import useState hook for managing component state
import axios from 'axios'; // Import axios for making HTTP requests



// Define the SignUp component
const SignUp = () => {
    // Define state variables for form data and error messages
    const [data, setData] = useState({
       
        email: "",     // Store the user's email
        password: ""   // Store the user's password
    });

    const [error, setError] = useState(""); // Store any error messages

   

    // Handle changes to form inputs
    const handleChange = ({ currentTarget: input }) => {
        // Update the data state with the new value from the input field
        setData({ ...data, [input.name]: input.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Check if all fields are filled out
        if (data.firstName === "" || data.lastName === "" || data.email === "" || data.password === "") {
            setError("Please fill out all fields."); // Set error message if any field is empty
            return;
        }

        try {
            // Define the API endpoint URL
            const url = "http://localhost:8080/api/auth";

            // Send a POST request to the server with the form data
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/"
            // Navigate to the login page after successful sign-up
            navigate("/login");

            // Log the response message to the console
            console.log(res.message);
        } catch (error) {
            // Handle any errors that occur during the request
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message); // Set error message based on server response
            }
        }
    };

    // Render the sign-up form
    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login in to your account</h1>
                        
                        
                        <input type="email"
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />
                        <input type="password"
                            placeholder='Password'
                            name='password'
                            onChange={handleChange}
                            value={data.password}
                            required
                            className={styles.input}
                        />
                        {/* Display error message if it exists */}
                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                <h1>New Here? </h1>
                    <Link to="/signup">
                        <button type='button' className={styles.white_btn}>
                            Sign Up 
                        </button>
                    </Link>
                   
                </div>
            </div>
        </div>
    );
};

// Export the SignUp component as the default export
export default Login;