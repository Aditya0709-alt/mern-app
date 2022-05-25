import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import favoritesService from "../services/favoritesService";
import { recipeImage } from "../config.json";
import recipeService from "../services/recipeService";
import { useEffect } from "react";
import "../App.css";

const Recipe = ({ recipe }) => {
	const user = useContext(UserContext);
	const [recipeUser, setRecipeUser] = useState();

	//creating valid date
	const d = new Date(recipe.createdAt);
	const month = d.getMonth() + 1;
	const year = d.getFullYear();
	const day = d.getDate();
	const recipeUploadDate = `${day}/${month}/${year}`;

	//get the recipe written user name
	const getUser = async () => {
		const { data } = await recipeService.getUserByRecipe(recipe._id);
		return setRecipeUser(data.name);
	};

	useEffect(() => {
		getUser();
	}, []); // eslint-disable-line

	//add the recipe to favorite
	const handleAdd = async () => {
		try {
			await favoritesService.addToFav(recipe);
			toast("Added to favorites.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return recipe._id;
		} catch (err) {
			return err;
		}
	};

	//add the recipe to favorite
	const handleRemove = async () => {
		try {
			await favoritesService.removeFav(recipe._id);
			toast("Remove from favorites.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return recipe._id;
		} catch (err) {
			return console.log(err);
		}
	};

	return (
		<div className="card m-3" style={{ width: "18rem" }}>
			<div className="userDiv">
				{" "}
				<i className="fas fa-user"></i>&nbsp; {recipeUser}{" "}
				<span className="float-right">{recipeUploadDate}</span>
			</div>
			<div className="imageDiv">
				<img
					src={recipeImage + recipe.file}
					className="card-img-top imageCard"
					alt={recipe.name}
				/>
				{user && user.favorites.some((id) => id === recipe._id) && (
					<div className="mx-auto favorite-btn" onClick={handleRemove}>
						<i className="fas fa-heart"></i>
					</div>
				)}
				{user && !user.favorites.some((id) => id === recipe._id) && (
					<div className="mx-auto favorite-btn" onClick={handleAdd}>
						<i className="far fa-heart"></i>
					</div>
				)}
			</div>
			<h5 className="card-title mt-4"> {recipe.title}</h5>
			{user && user._id === recipe.user_id && (
				<div className="mx-auto editDiv">
					<div className="card-body">
						<Link
							to={`/recipes/edit/${recipe._id}`}
							className="btn btn-primary mr-2"
						>
							<i className="fas fa-edit"></i> Edit
						</Link>
						<Link
							to={`/recipes/delete/${recipe._id}`}
							className="btn btn-danger"
						>
							<i className="fas fa-trash"></i> Delete
						</Link>
					</div>
				</div>
			)}
			<div className="getRecipe">
					{user && (
				<Link to={`/recipe/${recipe._id}`} className="get">
					Get recipe
				</Link>
			)}
			{!user && (
				<Link to={`/signup`} className="get">
					Get recipe
				</Link>
			)}
			</div>
		
		</div>
	);
};

export default Recipe;
