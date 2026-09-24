
import { useState } from "react";


function Input(){
//1-etats
    const [inputValue , setInputValue] = useState('');
    const [isFocused , setIsFocused] = useState(false);//savoir si l'utilisateur est entrain d'utiliser l'input ou pas 

    //2-comportement

   const handleChange = (e) =>{
    setInputValue(e.target.value);
    console.log('Texte:' , e.target.value);
   };

   //quand on clique dans l'input 
   const handleFocus = () =>{
    setIsFocused(true);
    console.log('Input selection');
   };


  //quand on sort de l'input
  const handleBlur = () =>{
    setIsFocused(false);
    console.log('Input quitte');
  };

    //affichage

    return(
        <div style = {containerStyle}>
            {/* <h2>Composant Input SImple</h2> */}

            <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Taper ici..."
            style={{...inputStyle, ...(isFocused ? focusedStyle : {}),
        }}

        />
            
        </div>
    )
}

//stylesssss

const containerStyle = {
  padding: '20px',
  maxWidth: '400px',
  margin: '50px auto',
  fontFamily: 'Arial, sans-serif',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  border: '2px solid #ddd',
  borderRadius: '8px',
  outline: 'none',
  transition: 'all 0.3s ease',
  marginBottom: '20px',
};

const focusedStyle = {
  borderColor: '#4A90E2',
  boxShadow: '0 0 5px rgba(74, 144, 226, 0.5)',
};

const debugStyle = {
  padding: '15px',
  background: '#f0f0f0',
  borderRadius: '6px',
  fontSize: '14px',
};

export default Input;

