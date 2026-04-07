import React from "react";
import "./Background.css";

const Background = ({ condition }) => {
  return (
    <div className={`bg-wrap bg-${condition}`}>
      <div className="bg-layer layer-1"></div>
      <div className="bg-layer layer-2"></div>
      <div className="particles">
        {condition === "rain" && (
          <>
            {[...Array(30)].map((_, i) => (
              <div key={i} className="raindrop" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.6 + Math.random() * 0.6}s`,
                opacity: 0.3 + Math.random() * 0.4,
              }} />
            ))}
          </>
        )}
        {condition === "snow" && (
          <>
            {[...Array(25)].map((_, i) => (
              <div key={i} className="snowflake" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                fontSize: `${0.5 + Math.random() * 1}rem`,
              }}>❄</div>
            ))}
          </>
        )}
        {(condition === "clear" || condition === "cloudy") && (
          <>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="cloud-particle" style={{
                top: `${10 + i * 12}%`,
                animationDelay: `${i * 3}s`,
                animationDuration: `${20 + i * 5}s`,
                opacity: 0.06 + i * 0.01,
                width: `${120 + i * 40}px`,
              }} />
            ))}
          </>
        )}
      </div>
      <div className="bg-noise"></div>
    </div>
  );
};

export default Background;