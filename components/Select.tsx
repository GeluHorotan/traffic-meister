import React, { FC } from "react";

interface ISelect {
  label: string;
  children: React.ReactNode;
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: FC<ISelect> = ({ children, label, ...rest }) => {
  return (
    <select className="bg-red-400  py-2 rounded-xl max-w-xs" {...rest}>
      <option disabled selected>
        {label}
      </option>
      {children}
    </select>
  );
};

export default Select;
