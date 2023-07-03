import { useEffect, useState } from "react";
import * as io from "socket.io-client";

import "./App.css";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState();

  const handleLogin = async () => {
    socket.emit("login", { username, password });
  };

  useEffect(() => {
    socket.on("recive_token", (data) => {
      setToken(data);
    });
    socket.on("erro_login", (data) => {
      alert(JSON.stringify(data));
    });
  }, [socket]);

  return (
    <main className="flex justify-center w-full mt-20">
      {token ? (
        <LoggedPage token={token} />
      ) : (
        <section className="card">
          <h1>Formulario</h1>
          <input
            placeholder="User"
            className="border p-1"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Senha"
            className="border p-1"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="border bg-blue-600" onClick={handleLogin}>
            logar
          </button>
        </section>
      )}
    </main>
  );
}

export default App;

const LoggedPage = ({ token }) => {
  return (
    <>
      <h1>Voce esta logado.</h1>
      <p>Perdeu os dados do cartao de credito.</p>
      <p>{token}</p>
    </>
  );
};
