import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";

function LoginPage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  const handleLogin = () => {
    if (name.trim()) {
      dispatch(login({ name }));
      setName("");
    } else {
      alert("Please enter your name");
    }
  };

  return (
    <>
      <h1 className="mb-8 text-3xl font-bold">Welcome</h1>

      {!isAuthenticated && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="p-2 mb-2 border rounded"
          />
          <button
            onClick={handleLogin}
            className="p-2 text-white bg-green-500 rounded"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
}

export default LoginPage;
