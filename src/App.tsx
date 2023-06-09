import BookmarkDetails from "./components/BookmarkDetails";
import Bookmark from "./pages/Bookmark";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bookmark />}>
          <Route path="/:id" element={<BookmarkDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
