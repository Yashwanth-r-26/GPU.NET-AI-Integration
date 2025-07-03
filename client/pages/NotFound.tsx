import AppLayout from "@/components/layout/AppLayout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const placeholderStyles = `
.placeholder-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
}

.placeholder-content {
  text-align: center;
}

.placeholder-title {
  font-size: 24px;
  font-weight: bold;
  color: #fafafa;
  margin-bottom: 16px;
}

.placeholder-text {
  color: #8b8b8b;
  font-size: 16px;
}
  .return-back{
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color:rgb(255, 89, 0);
    color: white;
  }
`;

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <>
      <style>{placeholderStyles}</style>
      <AppLayout>
        <div className="placeholder-container">
          <div className="placeholder-content">
            <h1 className="placeholder-title">404</h1>
            <p className="placeholder-text">Oops! Page not found</p>

            <a href="/" className="return-back">
              Return to Home
            </a>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
