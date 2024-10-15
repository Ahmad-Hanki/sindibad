import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-7xl 3xl:max-w-[100rem] mx-auto px-4">
      {children}
    </div>
  );
};

export default Container;
