import React from 'react';
import styles from './Control.module.scss';

interface ControlProps {
  setTool: React.Dispatch<React.SetStateAction<string>>;
}

const Control: React.FC<ControlProps> = ({ setTool }) => {
  return (
    

    <div className={styles.controlPanel}>
      <button className={styles.button}  onClick={() => setTool('cursor')}>Взаимодействие</button>
      <button className={styles.button} onClick={() => setTool('shape')}>Добавление</button>
    </div>
  );
};

export default Control;