import React, { FC } from "react";

interface ISelectItem {
  value: string;

  children: React.ReactNode;
}

const SelectItem: FC<ISelectItem> = ({ children, ...rest }) => {
  return <option {...rest}>{children}</option>;
};

export default SelectItem;
