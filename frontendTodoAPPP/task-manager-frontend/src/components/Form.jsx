// src/components/Form.jsx 
import { useState } from 'react';

function Form() {

// 1. ÉTATS

const [inputValue, setInputValue] = useState('');
const [messages, setMessages] = useState([]);


// 2. COMPORTEMENTS

const handleSubmit = (e) => {
e.preventDefault();
if (inputValue.trim() === '') {
// alert(' Champ vide !');
return;
}
if (inputValue.length < 3) {
// alert(' Minimum 3 caractères !');
return;
}
// Ajouter le message à la liste
const newMessage = {
id: Date.now(),
text: inputValue,
time: new Date().toLocaleTimeString()
};
setMessages([...messages, newMessage]);
setInputValue(''); // Vider l'input
// console.log(' Message ajouté:', newMessage);
};

const handleChange = (e) => {
setInputValue(e.target.value);
// console.log('Input changé:', e.target.value);
};

const handleDelete = (id) => {
const newMessages = messages.filter(msg => msg.id !== id);
setMessages(newMessages);
// console.log(' Message supprimé:', id);
};

const handleReset = () => {
setInputValue('');
setMessages([]);
// console.log(' Form réinitialisé');
};


// 3. AFFICHAGE (SANS interpolation directe)

return (
<div style={containerStyle}>
<h1> Formulaire de Messages</h1>
<form onSubmit={handleSubmit} style={formStyle}>
<input 
type="text"
value={inputValue}
onChange={handleChange}
placeholder="Votre message (min 3 caractères)..."
style={inputStyle}
/>
<div style={buttonRowStyle}>
<button type="submit" style={submitButtonStyle}>
 Envoyer
</button>
<button type="button" onClick={handleReset} style={resetButtonStyle}>
Reset
</button>
</div>
</form>



{/* Liste des messages */}
<div style={messagesStyle}>
<h3>Messages envoyés:</h3>
{messages.length === 0 ? (
<p>Aucun message pour le moment</p>
) : (
messages.map(message => (
<div key={message.id} style={messageStyle}>
<div style={messageTextStyle}>
<strong>Message: </strong>
<input 
type="text" 
value={message.text}
readOnly 
style={messageInputStyle}
/>
</div>
<div style={messageTimeStyle}>
<input 
type="text" 
value={message.time}
readOnly 
style={timeInputStyle}
/>
</div>
<button 
onClick={() => handleDelete(message.id)}
style={deleteButtonStyle}
>
🗑️
</button>
</div>
))
)}
</div>

</div>
);
}

// ========================================
// 4. STYLES
// ========================================
const containerStyle = {
padding: '20px',
maxWidth: '600px',
margin: '50px auto',
fontFamily: 'Arial, sans-serif',
};

const formStyle = {
marginBottom: '30px',
};

const inputStyle = {
width: '100%',
padding: '12px',
fontSize: '16px',
border: '2px solid #ddd',
borderRadius: '6px',
marginBottom: '15px',
outline: 'none',
boxSizing: 'border-box',
};

const buttonRowStyle = {
display: 'flex',
gap: '10px',
};

const submitButtonStyle = {
background: '#4A90E2',
color: 'white',
border: 'none',
padding: '12px 20px',
borderRadius: '6px',
cursor: 'pointer',
fontSize: '16px',
flex: 1,
};

const resetButtonStyle = {
background: '#6c757d',
color: 'white',
border: 'none',
padding: '12px 20px',
borderRadius: '6px',
cursor: 'pointer',
fontSize: '16px',
flex: 1,
};

const debugStyle = {
padding: '15px',
background: '#f8f9fa',
borderRadius: '6px',
marginBottom: '20px',
display: 'flex',
alignItems: 'center',
gap: '10px',
};

const debugInputStyle = {
padding: '5px',
border: '1px solid #ccc',
borderRadius: '4px',
backgroundColor: '#fff',
minWidth: '200px',
};

const messagesStyle = {
marginTop: '20px',
};

const messageStyle = {
display: 'flex',
alignItems: 'center',
gap: '10px',
padding: '10px',
background: '#f8f9fa',
borderRadius: '6px',
marginBottom: '10px',
};

const messageTextStyle = {
flex: 1,
display: 'flex',
alignItems: 'center',
gap: '5px',
};

const messageInputStyle = {
padding: '5px',
border: '1px solid #ccc',
borderRadius: '4px',
backgroundColor: '#fff',
minWidth: '150px',
};

const messageTimeStyle = {
display: 'flex',
alignItems: 'center',
};

const timeInputStyle = {
padding: '5px',
border: '1px solid #ccc',
borderRadius: '4px',
backgroundColor: '#f0f0f0',
fontSize: '12px',
width: '80px',
};

const deleteButtonStyle = {
background: '#ef4444',
color: 'white',
border: 'none',
padding: '8px 12px',
borderRadius: '4px',
cursor: 'pointer',
};

export default Form;
