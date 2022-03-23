import { useContext, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { RTLContext } from "./App";

import { logout } from "./store";
import { useAppDispatch } from "./store/hooks";
import { useAppSelector } from "./store/hooks";

const AppTopbar = (props: any) => {
  const isRTL = useContext(RTLContext);
  const history = useHistory();
  const session = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="layout-topbar shadow-4">
      <div className="layout-topbar-left">
        <button
          type="button"
          style={{ cursor: "pointer" }}
          className="layout-topbar-logo p-link"
          onClick={() => history.push("/")}
        >
          <img
            id="app-logo"
            src="assets/demo/images/dotnetworks_dark3.001.png"
            alt=""
            style={{ height: "4rem" }}
          />
        </button>
        <button
          type="button"
          className="layout-menu-button shadow-6 p-link"
          onClick={props.onMenuButtonClick}
        >
          <i className="pi pi-chevron-right"></i>
        </button>
        <button type="button" className="layout-topbar-mobile-button p-link">
          <i
            className="pi pi-ellipsis-v fs-large"
            onClick={props.onMobileTopbarButtonClick}
          ></i>
        </button>
      </div>

      <div
        className={classNames("layout-topbar-right", {
          "layout-topbar-mobile-active": props.mobileTopbarActive,
        })}
      >
        <div className="layout-topbar-actions-left">
          <h1>Teachers' Sharing Platform</h1>
        </div>
        <div className="layout-topbar-actions-right">
          <ul className="layout-topbar-items">
            <li className="layout-topbar-item">
              <button
                className="layout-topbar-action flex flex-row justify-content-center align-items-center px-2 rounded-circle p-link"
                onClick={(event) =>
                  props.onTopbarItemClick({
                    originalEvent: event,
                    item: "profile",
                  })
                }
              >
                <img
                  src={session.photo}
                  alt="avatar"
                  style={{ width: "32px", height: "32px" }}
                />
              </button>

              <CSSTransition
                classNames="p-toggleable"
                timeout={{ enter: 1000, exit: 450 }}
                in={props.activeTopbarItem === "profile"}
                unmountOnExit
              >
                <ul className="layout-topbar-action-panel shadow-6">
                  <li className="layout-topbar-action-item">
                    <button className="flex flex-row align-items-center p-link">
                      <i
                        className={classNames("pi pi-cog", {
                          "mr-2": !isRTL,
                          "ml-2": isRTL,
                        })}
                      ></i>
                      <span>Settings</span>
                    </button>
                  </li>
                  <li
                    className="layout-topbar-action-item"
                    onClick={logoutHandler}
                  >
                    <button className="flex flex-row align-items-center p-link">
                      <i
                        className={classNames("pi pi-power-off", {
                          "mr-2": !isRTL,
                          "ml-2": isRTL,
                        })}
                      ></i>
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </CSSTransition>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppTopbar;
