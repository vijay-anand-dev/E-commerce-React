import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from "./pages/Home"
import ProductDetails from "./pages/ProductDetails"

const Routes = () => {
    return(
        <Router>
            <Route exact path="/" component={Home} />
            <Route exact path="/products/:productId(\d*)" component = {ProductDetails} />
        </Router>
    )
}

export default Routes