import React, { Component } from "react";
import Joi from "joi-browser";
import { Input } from "./input";
import "../../App.css";

class Form extends Component {
	//handle the send form btn
	handleSubmit = (e) => {
		e.preventDefault();
		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
		this.submit();
	};

	//handling the input value
	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProp(input);
		if (errorMessage) {
			errors[input.name] = errorMessage;
		} else {
			delete errors[input.name];
		}
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	//validate the joi incoming value
	validateProp = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = {
			[name]: this.schema[name],
		};
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message.replace(/"/g, "") : null;
	};

	//validate the data vs the given schema
	validate = () => {
		const { error } = Joi.validate(this.state.data, this.schema);
		if (!error) return null;
		const errors = {};
		for (let item of error.details) {
			errors[item.path[0]] = item.message.replace(/"/g, "");
		}
		return errors;
	};

  //make a reusable input 
	renderInput = (name, label, type = "text") => {
		const { data, errors } = this.state;
		return (
			<Input
				type={type}
				name={name}
				label={label}
				onChange={this.handleChange}
				value={data[name]}
				error={errors[name]}
			/>
		);
	};

  //make a reusable textarea 
	renderTextarea = (name, label) => {
		const { data, errors } = this.state;
		return (
			<div className="form-group">
				<label className="d-block" htmlFor={name}>
					{label}
				</label>
				<textarea
					name={name}
					className="d-block"
					style={{ resize: "none", width: "100%" }}
					rows="5"
					onChange={this.handleChange}
					value={data[name]}
				></textarea>
				{errors && <span className="text-danger">{errors[name]}</span>}
			</div>
		);
	};

	//make the button disabled open it just when the form valid
	renderButton = (btnLabel) => {
		return (
			<button className="btn btn-primary" disabled={this.validate()}>
				{btnLabel}
			</button>
		);
	};
}

export default Form;
