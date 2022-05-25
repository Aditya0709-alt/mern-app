import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import Form from "./common/form";
import { PageHeader } from "./common/pageHeader";
import userService from "../services/userService";
import httpService from "../services/httpService";
import { apiUrl } from "../config.json";

class RecipeCreate extends Form {
	state = {
		data: {
			title: "",
			file: "",
			groceries: "",
			instructions: "",
		},
		errors: {},
		fileErrors: null,
	};

	//checking the form schema
	schema = {
		title: Joi.string().required().min(3).label("Title"),
		file: Joi.object(),
		groceries: Joi.string().required().min(10).label("groceries"),
		instructions: Joi.string().required().min(15).label("Instructions"),
  };
  
	//changing the input value
	handleOnChange = (e) => {
		document.querySelector(".custom-file-label").innerText =
			e.target.files[0].name;
		this.setState((this.state.data.file = e.target.files[0]));
	};

	//submit with file type and extension validation
	submit = async (e) => {
		const { history } = this.props;
		const { title, file, groceries, instructions } = this.state.data;
		const fileType = /\/(gif|jpe?g|tiff?|png|webp|bmp)$/i;
		const fileEx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
		if (!fileEx.test(file.name.toLowerCase()))
			return this.setState({ fileErrors: "Please insert valid file" });
		if (!fileType.test(file.type.toLowerCase()))
			return this.setState({ fileErrors: "Please insert valid file" });
		//making formData to send a file
		const form = new FormData();
		form.append("title", title);
		form.append("file", file);
		form.append("groceries", groceries);
		form.append("instructions", instructions);
		try {
			await httpService.post(`${apiUrl}/recipes`, form, {
				headers: {
					"content-type": "multipart/form-data",
				},
			});
			toast("You created new recipe.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			history.replace("/recipes");
		} catch (err) {
			console.log("Something went wrong.");
		}
	};

	render() {
		if (!userService.getCurrentUser()) {
			return <Redirect to="/signin" />;
		}
		const { file } = this.state.data;
		const { fileErrors } = this.state;
		return (
			<div className="container">
				<PageHeader
					titleText="Create recipe."
					description="Create your owen recipe and share with others."
				/>
				<div className="row mt-5">
					<div className="col-lg-6 mx-auto">
						<form onSubmit={this.handleSubmit}>
							{this.renderInput("title", "Title")}
							{this.renderTextarea(`groceries`, `Groceries`)}
							{this.renderTextarea("instructions", "Instructions")}
							<div className="form-group">
								<label htmlFor="file">Edit image</label>
								<div className="input-group mb-3">
									<div className="custom-file">
										<input
											type="file"
											className="custom-file-input"
											id="inputGroupFile02"
											onChange={this.handleOnChange}
										/>
										<label
											className="custom-file-label"
											htmlFor="inputGroupFile02"
											aria-describedby="inputGroupFileAddon02"
										>
											{file && file.name}
										</label>
									</div>
								</div>
								{fileErrors && (
									<span className="text-danger d-block"> {fileErrors}</span>
								)}
							</div>
							{this.renderButton("Post")}
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default RecipeCreate;
