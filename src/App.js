import React, { useState, useEffect } from "react";
import "./App.css";
import subject1 from "./subject.png";

const App = () => {
  // State variables
  const [iso, setIso] = useState(400); // Midpoint ISO (Normal exposure)
  const [focus, setFocus] = useState(3); // Focus in meters (m)
  const [shutterSpeed, setShutterSpeed] = useState(1 / 100); // Default: 1/100s
  const [motion, setMotion] = useState(0); // Simulated subject motion
  const [aperture, setAperture] = useState(2.8); // Aperture (affects background blur and brightness)
  const [ghostOpacity, setGhostOpacity] = useState(0);
  const [subjectPosition, setSubjectPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubjectPosition((prev) => (prev === 10 ? -10 : 10));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Exposure calculation
  const calculateBrightness = () => {
    return iso / 400; // Normal brightness at ISO 400
  };

  // Focus depth calculation
  const calculateBlur = (depth) => {
    const blurAmount = Math.abs(depth - focus) * 5; // Blur effect based on focus distance
    return Math.min(blurAmount, 10); // Limit max blur for realism
  };

  // Background blur and brightness based on aperture
  const calculateBackgroundBlur = () => {
    return Math.max(0, (10 - aperture) * 0.5); // Lower aperture increases background blur
  };

  const calculateBackgroundBrightness = () => {
    return Math.max(0.5, aperture / 10); // Lower aperture reduces background brightness
  };

  // Motion simulation (Ghosting effect for slow shutter speeds)
  useEffect(() => {
    setGhostOpacity(shutterSpeed < 0.2 ? Math.max(0, Math.min(1, (1 - shutterSpeed) * 0.8)) : 0);
  }, [shutterSpeed]);

  return (
    <div className="app">
      <h1>Camera Simulator</h1>
      {/* Image Scene */}
      <div style={{ position: "relative", width:"100%", }}>
        {/* Background Image */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1j24FzG-3_rUXMeFsYvO8YSHv6jpl9aRmnw&s"
          alt="Background"
          className="background"
          style={{
            filter: `blur(${calculateBackgroundBlur()}px) brightness(${calculateBackgroundBrightness()})`,
            position:"relative",
            zIndex: 1,
            width: "100%",
          }}
        />

        {/* Subject Image (Overlayed on Background) */}
        <img
          src={subject1}
          alt="Subject"
          className="subject"
          style={{
            filter: `brightness(${calculateBrightness()}) blur(${calculateBlur(2)}px)`,
            transform: `translateX(${subjectPosition}px)`,
            position: "absolute",
            left:"0",
            zIndex: 2,
            transition: "transform 1s ease-in-out",
          }}
        />

        {/* Ghosting Effect */}
        {shutterSpeed < 0.2 && (
          <img
            src={subject1}
            alt="Ghosting"
            style={{
              position: "absolute",
              left: `${subjectPosition + 15}px`,
              // top: "0px",
              opacity: ghostOpacity,
              filter: `brightness(${calculateBrightness() * 0.8}) blur(${calculateBlur(2)}px)`,
              zIndex: 3,
            }}
          />
        )}
      </div>

      {/* Focus Slider */}
      <div className="slider-container">
        <label>
          Focus Distance: <span>{focus}m</span>
        </label>
        <input
          type="range"
          min="1"
          max="10"
          step="0.1"
          value={focus}
          onChange={(e) => setFocus(Number(e.target.value))}
        />
      </div>

      {/* ISO Slider */}
      <div className="slider-container">
        <label>
          ISO: <span>{iso}</span>
        </label>
        <input
          type="range"
          min="100"
          max="1600"
          step="100"
          value={iso}
          onChange={(e) => setIso(Number(e.target.value))}
        />
      </div>

      {/* Shutter Speed Slider */}
      <div className="slider-container">
        <label>
          Shutter Speed: <span>1/{Math.round(1 / shutterSpeed)} sec</span>
        </label>
        <input
          type="range"
          min="0.01"
          max="1"
          step="0.01"
          value={shutterSpeed}
          onChange={(e) => setShutterSpeed(Number(e.target.value))}
        />
      </div>

      {/* Aperture Slider */}
      <div className="slider-container">
        <label>
          Aperture (f-stop): <span>f/{aperture}</span>
        </label>
        <input
          type="range"
          min="1.4"
          max="16"
          step="0.1"
          value={aperture}
          onChange={(e) => setAperture(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default App;





// import React, { useState } from "react";
// import "./App.css";
// import subject1 from "./subject.png";

// const App = () => {
//   // State variables
//   const [iso, setIso] = useState(400); // Midpoint ISO (Normal exposure)
//   const [focus, setFocus] = useState(3); // Focus in meters (m)
//   const [shutterSpeed, setShutterSpeed] = useState(1 / 100); // Default: 1/100s
//   const [motion, setMotion] = useState(0); // Simulated subject motion

//   // Exposure calculation
//   const calculateBrightness = () => {
//     return iso / 400; // Normal brightness at ISO 400
//   };

//   // Focus depth calculation
//   const calculateBlur = (depth) => {
//     const blurAmount = Math.abs(depth - focus) * 5; // Blur effect based on focus distance
//     return Math.min(blurAmount, 10); // Limit max blur for realism
//   };

//   // Motion simulation (Ghosting effect for slow shutter speeds)
//   const motionEffectStyle = {
//     position: "absolute",
//     top: "10px",
//     left: `${(1 / shutterSpeed) * 10}px`, // Offset based on speed
//     opacity: Math.max(0, Math.min(1, (1 - shutterSpeed) * 0.8)),
//     filter: `brightness(${calculateBrightness() * 0.8}) blur(${calculateBlur(2)}px)`,
//   };

//   return (
//     <div className="app">
//       <h1>Camera Simulator</h1>

//       {/* Image Scene */}
//       <div className="scene" style={{ position: "relative" }}>
//         {/* Background Image */}
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1j24FzG-3_rUXMeFsYvO8YSHv6jpl9aRmnw&s"
//           alt="Background"
//           className="background"
//           style={{ filter: `blur(${calculateBlur(5)}px)` }}
//         />

//         {/* Ghosting Effect */}
//         {shutterSpeed < 0.2 && (
//           <img
//             src="./subject.png"
//             alt="Ghosting"
//             style={motionEffectStyle}
//           />
//         )}

//         {/* Subject Image */}
//         <img
//           src={subject1}
//           alt="Subject"
//           className="subject"
//           style={{
//             filter: `brightness(${calculateBrightness()}) blur(${calculateBlur(2)}px)`,
//             transform: `translateX(${motion}px)`,
//           }}
//         />
//       </div>

//       {/* Focus Slider */}
//       <div className="slider-container">
//         <label>
//           Focus Distance: <span>{focus}m</span>
//         </label>
//         <input
//           type="range"
//           min="1"
//           max="10"
//           step="0.1"
//           value={focus}
//           onChange={(e) => setFocus(Number(e.target.value))}
//         />
//       </div>

//       {/* ISO Slider */}
//       <div className="slider-container">
//         <label>
//           ISO: <span>{iso}</span>
//         </label>
//         <input
//           type="range"
//           min="100"
//           max="1600"
//           step="100"
//           value={iso}
//           onChange={(e) => setIso(Number(e.target.value))}
//         />
//       </div>

//       {/* Shutter Speed Slider */}
//       <div className="slider-container">
//         <label>
//           Shutter Speed: <span>1/{Math.round(1 / shutterSpeed)} sec</span>
//         </label>
//         <input
//           type="range"
//           min="0.01"
//           max="1"
//           step="0.01"
//           value={shutterSpeed}
//           onChange={(e) => {
//             const speed = Number(e.target.value);
//             setShutterSpeed(speed);
//             setMotion(speed < 0.2 ? (1 / speed) * 5 : 0);
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default App;