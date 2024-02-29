import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

const Web_dic = () => {
  const [initial, setInitial] = useState("");
  const [word, setWord] = useState({
    words: "",
    phonetic: "",
    meaning: [],
    audio: "",
  });
  const dictionary = (e) => {
    setInitial(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let dic_value = initial;
    setInitial("");
    console.log(dic_value);

    try {
      let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${dic_value}`;
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);
      const synonyms = data[0].meanings[0].synonyms;
      console.log(synonyms);
      setWord({
        words: initial,
        phonetic: data[0].phonetic,
        meaning: synonyms,
        audio: data[0].phonetics[0].audio,
      });
    } catch (error) {
      console.log("Error message:", error);
    }
  };

  const audioplay = () => {
    let setplay = new Audio(word.audio);
    setplay.play();
  };
  return (
    <div
      className="flex justify-center items-center bg-black text-white p-2"
      style={{ minHeight: "100vh" }}
    >
      <div className="max-w-lg w-full">
        <form onSubmit={handleSubmit} className="w-full flex gap-3">
          <input
            type="text"
            className="flex-1 rounded-md p-2 border-2 border-slate-100 bg-black"
            onChange={dictionary}
            value={initial}
          />
          <button type="submit">
            <FontAwesomeIcon className="h-6" icon={faMagnifyingGlass} />
          </button>
        </form>
        {word && (
          <div className="mt-2 ml-2 text-xl">
            <p>{word.words}</p>
            <p>{word.phonetic}</p>
            {word.meaning.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                <p>synonyms:</p>
                {word.meaning.map((mn, index) => (
                  <p className="flex w-26" key={index}>
                    {mn}
                    <span
                      className={`${
                        index === word.meaning.length - 1 ? "hidden" : "flex"
                      }`}
                    >
                      ,
                    </span>
                  </p>
                ))}
              </div>
            )}
            {word.audio && (
              <button onClick={audioplay}>
                <FontAwesomeIcon icon={faVolumeHigh} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Web_dic;
