import React, { useState } from "react";
import { Link } from "react-router-dom";
import eagle from "./eagle.png";
import { Menu } from "semantic-ui-react";

import "./menuBar.css";

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (event, { name }) => {
    setActiveItem(name);
  };

  return (
    <header className="navHeader">
      <Menu secondary stackable size="large">
        <Menu.Item as={Link} to="/">
          <img src={eagle} className="logo" alt="logo" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            className="navLinks"
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            className="navLinks"
            name="speakers"
            active={activeItem === "speakers"}
            onClick={handleItemClick}
            as={Link}
            to="/speakers"
          />
          <Menu.Item
            className="navLinks"
            name="events"
            active={activeItem === "events"}
            onClick={handleItemClick}
            as={Link}
            to="/events"
          />
          <Menu.Item
            className="navLinks"
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
          <Menu.Item
            className="navLinks"
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            className="navLinks"
            name="logout"
            active={activeItem === "logout"}
            onClick={null}
          />
        </Menu.Menu>
      </Menu>
    </header>
  );
}

export default MenuBar;
