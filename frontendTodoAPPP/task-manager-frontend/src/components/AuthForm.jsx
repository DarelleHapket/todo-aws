
import { useState, useMemo } from 'react';

// ========================================
// COMPOSANT D'AUTHENTIFICATION
// ========================================
// Ce composant gère à la fois le Login ET le Register
// Il communique avec votre UserController Spring Boot

const API_BASE_URL = 'http://52.91.21.181:8081/api';

function AuthForm({ onAuthSuccess }) {
  
  // ========================================
  // 1. ÉTATS DU FORMULAIRE
  // ========================================
  const [mode, setMode] = useState('login');       
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);    
  const [error, setError] = useState(null);        

  // ========================================
  // 2. GESTION DES CHANGEMENTS D'INPUT
  // ========================================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur quand l'utilisateur retape
    if (error) setError(null);
  };

  // ========================================
  // 3. VALIDATION DU FORMULAIRE
  // ========================================
  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('L\'email est obligatoire');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setError('Format d\'email invalide');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('Le mot de passe est obligatoire');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères');
      return false;
    }
    
    return true;
  };

  // ========================================
  // 4. SOUMISSION DU FORMULAIRE
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation côté client
    if (!validateForm()) {
      // console.log(' AuthForm: Validation échouée');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Construire l'URL selon le mode
      const endpoint = mode === 'login' 
        ? `${API_BASE_URL}/users/login`     // POST /api/users/login
        : `${API_BASE_URL}/users/register`; // POST /api/users/register
      
      // console.log(`API: Appel ${mode} vers ${endpoint}...`);
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      
      // console.log(` API: Réponse reçue - Status: ${response.status}`);
      
      if (!response.ok) {
        // Gestion des erreurs spécifiques selon le status
        if (response.status === 400) {
          throw new Error(mode === 'login' 
            ? 'Email ou mot de passe incorrect' 
            : 'Cet email existe déjà'
          );
        }
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const userData = await response.json();
      console.log('API: Utilisateur authentifié:', { 
        id: userData.id, 
        email: userData.email 
      });
      
      // Appeler la fonction de callback du parent avec les données utilisateur
      onAuthSuccess(userData);
      
      // Messages de succès
      if (mode === 'register') {
        // alert('Compte créé avec succès ! Vous êtes maintenant connecté.');
      } else {
        // console.log(' Connexion réussie !');
      }
      
    } catch (err) {
      // console.error(` Erreur lors du ${mode}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // 5. BASCULER ENTRE LOGIN ET REGISTER
  // ========================================
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError(null);
    setFormData({ email: '', password: '' });
  };

  // Optimisation de la validation pour éviter les appels répétés dans le rendu
  const isFormValid = useMemo(() => validateForm(), [formData.email, formData.password]);

  // ========================================
  // 6. RENDU DU COMPOSANT
  // ========================================
  return (
    <div style={containerStyle}>
      
      {/* TITRE PRINCIPAL */}
      <div style={headerStyle}>
        <h1>TaskManager</h1>
        <p>Gérez vos tâches efficacement</p>
      </div>

      {/* FORMULAIRE D'AUTHENTIFICATION */}
      <div style={formContainerStyle}>
        
        {/* TITRE DU FORMULAIRE */}
        <h2 style={titleStyle}>
          {mode === 'login' ? ' Connexion' : ' Inscription'}
        </h2>
        
        {/* AFFICHAGE DES ERREURS */}
        {error && (
          <div style={errorStyle}>
             {error}
          </div>
        )}
        
        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit}>
          
          {/* INPUT EMAIL */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}> Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="votre.email@exemple.com"
              style={inputStyle}
              disabled={loading}
            />
          </div>
          
          {/* INPUT MOT DE PASSE */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}> Mot de passe :</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Au moins 6 caractères"
              style={inputStyle}
              disabled={loading}
            />
          </div>
          
          {/* BOUTON DE SOUMISSION */}
          <button 
            type="submit"
            disabled={loading}
            style={{
              ...submitButtonStyle,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? (
              mode === 'login' ? ' Connexion...' : ' Inscription...'
            ) : (
              mode === 'login' ? ' Se connecter' : ' Créer le compte'
            )}
          </button>
          
        </form>
        
        {/* LIEN POUR BASCULER ENTRE LOGIN ET REGISTER */}
        <div style={switchModeStyle}>
          <p>
            {mode === 'login' 
              ? "Pas encore de compte ?" 
              : "Déjà un compte ?"
            }
          </p>
          <button onClick={toggleMode} style={linkButtonStyle} disabled={loading}>
            {mode === 'login' 
              ? " S'inscrire" 
              : " Se connecter"
            }
          </button>
        </div>
        
      </div>
      
      {/* SECTION DEBUG - ÉTAT DU FORMULAIRE
      <div style={debugStyle}>
        <h4>🔍 État du formulaire :</h4>
        <p><strong>Mode :</strong> {mode === 'login' ? ' Connexion' : ' Inscription'}</p>
        <p><strong>Email :</strong> {formData.email || '(vide)'}</p>
        <p><strong>Mot de passe :</strong> {formData.password ? '•'.repeat(formData.password.length) : '(vide)'}</p>
        <p><strong>Valide :</strong> {isFormValid ? ' OUI' : ' NON'}</p>
        <p><strong>En cours :</strong> {loading ? ' OUI' : 'NON'}</p>
      </div> */}
      
    </div>
  );
}

// ========================================
// 7. STYLES
// ========================================
const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  fontFamily: 'Arial, sans-serif',
  padding: '20px'
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '30px'
};

const formContainerStyle = {
  background: 'white',
  padding: '40px',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  border: '2px solid #007bff',
  width: '100%',
  maxWidth: '400px',
  marginBottom: '20px'
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  color: '#007bff'
};

const errorStyle = {
  background: '#f8d7da',
  color: '#721c24',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #f5c6cb',
  marginBottom: '20px',
  textAlign: 'center'
};

const inputGroupStyle = {
  marginBottom: '20px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#495057'
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  border: '2px solid #dee2e6',
  borderRadius: '6px',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  boxSizing: 'border-box'
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'white',
  background: '#007bff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginBottom: '20px'
};

const switchModeStyle = {
  textAlign: 'center',
  paddingTop: '20px',
  borderTop: '1px solid #dee2e6'
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#007bff',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontSize: '14px',
  fontWeight: 'bold'
};

const debugStyle = {
  background: 'white',
  padding: '15px',
  borderRadius: '8px',
  border: '2px solid #28a745',
  width: '100%',
  maxWidth: '400px',
  fontSize: '14px'
};

export default AuthForm;
