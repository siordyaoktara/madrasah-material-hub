
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary-900 mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">The page you are looking for could not be found</p>
        <Button 
          className="material-button material-button-primary"
          onClick={() => navigate("/")}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
