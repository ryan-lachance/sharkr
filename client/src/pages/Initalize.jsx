import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//component

function Initalize() {
  const API = import.meta.env.VITE_API_PATH;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/auth/status`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuthenticated) {
          navigate("/dashboard");
        } else [navigate("/home")];
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return <></>;
}

export default Initalize;
