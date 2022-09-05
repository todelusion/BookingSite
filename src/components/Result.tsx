import React from "react";

interface resultProps {
  children: React.ReactNode;
  setIsLoading: any;
}

export default function Result({ children, setIsLoading }: resultProps) {
  const closeResult = () => {
    setIsLoading("isError", false);
    setIsLoading("isSuccess", false);
  };

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 z-10 flex items-center justify-center bg-white/50 px-20">
      <div className="relative flex h-full max-h-[600px] w-full max-w-6xl flex-col items-center justify-center bg-primary">
        <button onClick={() => closeResult()} className="font-ligjt absolute right-9 top-9 text-2xl text-white ">
          X
        </button>
        {children}
      </div>
    </div>
  );
}
