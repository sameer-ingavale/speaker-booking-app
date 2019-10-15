import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import eagle from "./eagle.png";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import "./menuBar.css";

function MenuBar() {
  const {
    logout,
    authData: { user }
  } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (event, { name }) => {
    setActiveItem(name);
  };

  const menuBar = user ? (
    <header className="navHeader">
      <Menu secondary stackable size="large">
        <Menu.Item as={Link} to="/">
          <img src={eagle} className="logo" alt="logo" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            className="navLinks"
            icon="user"
            name={user.firstName}
            active={activeItem === `${user.firstName}`}
            onClick={handleItemClick}
            as={Link}
            to={`/profile/${user.userId}`}
          />
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
            name="events"
            active={activeItem === "events"}
            onClick={handleItemClick}
            as={Link}
            to="/events"
          />
          <Menu.Item className="navLinks" name="logout" onClick={logout} />
        </Menu.Menu>
      </Menu>
    </header>
  ) : (
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
            name="events"
            active={activeItem === "events"}
            onClick={handleItemClick}
            as={Link}
            to="/events"
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
            name="register"
            icon="address book"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </header>
  );

  return menuBar;
}

export default MenuBar;
