
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Resources page has been split:
// - Research content → /research
// - Clinical resources → /services#resources
const Resources = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/services#resources", { replace: true });
  }, [navigate]);

  return null;
};

export default Resources;
