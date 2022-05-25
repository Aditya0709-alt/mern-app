import React from "react";
import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../App";
import "../styles/header.css";

const Header = () => {
	let user = useContext(UserContext);
	return (
		<header className="font-weight-bolder sticky-top">
			<nav className="navbar navbar-expand-lg shadow navbar-light">
				<Link className="navbar-brand" to="/">
					FoodTrip <i className="fas fa-utensils"></i>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navIcon">___</span>
					<span className="navIcon">___</span>
					<span className="navIcon">___</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mx-auto ">
						<li className="nav-item mx-5">
							<NavLink className="nav-link nanLink" to="/about">
								About
							</NavLink>
						</li>
						<li className="nav-item mx-5">
							<NavLink className="nav-link nanLink" to="/recipes">
								Recipes
							</NavLink>
						</li>
						{user && (
							<li className="nav-item mx-5">
								<NavLink className="nav-link nanLink" to="/favorites">
									Favorites
								</NavLink>
							</li>
						)}
					</ul>
					{!user && (
						<ul className="navbar-nav ml-3">
							<li className="nav-item mx-5">
								<NavLink className="nav-link nanLink" to="/signin">
									<i className="fas fa-sign-in-alt"></i>&nbsp; Login
								</NavLink>
							</li>
						</ul>
					)}
					{user && (
						<ul className="navbar-nav mr-3">
							<li className="nav-item dropdown mx-5">
								<Link
									className="nav-link dropdown-toggle nanLink"
									to="#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i className="fas fa-user"></i> &nbsp; {user.name} &nbsp;
								</Link>
								<div
									className="dropdown-menu scroll-logout"
									aria-labelledby="navbarDropdown"
								>
									<NavLink className="dropdown-item " to="/logout">
										<i className="fas fa-sign-out-alt"></i> &nbsp; Log-out
									</NavLink>
								</div>
							</li>
						</ul>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
