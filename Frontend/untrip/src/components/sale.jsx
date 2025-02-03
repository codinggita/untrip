import React from "react";
import "../css/sale.css"; // Import the relevant CSS file
import bex from '../img/bex.png'

const SaleBox = () => {
  return (
    <div className="img-bex">
      <div className="img-bes">
        <img
          src={bex}
          alt="Big January Sale"
        />
        <div className="box-text">
          <h1>
            Big January Sale: <br />
            Save 25% or more
          </h1>
          <h5>
            One Key™ members save 25% or more on <br />
            select hotels until Jan 26 (hotels time). Stay <br />
            by Sep 14, 2025.
          </h5>
          <button>Unlock Big January Sale deals</button>
        </div>
      </div>
    </div>
  );
};

export default SaleBox;
