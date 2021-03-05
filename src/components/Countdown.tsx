import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const { time,
    hasFinished,
    isActive,
    resetCountdown,
    startCountdown,
    showConfigureTimeModal } = useContext(CountdownContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        {hasFinished ? (
          <button
            disabled
            className={styles.countdownButton}
          >
            Ciclo encerrado
          </button>
        ) : (
          <>
            {isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}
              >
                Abandonar ciclo
              </button>
            ) : (
              <button
                type="button"
                className={styles.countdownButton}
                onClick={startCountdown}
              >
                Iniciar um ciclo
              </button>
            )}
          </>
        )}

        {hasFinished ? (
          <button
            disabled
            className={styles.configureTimeButton}
            onClick={showConfigureTimeModal}
          >
            Definir tempo
          </button>
        ) : (
          <>
            {isActive ? (
              <button
                disabled
                className={styles.configureTimeButton}
                onClick={showConfigureTimeModal}
              >
                Definir tempo
              </button>
            ) : (
              <button
                className={styles.configureTimeButton}
                onClick={showConfigureTimeModal}
              >
                Definir tempo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}