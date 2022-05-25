import React from "react";
import { PageHeader } from "./common/pageHeader";
import "../App.css";

const About = () => {
	return (
		<div className="container mt-4">
			<PageHeader
				titleText="About Us"
			/>
			<div className="row mt-4">
				<div className="col-6">
					<section>
						<h4 className="about-title">Food Trip</h4>
						<p>
							We are a great company that specify at recipes and food
							instrument.
						</p>
						<p>
							{" "}
							We made that great app FoodTrip, to let you all enjoy our
							knowledge,
						</p>
						<p> And our shared love with all the food concept.</p>{" "}
						<p>
							Also enjoy your knowledge and share with us and with our community
							your recipes and food advise.
						</p>
					</section>
				</div>
				<div className="contact-div col-6 border pt-3">
					<div className="box contact-div ">
						<div className="inside-div">
							<b>Address :</b> New York city, Long Island , Brookhaven , 11733
						</div>
						<div className="inside-div">
							<b>Phone Number :</b>{" "}
							<a href="tel:(+225) 78954-5768-669">(+225) 78954-5768-669</a>
						</div>
						<div className="inside-div">
							{" "}
							<b>Working hours : </b>
							<div>Monday - Friday : 09:00 AM - 05:00 PM</div>
							<div>Saturday: 09:00 AM - 09:00 PM</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
