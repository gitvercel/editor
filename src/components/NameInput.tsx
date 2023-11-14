import styles from "../styles/editor.module.scss";
import { useState } from 'react';

interface NameInputProps {
  name: string;
  onUpdateName: (newName: string) => void;
  subname?: string;
}

export const NameInput: React.FC<NameInputProps> =({ name, onUpdateName,subname }) =>{

  const [isEditing, setEditing] = useState(false);

  const handleNameClick = () => {
    setEditing(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setEditing(false);
    newName.trim() ? onUpdateName(newName) : onUpdateName(name);
  };

  return (
    <>
      {isEditing ? <input type="text" placeholder={name} onBlur={handleBlur} /> 
      : <span className={styles.mainText} onClick={handleNameClick}>
        {name}
        </span>}
      <span className={styles.mutedText}>&nbsp;{subname ?? ''}</span>
    </>
  )
}