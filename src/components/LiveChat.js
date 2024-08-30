import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utilis/chatSlice";
import { generateRandomName, makeRandomMessage } from "../utilis/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat.messages);
  useEffect(() => {
    const i = setInterval(() => {
      //API POLLING
      //console.log("API_POLLING");
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: makeRandomMessage(30),
        })
      );
    }, 1500);
    return () => clearInterval(i);
  }, []);
  return (
    <>
      <div className="w-full h-[400px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {chatMessage.map((c, i) => (
            <ChatMessage key={i} name={c.name} message={c.message} />
          ))}
        </div>
      </div>
      <form
        className="w-full p-2 ml-2 border border-black "
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "jassu",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="px-2 w-95"
          type="text"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="px-2 mx-2 bg-green-100">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
