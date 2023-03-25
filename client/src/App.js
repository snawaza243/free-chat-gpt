// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import './normal.css';


function App() {

  // state for input

  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message: "What can is do for you?"
    },

    {
      user: "me",
      message: "How is the morning"
    }]);

    function clearChat(){
      setChatLog([]);
    }

  async function handleSubmit(e) {
    e.preventDefault();
    await setChatLog([...chatLog, { user: "me", message: `${input}` }])
    await setInput("");

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: chatLog.map((message) => message.message).json("")
      })
    });

    const data = await response.json();
    setChatLog([...chatLog, { user: "me", message: `${input}` }])







  }








  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-btn" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>

      <section className="chat-box">
        <div className="chat-log">
          {chatLog.map((message, index) => {
            <ChatMessage key={index} message={message} />
          })}

        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              className="chat-input-text-area"
              row="1"
              value={input}
              onChange={(e) => setInput(e.target.input)}
            />
          </form>

        </div>
      </section>

    </div>
  );
}


const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chat-message "}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" && <span>Green</span>}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  )
}

export default App;
