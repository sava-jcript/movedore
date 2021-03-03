import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { ConfigureTimeModal } from "../components/ConfigureTimeModal";
import { ChallengesContext } from "./ChallengesContext";
import Cookies from 'js-cookie';

let countdownTimeout: NodeJS.Timeout;

interface CountdownContextData {
  time: number,
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
  countdownTime: number;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children, ...rest }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(rest.countdownTime ?? 1500);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [isConfigureTimeModalOpen, setIsConfigureTimeModalOpen] = useState(false);

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(rest.countdownTime);
    setHasFinished(false);
  }

  function showConfigureTimeModal() {
    setIsConfigureTimeModalOpen(true);
  }

  function closeConfigureTimeModal() {
    setIsConfigureTimeModalOpen(false);
  }

  function configureTimeCountdown(newTimeValue: number) {
    Cookies.set('countdownTime', String(newTimeValue));
    setTime(rest.countdownTime);
    location.reload();
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
      time,
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