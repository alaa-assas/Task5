import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import './Auth.css'

const Auth = () => {
  return (
    <div className="form-auth min-vh-100 d-flex justify-content-center align-items-center">
      <Container className="form-auth-container bg-white rounded-4 p-0 mx-lg-0 mx-3">
        <Outlet />
      </Container>
    </div>
  );
};

export default Auth;
