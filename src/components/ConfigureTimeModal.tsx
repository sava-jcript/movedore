import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ConfigureTimeModal.module.css';

type Time = {
  time: number;
}

export function ConfigureTimeModal() {
  const { closeConfigureTimeModal, configureTimeCountdown } = useContext(CountdownContext);

  const { register, errors, handleSubmit } = useForm<Time>();

  const onSubmit = handleSubmit((data) => {
    const seconds = data.time * 60;
    configureTimeCountdown(seconds);
    closeConfigureTimeModal();
  })

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2>MINUTOS</h2>

        <div className={styles.inputContainer}>
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="time" className="sr-only">Minutos</label>
              <input
                ref={register({ required: true })}
                type="number"
                id="time"
                name="time"
              />
              {
                errors.time && <div>Digite os minutos</div>
              }
            </div>

            <button type="submit">Salvar</button>
          </form>
        </div>

        <button
          className={styles.closeModalButton}
          type="button"
          onClick={closeConfigureTimeModal}
        >
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>
  );
}