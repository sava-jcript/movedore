import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { ConfigureTimeModal } from "../components/ConfigureTimeModal";
import { ChallengesContext } from "./ChallengesContext";

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
  showConfigureTimeModal: () => void;
  closeConfigureTimeModal: () => void;
  configureTimeCountdown: (time: number) => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [isConfigureTimeModalOpen, setIsConfigureTimeModalOpen] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
    setHasFinished(false);
  }

  function showConfigureTimeModal() {
    setIsConfigureTimeModalOpen(true);
  }

  function closeConfigureTimeModal() {
    setIsConfigureTimeModalOpen(false);
  }

  function configureTimeCountdown(newTimeValue: number) {
    setTime(newTimeValue);
    console.log(time);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,
      showConfigureTimeModal,
      closeConfigureTimeModal,
      configureTimeCountdown
    }}>
      {children}
      { isConfigureTimeModalOpen && <ConfigureTimeModal />}
    </CountdownContext.Provider>
  );
}