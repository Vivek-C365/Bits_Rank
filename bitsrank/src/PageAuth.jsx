import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import { useSelector } from "react-redux";

function PageAuth({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Fetch accessToken from Redux store
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        if (accessToken) {
            setIsAuthenticated(true);

            // Redirect users who are logged in away from public pages
            if (location.pathname === '/' || location.pathname === '/Login' || location.pathname === '/SignUp') {
                navigate('/dashboard', { replace: true });
            }
        } else {
            // If no token is present, the user is unauthenticated
            setIsAuthenticated(false);

            // Optionally, you can redirect to the login page if required
            // navigate('/Login', { replace: true });
        }
    }, [accessToken, location, setIsAuthenticated, navigate]);

    return null; // This component only manages redirection based on authentication
}

// PropTypes validation for PageAuth
PageAuth.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired // Validate that setIsAuthenticated is a function and required
};

export default PageAuth;