import React from "react";

export const Buffer = () => {
  return (
    <div style={{position:'relative', height:'100vh',opacity:'0.5'}}>
        <div class="d-flex justify-content-center pt-4">
      <div class="spinner-border text-success" role="status"style={{height:'70px',width:'70px'}}>
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    </div>
  );
};
