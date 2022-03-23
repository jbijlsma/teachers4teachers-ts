import React from "react";

const EmptyPage = () => {
  return (
    <div className="flex card-container blue-container overflow-hidden">
      <div className="flex-none flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 px-5 py-3 border-round">
        PrimeFlex
      </div>
      <div className="flex-grow-1 flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 px-5 py-3 border-round">
        PrimeFlex
      </div>
      <div className="flex-none flex align-items-center justify-content-center bg-blue-500 font-bold text-white m-2 px-5 py-3 border-round">
        PrimeFlex
      </div>
    </div>
  );
};

const comparisonFn = function (prevProps: any, nextProps: any) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(EmptyPage, comparisonFn);
