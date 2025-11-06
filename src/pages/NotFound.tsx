import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="mb-4 text-6xl font-serif font-bold text-primary">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! This path doesn't lead to a retreat</p>
        <a 
          href="/" 
          className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-all duration-300 hover:scale-105"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
