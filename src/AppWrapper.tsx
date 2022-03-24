import { useEffect } from "react";
import { Route, withRouter, useLocation, useHistory } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Access from "./pages/Access";
import Landing from "./pages/Landing";

import { useAppSelector, useAppDispatch } from "./store/hooks";
import { init } from "./store";

const AppWrapper = (props: any) => {
  const location = useLocation();
  const history = useHistory();
  const isLoggedIn = useAppSelector((state) => state.session.isLoggedIn);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  useEffect(() => {
    dispatch(init());
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/login");
    } else {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  switch (props.location.pathname) {
    case "/login":
      return <Route path="/login" component={Login} />;
    case "/error":
      return <Route path="/error" component={Error} />;
    case "/notfound":
      return <Route path="/notfound" component={NotFound} />;
    case "/access":
      return <Route path="/access" component={Access} />;
    case "/landing":
      return <Route path="/landing" component={Landing} />;
    default:
      return <App />;
  }
};

export default withRouter(AppWrapper);
