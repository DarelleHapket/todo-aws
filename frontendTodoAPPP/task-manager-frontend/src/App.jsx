// src/App.jsx
import { useState, useEffect } from 'react';
import AuthForm from './components/AuthForm';
import TodoApp from './components/TodoApp';

// ========================================
// COMPOSANT PRINCIPAL DE L'APPLICATION
// ========================================
// Ce composant gère l'état d'authentification global
// Il affiche soit AuthForm (si non connecté) soit TodoApp (si connecté)

function App() {
  
  // ========================================
  // 1. ÉTATS GLOBAUX DE L'APPLICATION
  // ========================================
  const [currentUser, setCurrentUser] = useState(null);    // Utilisateur connecté (null = non connecté)
  const [isLoading, setIsLoading] = useState(true);        // État de chargement initial

  // ========================================
  // 2. PERSISTANCE DE LA SESSION
  // ========================================
  // Sauvegarde/récupération de la session dans localStorage
  
  useEffect(() => {
    // console.log(' App: Vérification de la session sauvegardée...');
    
    // Vérifier si une session existe déjà
    try {
      const savedUser = localStorage.getItem('taskmanager_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        // console.log(' App: Session trouvée:', { id: userData.id, email: userData.email });
        setCurrentUser(userData);
      } else {
        // console.log(' App: Aucune session sauvegardée');
      }
    } catch (error) {
      // console.error(' App: Erreur lecture session:', error);
      // En cas d'erreur, nettoyer le localStorage
      localStorage.removeItem('taskmanager_user');
    }
    
    setIsLoading(false);
  }, []);

  // ========================================
  // 3. FONCTIONS D'AUTHENTIFICATION
  // ========================================
  
  // Fonction appelée quand l'utilisateur se connecte avec succès
  const handleAuthSuccess = (userData) => {
    // console.log('App: Authentification réussie pour:', { id: userData.id, email: userData.email });
    
    // Mettre à jour l'état
    setCurrentUser(userData);
    
    // Sauvegarder la session
    try {
      localStorage.setItem('taskmanager_user', JSON.stringify(userData));
      // console.log(' App: Session sauvegardée');
    } catch (error) {
      // console.error(' App: Erreur sauvegarde session:', error);
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    // console.log(' App: Déconnexion...');
    
    // Nettoyer l'état
    setCurrentUser(null);
    
    // Supprimer la session sauvegardée
    try {
      localStorage.removeItem('taskmanager_user');
      // console.log(' App: Session supprimée');
    } catch (error) {
      // console.error(' App: Erreur suppression session:', error);
    }
  };

  // ========================================
  // 4. RENDU CONDITIONNEL
  // ========================================
  
  // Affichage pendant le chargement initial
  if (isLoading) {
    return (
      <div style={loadingStyle}>
        <h1> TaskManager</h1>
        <p> Chargement de l'application...</p>
        <p>Vérification de la session...</p>
      </div>
    );
  }

  // Si l'utilisateur N'EST PAS connecté → Afficher AuthForm
  if (!currentUser) {
    // console.log(' App: Utilisateur non connecté - Affichage AuthForm');
    return (
      <div>
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // Si l'utilisateur EST connecté → Afficher TodoApp
  // console.log(' App: Utilisateur connecté - Affichage TodoApp');
  return (
    <div>
      {/* HEADER DE L'APPLICATION AVEC DÉCONNEXION */}
      <div style={headerStyle}>
        <div style={userInfoStyle}>
          <span> Connecté en tant que : <strong>{currentUser.email}</strong></span>
          <span style={userIdStyle}>(ID: {currentUser.id})</span>
        </div>
        <button onClick={handleLogout} style={logoutButtonStyle}>
           Déconnexion
        </button>
      </div>

      {/* COMPOSANT PRINCIPAL DE L'APP */}
      <TodoApp currentUser={currentUser} />
      
      {/* FOOTER AVEC INFORMATIONS DEBUG */}
      <div style={footerStyle}>
        <p> Debug: Session active depuis le {new Date().toLocaleString('fr-FR')}</p>
      </div>
    </div>
  );
}

// ========================================
// 5. STYLES
// ========================================
const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f8f9fa',
  fontFamily: 'Arial, sans-serif'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const userInfoStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

const userIdStyle = {
  fontSize: '12px',
  opacity: 0.8
};

const logoutButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 'bold',
  transition: 'background-color 0.3s ease'
};

const footerStyle = {
  padding: '10px 20px',
  backgroundColor: '#e9ecef',
  textAlign: 'center',
  fontSize: '12px',
  color: '#6c757d',
  borderTop: '1px solid #dee2e6'
};

export default App;