import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import TeacherForm from "./pages/TeacherForm";
import TeacherList from "./pages/TeacherList";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Landing} />
      <Route exact path="/give-classes" component={TeacherForm} />
      <Route exact path="/study" component={TeacherList} />
    </BrowserRouter>
  );
};

export default Routes;
