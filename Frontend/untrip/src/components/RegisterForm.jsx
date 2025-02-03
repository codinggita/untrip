const RegisterForm = () => {
    return (
      <form>
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    );
  };
  
  export default RegisterForm;
  