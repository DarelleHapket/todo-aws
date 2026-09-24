// src/components/Button.jsx
import { useState } from "react";

function Button() {
  // ========================================
  // 1. ÉTATS (State)
  // ========================================
  const [clickCount, setClickCount] = useState(0); // Pour savoir le nombre de fois que le bouton a été cliqué
  const [isPressed, setIsPressed] = useState(false); // Pour savoir si le bouton est enfoncé pour cliquer

  // ========================================
  // 2. COMPORTEMENTS
  // ========================================
  
  // Quand on clique sur le bouton
  const handleClick = () => {
    setClickCount(clickCount + 1);
    console.log(`Bouton cliqué ${clickCount + 1} fois`);
  };

  // Quand on appuie sur le bouton (mousedown)
  const handleMouseDown = () => {
    setIsPressed(true);
    console.log('Bouton enfoncé');
  };

  // Quand on relâche le bouton (mouseup)
  const handleMouseUp = () => {
    setIsPressed(false);
    console.log('Bouton relâché');
  };

  // ========================================
  // 3. AFFICHAGE
  // ========================================
  return (
    <div style={buttonContainerStyle}>
      <button 
        style={{
          ...buttonBaseStyle,
          ...(isPressed ? buttonPressedStyle : {}),
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        Clique-moi ! 
        {/* ({clickCount}) */}
       
      </button>

      {/* Debug simple
      <div style={debugStyle}>
        <p><strong>Clics:</strong> {clickCount}</p>
        <p><strong>Enfoncé:</strong> {isPressed ? 'OUI' : 'NON'}</p>
      </div> */}
    </div>
  );
}

// ========================================
// 4. STYLES JavaScript (en bas comme Input)
// ========================================

const buttonContainerStyle = {
  padding: '20px',
  maxWidth: '500px',
  margin: '50px auto',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const buttonBaseStyle = {
  // Style de base
  background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
  color: 'white',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '600',
  cursor: 'pointer',
  
  // Animations
  transition: 'all 0.2s ease',
  transform: 'translateY(0)',
  boxShadow: '0 4px 8px rgba(74, 144, 226, 0.3)',
  
  // Hover (on peut pas faire :hover en JS, mais on peut simuler)
};

const buttonPressedStyle = {
  transform: 'translateY(1px) scale(0.98)',
  boxShadow: '0 2px 4px rgba(74, 144, 226, 0.2)',
};

const debugStyle = {
  marginTop: '20px',
  padding: '15px',
  background: '#f0f0f0',
  borderRadius: '6px',
  fontSize: '14px',
};

export default Button;