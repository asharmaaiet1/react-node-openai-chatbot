import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 40px);
  background: ${(props) => props.theme.containerBg};
  // padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  transition: background 0.3s ease;
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  height: 100vh;
  max-height: 800px;
  background: ${(props) => props.theme.panelBg};
  // border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: background 0.3s ease;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${(props) => props.theme.headerBg};
  color: ${(props) => props.theme.headerText};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;

  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const ThemeToggleBtn = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: ${(props) => props.theme.headerText};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Meta = styled.span`
  font-size: 13px;
  font-weight: 500;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 4px;
  border-radius: 20px;
  white-space: nowrap;
`;

export const StatusIndicator = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isLoading ? "red" : "green")};
`;

export const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${(props) => props.theme.messagesBg};
  transition: background 0.3s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.scrollbarThumb};
    border-radius: 3px;

    &:hover {
      background: ${(props) => props.theme.scrollbarHover};
    }
  }
`;

export const Bubble = styled.div`
  padding: 0px 10px;
  border-radius: 12px;
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 14px;
  min-width: 80%;
  max-width: 99%;
  align-self: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  background: ${(props) =>
    props.$isUser ? props.theme.userBubbleBg : props.theme.botBubbleBg};
  color: ${(props) =>
    props.$isUser ? props.theme.userBubbleText : props.theme.botBubbleText};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, color 0.3s ease;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 16px;
  background: ${(props) => props.theme.inputBg};
  border-top: 1px solid ${(props) => props.theme.borderColor};
  flex-shrink: 0;
  transition: background 0.3s ease;

  input {
    flex: 1;
    padding: 12px 16px;
    border: 1px solid ${(props) => props.theme.inputBorder};
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
    background: ${(props) => props.theme.inputBg};
    color: ${(props) => props.theme.inputText};
    transition: border-color 0.2s, box-shadow 0.2s, background 0.3s ease,
      color 0.3s ease;

    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.inputBorderFocus};
      box-shadow: 0 0 0 2px ${(props) => props.theme.inputBorderFocus + "40"};
    }

    &::placeholder {
      color: ${(props) => props.theme.inputPlaceholder};
    }
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    background: ${(props) => props.theme.buttonBg};
    color: ${(props) => props.theme.buttonText};
    min-width: 70px;

    &:hover:not(:disabled) {
      background: ${(props) => props.theme.buttonHoverBg};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px ${(props) => props.theme.buttonBg + "4d"};
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:nth-child(3) {
      background: ${(props) => props.theme.buttonStopBg};

      &:hover:not(:disabled) {
        background: ${(props) => props.theme.buttonStopHoverBg};
        box-shadow: 0 4px 12px ${(props) => props.theme.buttonStopBg + "4d"};
      }
    }
  }
`;
