import { useRef } from 'react';

function SignUpCard() {

  const form = useRef(null);

  const handleSubmit = (e) => {

    e.preventDefault();
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    fetch('http://127.0.0.1:5000/user/sing-up', {
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
          <h2>Sign Up to start use Nylo</h2>
          <p>Enter your data to create your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} ref={form}>

          <div className='input-group'>
            <label htmlFor="name">Name</label>
            <input name='name' type="text" id="name" placeholder="Enter your name" required />
          </div>

          <div className='input-group'>
            <label htmlFor="lastname">Lastname</label>
            <input name='lastname' type="text" id="lastname" placeholder="Enter your lastname" required />
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input name='username' type="text" id="username" placeholder="Enter your username" required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input name='email' type="email" id="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input name='password' type="password" id="password" placeholder="Enter your password" required />
          </div>

          <button type="submit">Sign Up</button>

        </form>

        <p>Or continue with</p>

        <div className="social-login">
          <button className="google-button">Google</button>
          <button className="facebook-button">Facebook</button>
        </div>

        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>

      </div>
      <div className="footer">
        <p>&copy; 2025 Nylo App. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </div>
    </div>
  );
}

export default SignUpCard;