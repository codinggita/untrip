const LoginForm = () => {
    return (
      <form>
        <h2>Login</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    );
  };
  
  export default LoginForm;
  