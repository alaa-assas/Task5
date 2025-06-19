import axios from "axios";
import { useRef, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Image } from "react-bootstrap";
import FormTitle from "../../components/FormTitle/FormTitle";
import type { TitleData } from "../../types/Title";
import type { AuthError } from "../../types/AuthError";
import BtnCustom from "../../components/BtnCustom/BtnCustom";
import InputFiledCustom from "../../components/InputFiledCustom/InputFiledCustom";
import AuthSwitcher from '../../components/AuthSwitcher/AuthSwitcher';
import type { ToastData } from "../../types/ToastData";
import AppToast from "../../components/ToastCustom/ToastCustom";

const Login = () => {
  const [errors, setErrors] = useState<AuthError>();
  const [loading, setLoading] = useState(false);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });

  const LoginTitle: TitleData = {
    title: "Sign In",
    desc: "Enter your credentials to access your account",
  };

  const LoginInputData = [
    {
      controlId: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      ref: email,
      classes: "pb-lg-3 pb-2 pt-5",
      errorKey: "email",
    },
    {
      controlId: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
      ref: password,
      classes: "pb-lg-4 pb-3",
      errorKey: "password",
    },
  ];

  const login = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/login",
        {
          email: email.current?.value,
          password: password.current?.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userName", res.data.user.user_name);
        localStorage.setItem("userImage", res.data.user.profile_image_url);
        setToast({
          show: true,
          type: 'success',
          message: 'Log In successful!'
        });
        setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
          navigate("/home");
      }, 1500);
      })
      .catch((err) => {
        console.log(err)
        if(err.response.status == 401)
          setErrors(err.response.data)
        else
          setErrors(err.response.data.errors);
          setLoading(false);
      });
      }

  return (
    <Form onSubmit={login} className="p-lg-5 p-3">
      {/* logo company */}
      <Row className="text-center pb-xxl-5 pb-xl-3 pb-2 d-flex justify-content-center">
        <Image
          className="company-logo"
          src="/Task5/Images/SignUp/Logo.svg"
          alt="FocalX Logo"
          width={150}
          height={40}
        />
      </Row>
      {/* title of form */}
      <FormTitle data={LoginTitle} />
      {/* input fieldes  */}
      {LoginInputData.map((item, index) => (
        <Row className={item.classes} key={index}>
          <Col>
            <InputFiledCustom
              controlId={item.controlId}
              type={item.type}
              placeholder={item.placeholder}
              ref={item.ref}
              label={item.label}
              classExtraLabel="fs-14">
              {errors?.[item.errorKey as keyof AuthError] && (
                <p className="text-danger mb-0 fs-14">{errors?.[item.errorKey as keyof AuthError]?.[0]}</p>
              )}
            </InputFiledCustom>
          </Col>
        </Row>
      ))}
      {errors?.msg && <p className="text-danger mb-1 fs-14 text-center">{errors.msg}</p>}
      {/* Submit Button */}
      <Row className="pb-xxl-3 pb-xl-2 pb-1">
        <Col>
          <BtnCustom
            name={"SIGN IN"}
            classExtra="p-md-3 p-2 fs-14 w-100"
            size="lg"
            type="submit"
            disabled={loading}
          />
        </Col>
      </Row>

      {/* Already Have an Account */}
      <AuthSwitcher message="Don’t have an account?" pageName="Create one" pageLink="/signup" />
      {toast.type && <AppToast data={toast} />}
    </Form>
  );
};

export default Login;
