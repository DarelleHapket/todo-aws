// src/components/TodoList.jsx
import { useState } from "react";

function TodoList() {
  // ========================================
  // 1. ÉTAT - Ce que le composant retient
  // ========================================
  
  // Tableau d'objets
  const [todos, setTodos] = useState([
    { id: 1, text: "Apprendre React" },
    { id: 2, text: "Faire les courses" },
    { id: 3, text: "Appeler mami" }
  ]);

  const [newTodo, setNewTodo] = useState(''); // Corrigé : setNewTodo

  // ========================================
  // 2. COMPORTEMENT
  // ========================================
  
  // Ajouter une nouvelle tâche
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') { //  trim pour supprimer l'espace
      const nouvelItem = {
        id: Date.now(),
        text: newTodo
      };

      setTodos([...todos, nouvelItem]); // les spraid operator : a la liste qu'il y'avait deja , ajoute ceci
      setNewTodo(''); // Corrigé : setNewTodo
    //   console.log('Ajouté:', nouvelItem);
    }
  };

  // Supprimer une tâche
  const handleDeleteTodo = (idASupprimer) => {
    // ✅ Corrigé : fonction fléchée + !==
    const nouvelleList = todos.filter(todo => todo.id !== idASupprimer);
    setTodos(nouvelleList);
    // console.log('Supprimé ID:', idASupprimer);
  };

  // Changer le texte de l'input
  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  // Ajouter avec Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  // ========================================
  // 3. AFFICHAGE
  // ========================================
  return (
    <div style={containerStyle}>
      
      <h2> Composant Liste (TodoList)</h2>
      
      {/* Section ajout */}
      <div style={addSectionStyle}>
        <input 
          type="text" 
          value={newTodo} 
          onChange={handleInputChange} 
          onKeyPress={handleKeyPress} 
          placeholder="Nouvelle tâche..."
          style={inputStyle}
        />
        <button 
          onClick={handleAddTodo}  
          style={addButtonStyle}
          disabled={newTodo.trim() === ''} 
        >
           Ajouter
        </button>
      </div>

      {/* Affichage de la liste */}
      <div style={listStyle}>
        {todos.length === 0 ? (
          <p style={emptyStyle}>Aucune tâche pour le moment</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} style={itemStyle}>
              <span style={textStyle}>{todo.text}</span>
              <button 
                onClick={() => handleDeleteTodo(todo.id)}
                style={deleteButtonStyle}
              >
                 Supprimer
              </button>
            </div>
          ))
        )}
      </div>

      {/* Debug */}
      {/* <div style={debugStyle}>
        <p><strong>Nombre d'items:</strong> {todos.length}</p>
        <p><strong>Nouvel item:</strong> "{newTodo}"</p>
      </div> */}

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

const addSectionStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
};

const inputStyle = {
  flex: 1,
  padding: '10px',
  fontSize: '16px',
  border: '2px solid #ddd',
  borderRadius: '6px',
  outline: 'none',
};

const addButtonStyle = {
  background: '#4A90E2',
  color: 'white',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '14px',
};

const listStyle = {
  marginBottom: '30px',
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px',
  background: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '6px',
  marginBottom: '8px',
};

const textStyle = {
  flex: 1,
  fontSize: '16px',
  color: '#333',
};

const deleteButtonStyle = {
  background: '#ef4444',
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
};

const emptyStyle = {
  textAlign: 'center',
  color: '#666',
  fontStyle: 'italic',
  padding: '20px',
};

// const debugStyle = {
//   padding: '15px',
//   background: '#f0f0f0',
//   borderRadius: '6px',
//   fontSize: '14px',
// };

export default TodoList;