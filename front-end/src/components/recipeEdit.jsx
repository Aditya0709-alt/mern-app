import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Form from "./common/form";
import { PageHeader } from "./common/pageHeader";
import recipeService from "../services/recipeService";
import httpService from "../services/httpService";
import { apiUrl } from "../config.json";

class RecipeEdit extends Form {
  state = {
    data: {
      _id: '',
      title: "",
      file: '',
      groceries: "",
      instructions: "",
    },
    showDiv: false,
    errors: {},
  };

  //validate the data by the schema
  schema = {
    _id: Joi.string(),
    file: Joi.object(),
    title: Joi.string().required().min(3).label("Title"),
    groceries: Joi.string().required().min(10).label("groceries"),
    instructions: Joi.string().required().min(15).label("Instructions"),
  };

  //show/unShow the edit image div
  handleClick = (e) => {
    e.preventDefault();
    const { showDiv } = this.state;
    if (showDiv === false) {
      this.setState({ showDiv: true });
    } else if (showDiv === true) {
      this.setState({ showDiv: false });
    }
  }

  //change the file by the given file
  handleOnChange = (e) => {
    document.querySelector('.custom-file-label').innerText = e.target.files[0].name;
    this.setState(this.state.data.file = e.target.files[0]);
    console.log(this.state.data.file);
  }

  //reflection the given prop data 
  mapToViewModel = (recipe) => {
    return {
      _id: recipe._id,
      title: recipe.title,
      groceries: recipe.groceries,
      instructions: recipe.instructions
    };
  }

  //showing the data from the server
  async componentDidMount() {
    const recipeId = this.props.match.params.id;
    const { data } = await recipeService.getRecipe(recipeId);
    this.setState({ data: this.mapToViewModel(data) });
  }

  //checking if send the form with file or not end send to server the correct form
  async submit() {
    const { history } = this.props;
    const { _id, title, file, groceries, instructions } = this.state.data;
    if (file !== '' || file !== null) {
      const form = new FormData();
      form.append('_id', _id);
      form.append('title', title);
      form.append('file', file);
      form.append('groceries', groceries);
      form.append('instructions', instructions);
      await httpService.put(`${apiUrl}/recipes/${_id}`, form, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
    } else {
      //checking the extension and type of uploaded file 
      const fileType = /\/(gif|jpe?g|tiff?|png|webp|bmp)$/i;
      const fileEx = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
      if (!fileEx.test(file.name.toLowerCase())) return this.setState({ fileErrors: 'Please insert valid file' });
      if (!fileType.test(file.type.toLowerCase())) return this.setState({ fileErrors: 'Please insert valid file' });
      const form = new FormData();
      form.append('_id', _id);
      form.append('title', title);
      form.append('groceries', groceries);
      form.append('instructions', instructions);
      await httpService.put(`${apiUrl}/recipes/${_id}`, form, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
    }
    toast("Recipe has updated.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    history.replace("/recipes");
  }

  render() {
    const { file } = this.state.data;
    const { showDiv } = this.state;
    return (
      <div className="container">
        <PageHeader
          titleText="Edit recipe."
          description="Edit your recipe and make it better one."
        />
        <div className="row mt-5">
          <div className="col-lg-6 mx-auto">
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("title", "Title")}
              {this.renderTextarea(`groceries`, `Groceries`)}
              {this.renderTextarea("instructions", "Instructions")}
              {showDiv &&
                <div className="addImage">
                  <div className="form-group">
                    <label htmlFor="file">Edit image</label>
                    <div className="input-group mb-3">
                      <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile02" onChange={this.handleOnChange} />
                        <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">{file && file.name}</label>
                      </div>
                      <div className="input-group-append">
                        <span className="input-group-text" id="inputGroupFileAddon02">Upload</span>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {this.renderButton("Edit")}
              <Link className="btn btn-secondary ml-2" to="/recipes">Cancel</Link>
              <button className='btn btn-primary ml-5' type="button" onClick={this.handleClick}>Edit Image</button>
            </form>
          </div>
        </div >
      </div >
    );
  }
}


export default RecipeEdit;
