import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import About from "./components/about";
import RecipeList from "./components/recipes";
import Signin from "./components/signin";
import RecipePage from "./components/recipePage";
import SignUp from "./components/signup";
import Logout from "./components/logout";
import RecipeCreate from "./components/recipeCreate";
import RecipeEdit from "./components/recipeEdit";
import RecipeDelete from "./components/recipeDelete";
import userService from "./services/userService";
import Favorites from "./components/favorites";
import ProtectedRoute from "./components/common/protectedRoute";

//use the createContext hook to pass the user all over the components
export const UserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    (async () => {
      const currentUser = userService.getCurrentUser();
      if (currentUser) {
        const user = await userService.getUser();
        setUser(user)
      }
      return true;
    })();
  }, [user]);//put the user inside the [] for any time the user updated reRender the app

  return (
    <div className="App d-flex flex-column min-vh-100">
      <UserContext.Provider value={user}>
        <Header />
        <ToastContainer />
        <main className="fill">
          <Switch>
            <ProtectedRoute path='/recipes/edit/:id' component={RecipeEdit} />
            <ProtectedRoute path='/recipes/delete/:id' component={RecipeDelete} />
            <Route path="/recipe/:id" component={RecipePage} />
            <Route path="/favorites" component={Favorites} />
            <Route path="/create-recipe" component={RecipeCreate} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={Signin} />
            <Route exact path="/recipes" component={RecipeList} />
            <Route path="/about" component={About} />
            <Route path="/" exact component={Home} />
          </Switch>
        </main>
        <Footer />
      </UserContext.Provider>
    </div>
  );
};

export default App;
