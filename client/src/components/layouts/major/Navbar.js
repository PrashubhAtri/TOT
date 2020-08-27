import React , {Fragment,useState} from "react";
import {Link} from "react-router-dom";
import LOGO from "../../resources/imgs/logo.jpg";
import {connect} from "react-redux";
import {logout} from "../../../actions/auth";
import PropTypes from "prop-types";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

const NavBar = ({auth:{ isAuthenticated, loading }, logout}) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const openNav = () => {
        document.getElementById("mySidebar").style.width = "30%";
    }
    const closeNav = () => {
        document.getElementById("mySidebar").style.width = "0";
    }

    const AuthLinks = (
        <div>
            <Link onClick={logout}>
                <i className="fas fa-sign-out-alt"/>{' '}
                Logout
            </Link>
            <Link to="/dashboard">
                Dashboard
            </Link>
            <a href="https://totregisteration.netlify.app/">
                Register
            </a>
        </div>
    )

    const GuestLinks = (
        <Link to="/login">Login</Link>
    )

    return(
        <div>
            <div className="container">
                <hr className="mt-0" />
                <div className="row justify-content-center">
                    <div className="col-12 text-center">
                        <img src={LOGO} alt="LOGO" className="LOGO"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <Navbar color="light" light expand="md">
                            <button type="button" className="btn openbtn border border-dark" onClick={()=>openNav()}>
                                <i className="fas fa-bars fa-lg text-cream"/>
                            </button>
                            <NavbarBrand href="/" className="text-cream text-center">
                                <div className="show-md"/>
                            </NavbarBrand>
                            <NavbarToggler onClick={toggle}/>
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="m-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/genre/national">National</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/genre/international">International</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/genre/politics">Politics</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/genre/editorial">Editorial</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/genre/lifestyle">Lifestyle</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/genre/entertainment">Entertainment</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                </div>
            </div>
            <div id="mySidebar" className="sidebar">
                <a href="javascript:void(0)" className="closebtn" onClick={()=>closeNav()}><i className="fas fa-times"/></a>
                <Link to="/about">About Us</Link>
                <Link to="/vision">Vision</Link>
                <Link to="/founders">Founders</Link>
                { !loading && (
                    <Fragment>
                        {isAuthenticated ? AuthLinks : GuestLinks}
                    </Fragment>
                )}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="text-cream h4"> Find Us: </div>
                            <ul className="iconlist">
                                <a href="https://www.facebook.com">
                                    <li className="facebook">
                                        <i className="fab fa-facebook"/>
                                    </li>
                                </a>
                                <a href="https://www.twitter.com">
                                    <li>
                                        <i className="fab fa-twitter"/>
                                    </li>
                                </a>
                                <a href="https://www.instagram.com">
                                    <li>
                                        <i className="fab fa-instagram"/>
                                    </li>
                                </a>
                                <a href="https://www.linkedin.com/home">
                                    <li>
                                        <i className="fab fa-linkedin-in"/>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{logout})(NavBar);