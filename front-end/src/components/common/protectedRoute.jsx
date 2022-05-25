import React, { useContext} from 'react';
import { Redirect, Route, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

//make a protected router just the user can pass to edd and delete his recipe
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  const params = useParams()
  const currentUser = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: params.location } }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
