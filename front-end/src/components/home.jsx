import React from "react";
import { PageHeader } from "./common/pageHeader";
import "../App.css";
import RecipeEda from "./recipeEdaMam";
import { NavLink } from "react-router-dom";

function Home() {
	return (
		<React.Fragment>
			<div className="container-fluid homeDiv ">
				<div className="homePageHeader">
					<PageHeader
						titleText="Food Trip app"
						description="In this site you can find recipes advises and food knowledge "
					/>
				</div>
				<section className="home-section">
					<h2>Hello to FoodTrip</h2>
					<article>
						<p>
							{" "}
							Welcome to food trip web, in here you can share ,read and post
							recipes food advise between friends and associate people...{" "}
						</p>
						<p>
							In here you can learn more on food and how to use it correctly ,
							and also to share from your knowledge to the wild world.
						</p>
						<p>
							We welcome you to sign up and start enjoy our all services anf
							gifts...{" "}
						</p>
						<p className="pdis">
							{" "}
							If you are already register then what are you withing for? sign
							in!{" "}
						</p>
						<NavLink className="ml-5 btn btn-primary" to="/signin">
							Join Us !
						</NavLink>
					</article>
				</section>
			</div>
			<div className="edaSearch">
				<RecipeEda />
			</div>
		</React.Fragment>
	);
}

export default Home;
