import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import eagle from "./eagle.png";
import { Menu, Dropdown, Divider } from "semantic-ui-react";
import { AuthContext } from "../../context/auth";

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
            icon
            text={user.firstName}
            active={activeItem === `${user.firstName}`}
            onClick={handleItemClick}
            as={Dropdown}
          >
            <Dropdown.Menu className="test">
              <Dropdown.Item as={Link} to={`/profile/${user.userId}`}>
                <i className="user icon"></i>View Profile
              </Dropdown.Item>
              <Divider />
              <Dropdown.Item as={Link} to={`/profile/${user.userId}`}>
                Manage Account
              </Dropdown.Item>
              {user.userType === "EVENT_PLANNER" && (
                <Dropdown.Item as={Link} to={`/account/events`}>
                  Events
                </Dropdown.Item>
              )}
              {user.userType === "EVENT_PLANNER" && (
                <Dropdown.Item as={Link} to={`/account/company`}>
                  Companies
                </Dropdown.Item>
              )}
              {user.userType === "SPEAKER" && (
                <Dropdown.Item as={Link} to={`/profile/${user.userId}`}>
                  Bookings
                </Dropdown.Item>
              )}
              <Dropdown.Item as={Link} to={`/profile/${user.userId}`}>
                Accout Settings
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Menu.Item>
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
