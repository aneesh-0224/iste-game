import React from "react";
import Question from "./components/Question";
import { questionList } from "./data/questionList";
import styled from "styled-components";
let score = 0;
let global_finalAnswer = [];
export default function App({ setAttempted }) {
  const [isQuizStarted, setIsQuizStarted] = React.useState(false);
  const [isQuizFinishsed, setIsQuizFinished] = React.useState(false);
  const [finalAnswer, setFinalAnswer] = React.useState(questionList);
  /*
  the final answer state stores the entire questions array.
  */

  //this function modifies the finalAnswer vairable after every question is done.
  function final_answer(obj) {
    const modified = finalAnswer.map((que) => {
      return que.id === obj.id ? obj : que;
    });
    console.log(modified);
    setFinalAnswer(modified);
    global_finalAnswer = modified;
  }

  //This function calulates the score after all questions are done and stores it in local storage.
  function finalScore() {
    for (let i = 0; i < global_finalAnswer.length; i++) {
      if (
        global_finalAnswer[i].marked ===
        global_finalAnswer[i].correctOptionIndex
      ) {
        score = score + 1;
      }
    }
    localStorage.setItem("score", score);
    localStorage.setItem("attempted", 1);
  }

  //start and finish functions.
  function startQuiz() {
    setIsQuizStarted(true);
  }
  function finishQuiz() {
    setIsQuizFinished(true);
  }
  return (
    <QuizContainer>
      {isQuizStarted ? (
        isQuizFinishsed ? (
          <FinalResult>Your score is : {score}</FinalResult>
        ) : (
          <Question
            finishQuiz={finishQuiz}
            final_answer={final_answer}
            finalScore={finalScore}
          />
        )
      ) : (
        <Container>
          <h1>RULES</h1>
          <ul>
            <li>
              You will be given a coloured text(word) and you have to select the
              "colour" of the word and not the "word" from the options.
            </li>
            <li>
              Remember to <strong> click NEXT</strong> after you select the
              option else the answer <strong> wont be counted </strong>
            </li>
            <li>
              Each question has a time limit of 4.5 seconds,so better be
              quick:))
            </li>
          </ul>
          <h2>Start the quiz now !</h2>
          <button className="btn btn-primary" onClick={startQuiz}>
            Start
          </button>
        </Container>
      )}
    </QuizContainer>
  );
}
const QuizContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2c;
`;
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  min-height: 70vh;
  background-color: #262626;
  padding: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 9px 4px 32px 0px #000000b3;
  color: white;
  margin: 0px 12px;

  button {
    padding: 12px 32px;
    width: 60%;
    font-size: 24px;
    border: none;
    border-radius: 8px;
    margin: 16px 0px;
    cursor: pointer;
    background-color: #13a388;
    color: white;
  }
  li {
    font-size: 24px;
  }
`;
const FinalResult = styled.div`
  width: 100%;
  max-width: 500px;
  height: 30vh;
  background-color: #262626;
  padding: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 9px 4px 32px 0px #000000b3;
  color: white;
  font-size: 32px;
  margin: 0px 12px;
`;
