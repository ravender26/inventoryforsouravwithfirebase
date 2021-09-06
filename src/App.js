// import { useEffect } from 'react';
import './App.css';
import Heading from "./components/Heading";
import SubHeading from "./components/SubHeading";
import Form from "./components/Form";

const heading = "Satinder Bartan Store";
const subHeading = "Add Items";

function App() {

  // var database = firebase.database();
  // console.log({database})

  return (
    <div className="App">
      <Heading heading = {heading} />
      <SubHeading subHeading = {subHeading} />
      <Form />
    </div>
  );
}

export default App;
