import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import { PageHeader } from "./common/pageHeader";
import { Redirect, Link } from "react-router-dom";
import userService from "../services/userService";

class SignIn extends Form {
	state = {
		data: {
			email: "",
			password: "",
		},
		errors: {},
	};

	//checking the joi schema vs the user data
	schema = {
		email: Joi.string().required().email().label("Email"),
		password: Joi.string().required().min(8).label("Password"),
	};

	//sending the user data and bring the user a token
	async submit() {
		const { state } = this.props.location;
		const { email, password } = this.state.data;
		try {
			await userService.login(email, password);
			if (state && state.from) {
				return (window.location = state.from.pathname);
			}
			window.location = "/";
			toast("Welcome to FoodTrip!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			if (error.response && error.response.status === 400) {
				this.setState({
					errors: { email: error.response.data },
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
					titleText="Sign In"
					description="Sign in to Food Trip app."
				/>
				<div className="row mt-5">
					<div className="col-lg-6 mx-auto">
						<form onSubmit={this.handleSubmit} noValidate>
							{this.renderInput("email", "Email", "email")}
							{this.renderInput("password", "Password", "password")}
							{this.renderButton("Sign In")}
							<Link to="/signup" className="ml-5 mt-3">
								Register Now!
							</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default SignIn;
