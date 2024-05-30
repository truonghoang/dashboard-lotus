import React from "react";

import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { useFormik } from "formik";
import { loginRequest } from "../../redux/reducers/User";
import * as yup from "yup";
import cookie from "js-cookie";
import "@/styles/Login.scss";

function Login(props) {
  const validateSchema = yup.object({
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required"),
  });
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  const handleSubmit = (values) => {
    props.loginAction(values);
    // formik.resetForm()
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validateSchema,
    onSubmit: handleSubmit,
  });


  return (
    <div className="wrap-form-login">
      <p className="title-login"> Admin , Welcome back</p>
      <form className="block-1" onSubmit={formik.handleSubmit}>
        <Input
          value={formik.values.email}
          className="input-common"
          name="email"
          placeholder="Email Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email ? (
          <p className="err">{formik.errors.email}</p>
        ) : (
          ""
        )}
        <Input.Password
          value={formik.values.password}
          className="input-common"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password ? (
          <p className="err">{formik.errors.password}</p>
        ) : (
          ""
        )}
        <button className="btn-summit" type="submit">
          Sign In DashBoard
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    token: state.UserReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (data) => {
      dispatch(loginRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
