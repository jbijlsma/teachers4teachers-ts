import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { useAppDispatch } from "../store/hooks";
import { login } from "../store";
import { useAppSelector } from "../store/hooks";

const Login = () => {
  const toast = useRef(null);
  const dispatch = useAppDispatch();
  const sessionId = useAppSelector((state) => state.session.id);
  const loginError = useAppSelector((state) => state.session.loginError);

  const [email, setEmail] = useState("ywidjaja@mis-munich.de");
  const [password, setPassword] = useState("password");

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail((_) => event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword((_) => event.target.value);
  };

  useEffect(() => {
    if (loginError) {
      // @ts-ignore
      toast.current.show({
        severity: "error",
        summary: "Login failed",
        detail: loginError,
      });
    }
  }, [sessionId, loginError]);

  const loginHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(login({ email: email, password: password }));
  };

  return (
    <div className="pages-body login-page flex flex-column">
      <Toast ref={toast} />
      <div className="topbar p-3 flex justfiy-content-between flex-row align-items-center">
        <div className="topbar-left ml-3 flex">
          <div className="logo">
            <img
              src="assets/demo/images/dotnetworks_dark3.001.png"
              style={{ height: "4rem" }}
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="align-self-center mt-auto mb-auto">
        <div className="pages-panel card flex flex-column">
          <div className="pages-header px-3 py-1">
            <h2>LOGIN</h2>
          </div>

          <h4>Welcome</h4>

          <div className="pages-detail mb-6 px-6">
            Please sign-in to use the Teachers' Sharing Platform
          </div>

          <form onSubmit={loginHandler}>
            <div className="input-panel flex flex-column px-3">
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-envelope"></i>
                </span>
                <span className="p-float-label">
                  <InputText
                    type="text"
                    id="inputgroup1"
                    value={email}
                    onChange={emailChangeHandler}
                  />
                  <label htmlFor="inputgroup1">Email</label>
                </span>
              </div>

              <div className="p-inputgroup mt-3 mb-6">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-lock"></i>
                </span>
                <span className="p-float-label">
                  <InputText
                    type="password"
                    id="inputgroup2"
                    value={password}
                    onChange={passwordChangeHandler}
                  />
                  <label htmlFor="inputgroup2">Password</label>
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="login-button mb-6 px-3"
              label="LOGIN"
            ></Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
