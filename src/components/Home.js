import React, { useState, useEffect, useRef } from 'react';
import { generate } from 'random-words';

const Home = () => {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(0);
  const intervalRef = useRef(null);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [currChar, setCurrChar] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const textInput = useRef(null);
  const [selectedTime, setSelectedTime] = useState(5); // Initial selected time

  // Function to generate words
  function generateWords() {
    return new Array(150).fill(null).map(() => generate());
  }

  // useEffect to start countdown and manage focus
  useEffect(() => {
    if (status === 'started') {
      textInput.current.focus();
      setWords(generateWords()); // Set random words when starting
      setCountDown(selectedTime);
    }
  }, [status, selectedTime]);

  // Function to start counting and set words
  function start() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStatus("started");
    setCountDown(selectedTime); // Reset countdown based on selected time
    intervalRef.current = setInterval(() => {
      setCountDown((prevCountDown) => {
        if (prevCountDown === 0) {
          clearInterval(intervalRef.current);
          setStatus("finished");
          return 0;
        } else {
          return prevCountDown - 1;
        }
      });
    }, 1000);
  }

  // Function to stop counting
  function stop() {
    clearInterval(intervalRef.current);
    setStatus("finished");
  }

  // Function handleKeyDown
  function handleKeyDown({ keyCode, key }) {
    // Space bar
    if (keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
      setCurrChar("");
    } // Backspace
    else if (keyCode === 8) {
      setCurrCharIndex(currCharIndex - 1);
      setCurrChar("");
    } else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  // Function to check words of typing and random words
  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if (doesItMatch) {
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
  }

  // Function to determine character class for highlighting
  function getCharClass(wordIdx, charIdx, char) {
    if (wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== 'finished') {
      if (char === currChar) {
        return 'has-background-success';
      } else {
        return 'has-background-danger';
      }
    } else if (wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return 'has-background-danger';
    } else {
      return '';
    }
  }

  // Function to handle time selection change
  function handleTimeChange(e) {
    setSelectedTime(parseInt(e.target.value));
  }
return (
    <section className="hero is-fullheight" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1460602594182-8568137446ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTR8fGJhY2tncm91bmQlMjBpbWFnZSUyMGZvciUyMHR5cGluZ3xlbnwwfHwwfHx8MA%3D%3D)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-three-quarters">
              <div className="has-text-centered">
                <h1 className="title is-1 has-text-primary">Test Your Typing Skill</h1>
                <p className="subtitle is-3 has-text-info section">Time : {countDown} seconds</p>
                {status === 'finished' && countDown === 0 && (
                  <div>
                    <p className="subtitle is-3 has-text-danger">Times Up!</p>
                    <p className="is-size-4 has-text-white">Words Per Minute: {correct}</p>
                    <p className="is-size-4 has-text-white">Accuracy: {Math.round((correct / (correct + incorrect)) * 100)}%</p>
                  </div>
                )}
              </div>
   {/* Time selection container */}
              <div className="has-text-centered"> 
                <label className="label has-text-centered has-text-white is-size-4">Select Test Time (seconds):</label>
                <div className="control">
                  <div className="select">
                    <select value={selectedTime} onChange={handleTimeChange} className="is-size-4">
                      <option value="5">5 seconds</option>
                      <option value="10">10 seconds</option>
                      <option value="15">15 seconds</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="section">
                <div className="field">
                  <div className="control">
                    <input
                      ref={textInput}
                      disabled={status !== "started"}
                      type="text"
                      className="input is-large has-text-centered"
                      onKeyDown={handleKeyDown}
                      value={currInput}
                      onChange={(e) => setCurrInput(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="buttons is-centered">
                {status !== 'started' && (
                  <button className="button is-primary is-large" onClick={start}>Start</button>
                )}
                {status === 'started' && (
                  <button className="button is-danger is-large" onClick={stop}>Stop</button>
                )}
              </div>

              {status === 'started' && (
                <div className="section">
                  <div className="card">
                    <div className="card-content">
                      <div className="content">
                        {words.length > 0 && (
                          words.map((word, i) => (
                            <span key={i}>
                              <span>
                                {word.split("").map((char, idx) => (
                                  <span className={`typing-char ${getCharClass(i, idx, char)}`} key={idx}>{char}</span>
                                ))}
                              </span>
                              <span> </span>
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {status === "finished" && countDown !== 0 && (
                <div className="section">
                  <div className="columns is-centered">
                    <div className="column is-half has-text-centered">
                      <p className="subtitle is-3">Typing Test Results</p>
                      <p className="is-size-4 has-text-white">Words Per Minute: <strong>{correct}</strong></p>
                      <p className="is-size-4 has-text-white">Accuracy: <strong>{Math.round((correct / (correct + incorrect)) * 100)}%</strong></p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
