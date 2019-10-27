import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Divider } from "semantic-ui-react";

import eagle from "../../assets/images/navbar-logo.png";
import { AuthContext } from "../../context/auth";
import "./menu-bar.css";

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
    <header className="main-nav-wrapper">
      <Menu secondary stackable size="large">
        <Menu.Item as={Link} to="/">
          <img src={eagle} className="nav-logo" alt="logo" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            className="main-nav-links"
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            className="main-nav-links"
            name="Browse Speakers"
            active={activeItem === "Browse Speakers"}
            onClick={handleItemClick}
            as={Link}
            to="/speakers"
          />
          <Menu.Item
            className="main-nav-links"
            name="Explore Events"
            active={activeItem === "Explore Events"}
            onClick={handleItemClick}
            as={Link}
            to="/events"
          />
          <Menu.Item
            className="main-nav-links"
            icon
            text={user.firstName}
            active={activeItem === `${user.firstName}`}
            onClick={handleItemClick}
            as={Dropdown}
          >
            <Dropdown.Menu className="dropdown-menu-wrapper">
              <Dropdown.Item as={Link} to={`/profile/${user.userId}`}>
                <i className="user icon"></i>View Profile
              </Dropdown.Item>
              <Divider />
              {user.userType === "EVENT_PLANNER" && (
                <Dropdown.Item as={Link} to={`/account/events`}>
                  Events
                </Dropdown.Item>
              )}
              {user.userType === "EVENT_PLANNER" && (
                <Dropdown.Item as={Link} to={`/account/company`}>
                  Company
                </Dropdown.Item>
              )}
              {user.userType === "SPEAKER" && (
                <Dropdown.Item as={Link} to={`/account/bookings`}>
                  Bookings
                </Dropdown.Item>
              )}
              <Dropdown.Item as={Link} to={`/account/settings-privacy`}>
                Settings & Privacy
              </Dropdown.Item>
              <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </header>
  ) : (
    <header className="main-nav-wrapper">
      <Menu secondary stackable size="large">
        <Menu.Item as={Link} to="/">
          <img src={eagle} className="logo" alt="logo" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            className="main-nav-links"
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
          <Menu.Item
            className="main-nav-links"
            name="events"
            active={activeItem === "events"}
            onClick={handleItemClick}
            as={Link}
            to="/events"
          />
          <Menu.Item
            className="main-nav-links"
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            className="main-nav-links"
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
