import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img
            src="https://img.icons8.com/?size=256&id=V1Ja402KSwyz&format=png"
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src="https://img.icons8.com/?size=256&id=aUZxT3Erwill&format=png"
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React + Rohit</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          changed from local <code>processing through</code>test case and
          deployed directly
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <a
        href="/Python Cheat Sheet.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1>Click here to open the pdf</h1>
      </a>
    </>
  );
}

export default App;
