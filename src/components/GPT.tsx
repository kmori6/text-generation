import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const MODEL_NAME = "gpt-3.5-turbo-0613";

const GPT = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "system", content: "You are my helpful secretary." },
  ]);
  const [text, setText] = useState("");
  const [requesting, setRequesting] = useState(false);

  //   initialize OpenAI API
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const generateText = async () => {
    const newMessages = [...messages];
    newMessages.push({ role: "user", content: text });
    setRequesting(true);
    const response = await openai.createChatCompletion({
      model: MODEL_NAME,
      messages: newMessages,
    });
    if (
      response.data.choices[0].message !== undefined &&
      response.data.choices[0].message.content !== undefined
    ) {
      newMessages.push({
        role: "assistant",
        content: response.data.choices[0].message.content,
      });
    } else {
      newMessages.push({ role: "assistant", content: "" });
    }
    setMessages(newMessages);
    setText("");
    setRequesting(false);
  };

  return (
    <div>
      <div className="container-fluid bg-secondary text-light p-4">
        <div className="row">
          {messages.map((value, index) => {
            if (value.role === "system") {
              return (
                <>
                  <div className="card bg-secondary border-secondary text-light">
                    <div className="row g-0">
                      <div className="col-1 text-center">
                        <i className="bi bi-gear fs-3"></i>
                      </div>
                      <div className="col">
                        <div className="card-body">
                          <p key={index}>{value.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            } else if (value.role === "user") {
              return (
                <>
                  <div className="card bg-secondary border-secondary text-light">
                    <div className="row g-0">
                      <div className="col-1 text-center">
                        <i className="bi bi-emoji-smile-upside-down fs-3"></i>
                      </div>
                      <div className="col">
                        <div className="card-body">
                          <p key={index}>{value.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="card bg-secondary border-secondary text-light">
                    <div className="row g-0">
                      <div className="col-1 text-center">
                        <i className="bi bi-cpu fs-3"></i>
                      </div>
                      <div className="col">
                        <div className="card-body">
                          <p key={index}>{value.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Model input text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
        ></input>
        <button
          className="btn btn-primary"
          type="button"
          onClick={generateText}
          disabled={requesting}
        >
          {requesting ? "Requesting" : "Generate"}
        </button>
        <button
          className="btn btn btn-outline-secondary"
          type="button"
          onClick={() =>
            setMessages([
              { role: "system", content: "You are a helpful assistant." },
            ])
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default GPT;
