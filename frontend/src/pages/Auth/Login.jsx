import { useState } from "react";
import { handleEmailLogin, handleGoogleLogin } from "../../scripts/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => handleGoogleLogin(navigate)}>Login with Google</button>

      <form
        onSubmit={(e) => {
          handleEmailLogin(e, email, password, navigate);
        }}
      >
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login with Email</button>
      </form>
    </div>
  );
}

export default Login;
