import React, { memo } from "react";
import classes from "./index.module.scss";
import { NavLink } from "react-router-dom";

type TProps = {
  label: string;
  link: string;
  Icon?: React.ComponentType<{ color?: string }>;
  active?: boolean;
  showSideBar?: false;
  onClick?: () => void;
};
const sideBarButton = (props: TProps) => {
  const { Icon, active, showSideBar = true } = props;
  return (
    <div className={classes.container}>
      {showSideBar && (
        <div className={active ? classes.hiddenButton : ""}></div>
      )}
      <NavLink
        key={props.label}
        to={props.link}
        className={`${props.active ? classes.NavLinkBody : ""} ${
          classes.navButtons
        }`}
        onClick={props.onClick}
      >
        {Icon && <Icon color={active ? "white" : "black"} />}
        {props.label}
      </NavLink>
    </div>
  );
};

export default memo(sideBarButton);
