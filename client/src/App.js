import Container from "@mui/material/Container";
import {Route, Routes} from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchAuthMe} from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, []);
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<FullPost/>}/>
          <Route path="/add-post" element={<AddPost/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Home/>}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;

// TODO сделать удаление статей
// TODO сделать редактирование статей
