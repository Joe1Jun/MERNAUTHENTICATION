import './styles.css';

const Main = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="main-container">
            <nav className="navbar">
                <h1>fakebook</h1>
                <button className="white-btn" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Main;
