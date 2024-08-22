// Import necessary modules and components
import { Link } from 'react-router-dom'; // Import Link component for navigation between routes
import styles from './styles.modules.css' // Import CSS module for styling
import { useState } from 'react'; // Import useState hook for managing component state
import axios from 'axios'; // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Add this import


// Define the SignUp component
const SignUp = () => {
    // Define state variables for form data and error messages
    const [data, setData] = useState({
        firstName: "", // Store the user's first name
        lastName: "",  // Store the user's last name
        email: "",     // Store the user's email
        password: ""   // Store the user's password
    });

    const [error, setError] = useState(""); // Store any error messages

    // Get the navigate function from useNavigate (This should be imported at the top)
    const navigate = useNavigate(); // Initialize the navigate function for programmatic navigation

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
            const url = "http://localhost:8080/api/users";

            // Send a POST request to the server with the form data
            const { data: res } = await axios.post(url, data);

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
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type='button' className={styles.white_btn}>
                            Sign in 
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input type="text"
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />
                        <input type="text"
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />
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
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Export the SignUp component as the default export
export default SignUp;
