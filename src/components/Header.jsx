import { Container, Button, Navbar, Nav, NavbarBrand, NavLink, NavItem } from 'reactstrap';
import './header.css';

export const Header = () => {
  return (
    <Navbar className="nav-bar">
      <Nav>
        <NavItem>
          <Button className="nav-button">Log in</Button>
        </NavItem>
        <NavItem>
          <Button className="nav-button">Register</Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
};
