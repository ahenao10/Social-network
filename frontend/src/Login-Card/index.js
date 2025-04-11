import { useRef, useContext } from 'react';
import { AuthContext } from '../Context';

function LoginCard() {

    const { URLAPI } = useContext(AuthContext);

    const form = useRef(null);

    const handleSubmit = (e) => {

        e.preventDefault();
        const formData = new FormData(form.current);
        const data = Object.fromEntries(formData.entries());

        fetch(`${URLAPI}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Network response was not ok');
            }
        })
            .then(text => console.log(text)).catch(error => console.error('Error:', error));

    }

    return (
        <div className="login-container">

            <div className="header">
                <h1>Nylo App</h1>
                <h2>Connect with friends and the world around you</h2>
            </div>

            <div className="login-card">

                <div className="login-card-header">
                    <h2>Login to yur account</h2>
                    <p>Enter your credentials to access your account</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit} ref={form}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input name='username' type="text" id="username" placeholder="Enter your username" required />
                    </div>

                    <div className="input-group">
                        <div className="password-group">
                            <label htmlFor="password">Password</label>
                            <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
                        </div>
                        <input name='password' type="password" id="password" placeholder="Enter your password" required />
                    </div>

                    <input type="checkbox" id="remember-me" />
                    <label htmlFor="remember-me">Remember me</label>
                    <button type="submit">Login</button>

                </form>

                <p>Or continue with</p>
                <div className="social-login">
                    <button className="google-button">Google</button>
                    <button className="facebook-button">Facebook</button>
                </div>
                <p className="register-link">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
            <div className="footer">
                <p>&copy; 2023 Nylo App. All rights reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
            </div>
        </div>
    );
}

export default LoginCard;