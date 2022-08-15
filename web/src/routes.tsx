import { BrowserRouter, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import TeacherForm from "./pages/TeacherForm";
import TeacherList from "./pages/TeacherList";

export default function RoutesScreen() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/teacher-form" element={<TeacherForm />} />
        <Route path="/teacher-list" element={<TeacherList />} />
      </Routes>
    </BrowserRouter>
  );
}
