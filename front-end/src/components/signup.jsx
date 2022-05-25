import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect, Link } from "react-router-dom";
import Form from "./common/form";
import { PageHeader } from "./common/pageHeader";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import userService from "../services/userService";

class SignUp extends Form {
	state = {
		data: {
			name: "",
			email: "",
			password: "",
		},
		errors: {},
	};

	//checking the schema vs the user data
	schema = {
		name: Joi.string().required().min(2).label("Name"),
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(8).label("Password"),
	};

	//register the user at the server
	async submit() {
		const { history } = this.props;
		const data = { ...this.state.data, isAdmin: false };
		try {
			await http.post(`${apiUrl}/users`, data);
			toast("You have successfully registered.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			history.replace("/signin");
		} catch (error) {
			if (error.response && error.response.status === 414) {
				this.setState({
					errors: { ...this.state.errors, email: "User is already register" },
				});
			}
		}
	}

	render() {
		if (userService.getCurrentUser()) {
			return <Redirect to="/" />;
		}
		return (
			<div className="container mt-4">
				<PageHeader
					titleText="Sign Up"
					description="Sign Up to Food Trip app for free."
				/>
				<div className="row mt-5">
					<div className="col-lg-6 mx-auto">
						<form
							onSubmit={this.handleSubmit}
							noValidate="noValidate"
							autoComplete="off"
						>
							{this.renderInput("name", "Name")}
							{this.renderInput("email", "Email", "email")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Sign Up")}
							<Link to="/signin" className="ml-5">
								I'm already signed!
							</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default SignUp;
