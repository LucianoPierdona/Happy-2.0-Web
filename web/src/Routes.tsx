import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateOrphanage from "./pages/CreateOrphanage";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Orphanage from "./pages/Orphanage";
import OrphanagesMap from "./pages/OrphanagesMap";
import ForgotPassword from "./pages/ForgotPassword";
import SuccessPage from "./pages/SuccessPage";
import RestrictedAccess from "./pages/RestrictedAccess";
import EditOrphanage from "./pages/EditOrphanage";
import DeleteOrphanage from "./pages/DeleteOrphanage";
import RestrictedAccessPendents from "./pages/RestrictedAccessPendents";

// Routes of the web application
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/map" component={OrphanagesMap} />
        <Route path="/orphanages/create" exact component={CreateOrphanage} />
        <Route path="/orphanages/:id" exact component={Orphanage} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/success" component={SuccessPage} />
        <Route path="/restricted-access" exact component={RestrictedAccess} />
        <Route
          path="/restricted-access/pendents"
          exact
          component={RestrictedAccessPendents}
        />
        <Route
          path="/restricted-access/edit/:id"
          exact
          component={EditOrphanage}
        />
        <Route
          path="/restricted-access/delete/:id/:name"
          exact
          component={DeleteOrphanage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
