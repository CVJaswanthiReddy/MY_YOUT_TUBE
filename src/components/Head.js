import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utilis/appSlice";
import { YOUTUBE_SEARCH_API } from "../utilis/constants";
import { cacheResults } from "../utilis/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  console.log(searchQuery);

  useEffect(() => {
    //make an api call after every key press .but if the difference between 2 api calls is <200ms
    //decline the api call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update an cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };

  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <a href="/">
          <img
            onClick={() => toggleMenuHandler()}
            className="h-8 cursor-pointer"
            src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*IkK5Vqlo6M5_kiFFyMP3lQ.png"
            alt="menu"
          />{" "}
        </a>

        <img
          className="h-8 mx-2"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="youtubelogo"
        />
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            className="px-5 w-[32rem] border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow -lg rounded-lg border-gray-400">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow hover:bg-gray-100">
                  🔍{s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://static.vecteezy.com/system/resources/previews/007/033/146/non_2x/profile-icon-login-head-icon-vector.jpg"
          alt="usericon"
        />
      </div>
    </div>
  );
};
export default Head;
