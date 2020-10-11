import React, { useState, useEffect } from "react";
import { Input, FormControl, InputLabel, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import firebase from "firebase";
import FlipMove from "react-flip-move";

import "./App.css";
import Message from "./Message";
import db from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please Enter Your Name Before Starting Chat"));
  }, []);

  const sendMessages = (event) => {
    event.preventDefault();

    // setMessages([...messages, { message: input, username: username }]);

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Facebook Messenger</h1>
      <h3>Hello {username}</h3>

      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Type a message...</InputLabel>
          <Input
            className="app__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            type="submit"
            variant="contained"
            color="primary"
            onClick={sendMessages}
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} message={message} username={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
