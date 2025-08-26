import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$%&*";

    for (let i = 1; i <= length; i++) {
      let charaterPassword = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charaterPassword);
    }
    setPassword(pass);
  }, [length, number, char, setPassword]);

  const copyPasswordToclipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 16);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, char, passwordGenerator]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800">
        <h1 className="text-white text-center from-neutral-100 text-2xl p-5">
          {" "}
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 text-black text-2xl bg-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToclipBoard}
            className="outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0 cursor-pointer"
          >
            {" "}
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2  mb-2 ">
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="range"
              min={8}
              max={16}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={(e) => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput"> Number</label>
          </div>
          <div className="flex items-center gap-x-1 text-white">
            <input
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              onChange={(e) => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Special Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
