import React, { useState } from "react";
import { get } from "jquery";
import "../App.css";

//fetching data from edamam url
function RecipeEda() {
	const [url, setUrl] = useState("");
	const [data, setData] = useState(null);
	async function getAllfrommama() {
		const data = await get(
			`https://api.edamam.com/search?q=${url}&to=100&app_id=fd8138de&app_key=6b5a095ac2195cc33eb54ea7761d88b8`
		);
		setData(data);
	}
	function handleChange(e) {
		setUrl(e.target.value);
		if (e.charCode === 13) {
			e.preventDefault();
			getAllfrommama();
		}
	}

	return (
		<div className="container text-center edamam-box">
			<h4 className="mb-5 edamam-h5">Search for more recipes...</h4>
			<div className="searchDiv">
				<div className="btn-group">
					<input
						className="searchInput input-group-text"
						type="text"
						placeholder="Search Recipe..."
						onKeyPress={handleChange}
					/>
					<button type="button" className="btn-food" onClick={getAllfrommama}>
						Search
					</button>
				</div>
			</div>
			<div className="row mt-5">
				{data &&
					data.hits.map((i) => (
						<div
							className="card edaCard m-4"
							style={{ width: "18rem" }}
							key={i.recipe.shareAs}
						>
							<div className="card-body">
								<h5 className="card-title">{i.recipe.label}</h5>
							</div>
							<img src={i.recipe.image} className="card-img-top mb-3" alt="" />
							<h6 className="text-center">Heath Categories:</h6>
							<ul className="list-group list-group-flush">
								{i.recipe.healthLabels.slice(0, 3).map((title, index) => (
									<li className="list-group-item" key={index}>
										{title}
									</li>
								))}
							</ul>
							<a
								href={i.recipe.shareAs}
								rel="noopener noreferrer"
								target="_blank"
								className="card-link"
							>
								Card link
							</a>
						</div>
					))}
			</div>
		</div>
	);
}

export default RecipeEda;
