import { Component } from 'react';
import recipeService from '../services/recipeService';

//delete the recipe and go back to recipes page
class DeleteRecipe extends Component {
  async componentDidMount() {
    await recipeService.deleteRecipe(this.props.match.params.id);
    this.props.history.replace("/recipes");
  }
  render() {
    return null;
  }
}

export default DeleteRecipe;