import { User } from "firebase/auth";
import React, { FC, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import styles from "./OneLineForm.module.css";

interface Props {
  onSubmit: (value: string, user: User) => Promise<void>;
  placeholder: string;
  buttonText: string;
  condition?: (user: User) => boolean;
}

const OneLineForm: FC<Props> = ({
  onSubmit,
  placeholder,
  buttonText,
  condition,
}) => {
  const [value, setValue] = useState("");
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return null;
  }
  if (error) {
    return <p>Error signing in anonymously: {error.message}</p>;
  } else if (!user) {
    return <p>No user signed in</p>;
  }
  if (condition && !condition(user)) {
    return null;
  }
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(value, user);
        setValue("");
      }}
      className={styles.form}
    >
      <div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      </div>

      <button type="submit" disabled={!value}>
        {buttonText}
      </button>
    </form>
  );
};

export default OneLineForm;
