import { useState, useEffect } from "react";
import styled from "styled-components";
import App from "./App";

const Layout = () => {
  const [attempted, setAttempted] = useState(false);
  const reattemptHandler = () => {
    localStorage.removeItem("attempted");
    localStorage.removeItem("score");
    setAttempted(false);
  };
  useEffect(() => {
    setAttempted(localStorage.getItem("attempted"));
  }, []);

  return (
    <Container>
      {attempted ? (
        <Content>
          <p>You already attempted the quiz</p>
          <ReattemptButton onClick={() => reattemptHandler()}>
            Reattempt Quiz
          </ReattemptButton>
        </Content>
      ) : (
        <App setAttempted={setAttempted} />
      )}
    </Container>
  );
};

//temporary items , this is for my convinience
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c2c2c;
`;
const Content = styled.div`
  width: 100%;
  max-width: 600px;
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
const ReattemptButton = styled.button`
  padding: 16px 24px;
  border: none;
  background-color: #13a388;
  font-size: 20px;
  border-radius: 8px;
  cursor: pointer;
  color: white;
`;

export default Layout;
