// src/components/TaskForm.jsx
// ========================================
// COMPOSANT ENFANT - FORMULAIRE AVEC PROPS
// ========================================
// Ce composant était votre Form.jsx, mais maintenant il utilise des props
// Au lieu de gérer sa propre liste de messages, il envoie les données au parent

import { useState } from 'react';

function TaskForm(props) {
  
  // ========================================
  // 1. ÉTATS LOCAUX - CE QUE LE FORM GÈRE SEUL
  // ========================================
  // Le form garde seulement les données temporaires (ce qu'on tape)
  // Il ne garde plus la liste des tâches - c'est le parent qui s'en occupe !
  
  const [inputValue, setInputValue] = useState('');        // Ce qu'on tape dans l'input
  const [selectedStatus, setSelectedStatus] = useState('TODO'); // Statut sélectionné
  
  // ========================================
  // 2. FONCTION DE SOUMISSION - LA COMMUNICATION AVEC LE PARENT
  // ========================================
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // console.log(' Form: Tentative de soumission...');
    // console.log(' Form: Valeur actuelle:', inputValue);
    // console.log('Form: Statut sélectionné:', selectedStatus);
    
    // VALIDATIONS (comme dans votre Form.jsx original)
    if (inputValue.trim() === '') {
      // console.log(' Form: Champ vide, abandon');
      return; // Sortir de la fonction si vide
    }
    
    if (inputValue.length < 3) {
      // console.log(' Form: Trop court (moins de 3 caractères), abandon');
      return; // Sortir si trop court
    }
    
    // console.log('Form: Validation OK, création de la tâche...');
    
    // CRÉATION DE LA NOUVELLE TÂCHE
    // Même structure que vos tâches existantes
    const newTask = {
      id: Date.now(),                              // ID unique basé sur l'heure actuelle
      title: inputValue.trim(),                    // Le texte tapé (sans espaces)
      status: selectedStatus,                      // Le statut choisi
      createdAt: new Date().toLocaleTimeString()   // Heure de création
    };
    
    // console.log(' Form: Nouvelle tâche créée:', newTask);
    
    // ========================================
    //  LA MAGIE DES PROPS : COMMUNICATION AVEC LE PARENT
    // ========================================
    // Au lieu de faire setMessages([...messages, newTask]) comme avant,
    // on appelle la fonction que le parent nous a donnée !
    
    // console.log(' Form: Appel du parent via props.onAddTask...');
    props.onAddTask(newTask); // ← LE PARENT VA RECEVOIR CETTE TÂCHE !
    
    // RESET DU FORMULAIRE (comme dans votre version originale)
    setInputValue('');           // Vider l'input
    setSelectedStatus('TODO');   // Remettre le statut par défaut
    
    // console.log('Form: Formulaire réinitialisé');
  };

  // ========================================
  // 3. FONCTION POUR GÉRER LES CHANGEMENTS D'INPUT
  // ========================================
  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Debug en temps réel (comme dans votre Input.jsx)
    // console.log(' Form: Texte changé:', newValue);
  };

  // ========================================
  // 4. RENDU - L'INTERFACE UTILISATEUR
  // ========================================
  return (
    <div style={containerStyle}>
      
      {/* TITRE DU FORMULAIRE */}
      <h2> Nouvelle Tâche</h2>
      <p style={subtitleStyle}>
         Ce formulaire envoie les données au parent via props !
      </p>
      
      {/* LE FORMULAIRE */}
      <div style={formStyle}>
        
        {/* INPUT POUR LE TITRE */}
        <input 
          type="text"
          value={inputValue}                    // Valeur contrôlée par React
          onChange={handleChange}               // Fonction appelée à chaque frappe
          placeholder="Titre de la tâche (min 3 caractères)..."
          style={{
            ...inputStyle,
            // Style conditionnel : rouge si erreur, bleu si focus
            borderColor: inputValue.length > 0 && inputValue.length < 3 ? '#dc3545' : '#007bff'
          }}
        />
        
        {/* SELECT POUR LE STATUT */}
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={selectStyle}
        >
          <option value="TODO"> À faire</option>
          <option value="EN_COURS"> En cours</option>
          <option value="TERMINEE"> Terminée</option>
        </select>
        
        {/* BOUTON DE SOUMISSION */}
        <button 
          onClick={handleSubmit}
          style={{
            ...submitButtonStyle,
            // Bouton désactivé si les conditions ne sont pas remplies
            opacity: (inputValue.trim() === '' || inputValue.length < 3) ? 0.5 : 1,
            cursor: (inputValue.trim() === '' || inputValue.length < 3) ? 'not-allowed' : 'pointer'
          }}
          disabled={inputValue.trim() === '' || inputValue.length < 3} // Désactiver si invalide
        >
           Ajouter la tâche
        </button>
        
      </div>
      
      {/* SECTION DEBUG - TEST DE LA LIGNE PROBLÉMATIQUE
      <div style={debugStyle}>
        <h4> État du formulaire :</h4>
        
        {/*  LIGNE PROBLÉMATIQUE (plusieurs TextNodes mixés) */}
        {/* <p><strong>Titre :</strong> {inputValue} ({inputValue.length} caractères)</p> */}
        
        {/*  VERSION CORRIGÉE (un seul TextNode) */}
        {/* <p><strong>Titre :</strong> {`${inputValue} (${inputValue.length} caractères)`}</p>
        
        <p><strong>Statut :</strong> {selectedStatus}</p>
        <p><strong>Valide :</strong> {(inputValue.trim() !== '' && inputValue.length >= 3) ? 'OUI' : ' NON'}</p>
        <p><strong>Fonction parent reçue :</strong> {props.onAddTask ? ' OUI' : '❌ NON'}</p>
      </div> */} 
      
    </div>
  );
}

// ========================================
// 5. STYLES - PRÉSENTATION DU FORMULAIRE
// ========================================
const containerStyle = {
  padding: '20px',
  background: '#e7f3ff',           // Fond bleu clair
  borderRadius: '8px',
  marginBottom: '30px',
  border: '2px solid #007bff',     // Bordure bleue
  fontFamily: 'Arial, sans-serif'
};

const subtitleStyle = {
  color: '#495057',
  fontSize: '14px',
  marginBottom: '20px',
  fontStyle: 'italic'
};

const formStyle = {
  display: 'flex',
  gap: '15px',                     // Espace entre les éléments
  flexWrap: 'wrap',                // Retour à la ligne si nécessaire
  alignItems: 'center',
  marginBottom: '20px'
};

const inputStyle = {
  flex: 1,                         // Prend tout l'espace disponible
  padding: '12px',
  fontSize: '16px',
  border: '2px solid #007bff',
  borderRadius: '6px',
  outline: 'none',
  minWidth: '250px',               // Largeur minimum
  transition: 'border-color 0.3s ease', // Animation lors du changement
  boxSizing: 'border-box'
};

const selectStyle = {
  padding: '12px',
  fontSize: '16px',
  border: '2px solid #007bff',
  borderRadius: '6px',
  outline: 'none',
  backgroundColor: 'white',
  cursor: 'pointer'
};

const submitButtonStyle = {
  padding: '12px 24px',
  background: '#28a745',           // Vert pour l'action positive
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',     // Animation sur hover
  minWidth: '180px'
};

const debugStyle = {
  padding: '15px',
  background: '#f8f9fa',           // Fond gris clair
  borderRadius: '6px',
  border: '1px solid #dee2e6',
  fontSize: '14px',
  marginTop: '15px'
};

export default TaskForm;