import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import recipeService from "../services/recipeService";
import { PageHeader } from "./common/pageHeader";
import { recipeImage } from "../config.json";

const RecipePage = () => {
	//use the params hook to take the id from params
	const params = useParams();
	const [recipe, setRecipe] = useState("");
	const [user, setUser] = useState();

	//get the recipe written user name
	const getUser = async () => {
		const { data } = await recipeService.getUserByRecipe(params.id);
		setUser(data.name);
	};

	//fetch the recipe data from the server
	const getData = async () => {
		const { data } = await recipeService.getRecipe(params.id);
		setRecipe(data);
	};

	useEffect(() => {
		//use the mount variable to unMount the component when exit from it
		let mount = true;
		if (mount) {
			getData();
			getUser();
		}
		return () => (mount = false);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps
	//put the [] for stop fetching data after unMounting the component

	return (
		<div className="container mt-4">
			<PageHeader titleText={recipe.title} />
			<div className="container">
				<section>
					<img
						width="400"
						className="rounded float-right"
						src={recipe && recipeImage + recipe.file}
						alt={recipe.title}
					/>
					<div className="mb-5" style={{ whiteSpace: "pre-wrap" }}>
						<h5>Ingredients :</h5> {recipe.groceries}
					</div>
					<div className="mb-3" style={{ whiteSpace: "pre-wrap" }}>
						<h5>Steps :</h5> {recipe.instructions}
					</div>
					<div>
						<p className="font-weight-bold mt-5">By : {user}</p>
					</div>
				</section>
				<Link className="mt-5 d-block" to="/recipes">
					Back to all recipes <i className="far fa-arrow-alt-circle-left"></i>{" "}
				</Link>
			</div>
		</div>
	);
};

export default RecipePage;
