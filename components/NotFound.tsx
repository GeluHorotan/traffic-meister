import React, { FC } from "react";

// Spinner
import { RotatingLines } from "react-loader-spinner";

interface INotFound {
  children?: React.ReactNode;
  isInField?: boolean;
}

const NotFound: FC<INotFound> = ({ children, isInField }) => {
  if (isInField) {
    return (
      <div className="gap-4 items-center justify-center flex ">
        <RotatingLines
          visible={true}
          width="20"
          strokeColor="blue"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
        <span className="font-semibold ">{children}</span>
      </div>
    );
  } else {
    return (
      <div className="max-[950px]:w-full max-[1500px]:w-[90%] w-[70%] p-6 bg-white rounded-lg flex items-center justify-center gap-8">
        <RotatingLines
          visible={true}
          width="40"
          strokeColor="blue"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
        <span className="font-semibold text-xl">{children}</span>
      </div>
    );
  }
};

export default NotFound;
