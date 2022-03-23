import { CSSTransition } from "react-transition-group";
import { classNames } from "primereact/utils";
import { useContext } from "react";
import { RTLContext } from "./App";
import { Tooltip } from "primereact/tooltip";

import { useAppDispatch } from "./store/hooks";
import { useAppSelector } from "./store/hooks";
import { logout } from "./store";

const AppInlineMenu = (props: any) => {
  const isRTL = useContext(RTLContext);
  const menuKey = props.menuKey || "inline-menu";
  const session = useAppSelector((state) => state.session);
  const dispatch = useAppDispatch();

  const inlineMenuClassName = classNames(
    "layout-inline-menu",
    {
      "layout-inline-menu-active": props.inlineMenuActive[props.menuKey],
    },
    props.className
  );

  const isSlim = () => {
    return props.menuMode === "slim";
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={inlineMenuClassName} style={props.style}>
      {isSlim() && <Tooltip target=".avatarTooltip" />}

      <button
        data-pr-tooltip={session.fullName}
        className={classNames(
          "avatarTooltip layout-inline-menu-action p-link flex flex-row align-items-center",
          { "p-3 lg:p-1 py-3": props.horizontal, "p-3": !props.horizontal }
        )}
        onClick={(e) => props.onInlineMenuClick(e, menuKey)}
      >
        <img
          src={session.photo}
          alt="avatar"
          style={{ width: "32px", height: "32px" }}
        />
        <span
          className={classNames("flex flex-column", {
            "ml-2": !isRTL,
            "mr-2": isRTL,
          })}
        >
          <span className="font-bold">{session.fullName}</span>
          <small>{session.title}</small>
        </span>
        <i
          className={classNames("layout-inline-menu-icon pi pi-angle-down", {
            "ml-auto": !isRTL,
            "mr-auto": isRTL,
          })}
        ></i>
      </button>

      <CSSTransition
        classNames="p-toggleable-content"
        timeout={{ enter: 1000, exit: 450 }}
        in={props.inlineMenuActive[menuKey]}
        unmountOnExit
      >
        <>
          <ul className="layout-inline-menu-action-panel">
            <li
              className="layout-inline-menu-action-item tooltip"
              data-pr-tooltip="Settings"
            >
              <button className="flex flex-row align-items-center p-link">
                <i className="pi pi-cog pi-fw"></i>
                <span>Settings</span>
              </button>
            </li>

            <li
              className="layout-inline-menu-action-item tooltip"
              data-pr-tooltip="Logout"
              onClick={logoutHandler}
            >
              <button className="flex flex-row align-items-center p-link">
                <i className="pi pi-power-off pi-fw"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
          {isSlim() && <Tooltip target=".tooltip" />}
        </>
      </CSSTransition>
    </div>
  );
};

export default AppInlineMenu;
