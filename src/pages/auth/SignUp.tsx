import axios from "axios";
import { useRef, type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Image } from "react-bootstrap";
import type { TitleData } from "../../types/Title";
import FormTitle from "../../components/FormTitle/FormTitle";
import type { AuthError } from "../../types/AuthError";
import BtnCustom from "../../components/BtnCustom/BtnCustom";
import InputFiledCustom from "../../components/InputFiledCustom/InputFiledCustom";
import ImageUploadBox from "../../components/ImageUploadBox/ImageUploadBox";
import AuthSwitcher from "../../components/AuthSwitcher/AuthSwitcher";
import type { ToastData } from "../../types/ToastData";
import AppToast from "../../components/ToastCustom/ToastCustom";

const SignUp = () => {
  const first_name = useRef<HTMLInputElement>(null);
  const last_name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password_confirmation = useRef<HTMLInputElement>(null);
  const profile_image = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<AuthError>();

  const navigate = useNavigate();
  const [toast, setToast] = useState<ToastData>({
    show: false,
    type: 'success',
    message: '',
  });
  const SignUpTitle: TitleData = {
    title: "SIGN UP",
    desc: "Fill in the following fields to create an account.",
  };

  const SignUpInputData = [
    [
      {
        controlId: "firstName",
        label: "Name",
        placeholder: "First Name",
        type: "text",
        ref: first_name,
        classes: "pb-xxl-3 pb-xl-2 pb-1 pt-lg-4 pt-3",
        errorKey: "first_name",
      },
      {
        controlId: "lastName",
        label: <>&nbsp;</>,
        placeholder: "Last Name",
        type: "text",
        ref: last_name,
        classes: "",
        errorKey: "last_name",
      },
    ],
    [
      {
        controlId: "email",
        label: "Email",
        placeholder: "Enter your email",
        type: "email",
        ref: email,
        classes: "pb-xxl-3 pb-xl-2 pb-1 ",
        errorKey: "email",
      },
    ],
    [
      {
        controlId: "password",
        type: "password",
        placeholder: "Enter password",
        ref: password,
        label: "Password",
        classes: "pb-xxl-3 pb-xl-2 pb-1 ",
        errorKey: "password",
      },
      {
        controlId: "confirmpassword",
        type: "password",
        placeholder: "Re-enter your password",
        ref: password_confirmation,
        label: <>&nbsp;</>,
        classes: "",
        errorKey: "password_confirmation",
      },
    ],
  ];

  const signup = async (event: FormEvent) => {
    event.preventDefault();
    axios.post(
        "https://web-production-3ca4c.up.railway.app/api/register",
        {
          first_name: first_name.current?.value,
          last_name: last_name.current?.value,
          user_name: first_name.current?.value + "_" + last_name.current?.value,
          email: email.current?.value,
          password: password.current?.value,
          password_confirmation: password_confirmation.current?.value,
          profile_image: profile_image.current?.files?.[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userName", res.data.data.user.user_name);
        localStorage.setItem("userImage", res.data.data.user.profile_image_url);
        setToast({
          show: true,
          type: 'success',
          message: 'create account successful!'
        });
        setTimeout(() => {
          setToast(prev => ({ ...prev, show: false }));
          navigate("/home");
      }, 1500);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <Form onSubmit={signup} className="px-xxl-5 px-xl-4 px-3 pt-xl-5 pt-3 pb-xxl-4 pb-xl-3 pb-2 ">
      <Row className="pb-xxl-5 pb-xl-3 pb-2 d-flex justify-content-center">
        <Image
          className="company-logo"
          src="/Task5/Images/SignUp/Logo.svg"
          alt="FocalX Logo"
          width={150}
          height={40}
        />
      </Row>
      <FormTitle data={SignUpTitle} />

      {/* Fields Input */}
      {SignUpInputData.map((row, rowIndex) => (
        <Row key={rowIndex} className={row[0]?.classes || ""}>
          {row.map((field, fieldIndex) => {
            const colSize = row.length === 1 ? 12 : 6;
            return (
              <Col xs={12} md={colSize} key={fieldIndex}>
                <InputFiledCustom
                  controlId={field.controlId}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  ref={field.ref}
                  classExtraLabel={"fs-14"}
                >
                  {errors?.[field.errorKey as keyof AuthError] && (
                    <p className="text-danger mb-0 fs-14">
                      {errors?.[field.errorKey as keyof AuthError]?.[0]}
                    </p>
                  )}
                </InputFiledCustom>
              </Col>
            );
          })}
        </Row>
      ))}

      {/* Profile Image */}
      <Row className="p-lg-2 pb-1 ">
        <Col>
          <Form.Group controlId="profileImage">
            <Form.Label className="fw-medium lh-1 ls-normal fs-14 text-grey">
              Profile Image
            </Form.Label>
            <ImageUploadBox ref={profile_image} />
            {errors?.profile_image && (
              <p className="text-danger mb-0 fs-14">
                {errors.profile_image[0]}
              </p>
            )}
          </Form.Group>
        </Col>
      </Row>

      {/* Submit Button */}
      <Row className="pb-xxl-2 pb-1">
        <Col>
          <BtnCustom
            name={"SIGN UP"}
            classExtra="p-md-3 p-1 fs-14 w-100"
            size="lg"
            type="submit"
          />
        </Col>
      </Row>

      {/* Already Have an Account */}
      <AuthSwitcher
        message=" Do you have an account?"
        pageName="Sign in"
        pageLink="/"
      />
      {toast.type && <AppToast data={toast} />}
    </Form>
  );
};

export default SignUp;
