import "./App.css";
import GPT from "./components/GPT";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container-fluid p-0 h-100">
      <h2 className="page-header bg-black text-white p-3 m-0">
        Text Generation
      </h2>
      <GPT />
    </div>
  );
}

export default App;
