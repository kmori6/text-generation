import "./App.css";
import GPT from "./components/GPT";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1 className="page-header bg-black text-white p-2 m-0">
        Text Generation
      </h1>
      <GPT />
    </div>
  );
}

export default App;
