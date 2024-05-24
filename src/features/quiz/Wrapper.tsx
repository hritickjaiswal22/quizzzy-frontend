import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      {children}
    </div>
  );
}

export default Wrapper;
