import React, { FC, useState } from "react";
import styles from "./OneLineForm.module.css";

export interface OLFProps extends React.ComponentPropsWithoutRef<"input"> {
  inputRef?: (node: HTMLInputElement | null) => void;
  onFormSubmit: (value: string) => Promise<void>;
}

const OneLineForm: FC<OLFProps> = ({
  onFormSubmit,
  inputRef,
  ...inputAttributes
}) => {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (value === "") {
          return;
        }
        await onFormSubmit(value);
        setValue("");
      }}
      className={styles.form}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
        {...inputAttributes}
      />
    </form>
  );
};

export default OneLineForm;
