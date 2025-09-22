import React from "react";

const Loader = () => {
  return (
    <div
      className="
        w-12 aspect-square rounded-full 
        bg-[#25b09b] 
        mx-auto
        [--_m:conic-gradient(#0000_10%,#000),linear-gradient(#000_0_0)_content-box]
        [mask:var(--_m)]
        [mask-composite:subtract] 
        [-webkit-mask:var(--_m)]
        [-webkit-mask-composite:source-out]
        animate-spinCustom
      "
    ></div>
  );
};

export default Loader;
