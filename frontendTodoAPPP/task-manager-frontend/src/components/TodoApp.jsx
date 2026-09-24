// src/components/TodoApp.jsx
import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';

// ========================================
// CONFIGURATION API
// ========================================
const API_BASE_URL = 'http://52.91.21.181:8081/api'; // Votre backend Spring Boot sur le port 8081

function TodoApp({currentUser}) {
  
  // ========================================
  // 1. ÉTATS - DONNÉES ET STATUTS
  // ========================================
  const [tasks, setTasks] = useState([]);           // Liste des tâches (vide au début)
  const [loading, setLoading] = useState(true);     // État de chargement
  const [error, setError] = useState(null);         // Gestion d'erreurs


  // ========================================
  // 2. CHARGEMENT INITIAL DES DONNÉES
  // ========================================
  // useEffect se déclenche au montage du composant
  useEffect(() => {
    // console.log(' TodoApp: Chargement initial des tâches...');
    fetchTasks();
  }, []); // [] = se déclenche une seule fois au montage

  // Fonction pour récupérer toutes les tâches
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(' API: Appel GET /api/tasks...');
      const response = await fetch(`${API_BASE_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log(' API: Tâches reçues:', data);
      
      setTasks(data);
      setLoading(false);
      
    } catch (err) {
      // console.error(' Erreur lors du chargement des tâches:', err);
      setError(err.message);
      setLoading(false);
      
      // En cas d'erreur, on met des données de test pour continuer à développer
      setTasks([
        {
          id: 999,
          title: "Tâche de test (API indisponible)",
          status: "TODO",
          createdAt: new Date().toLocaleTimeString()
        }
      ]);
    }
  };

  // ========================================
  // 3. FONCTIONS CRUD AVEC API
  // ========================================
  
  // AJOUTER une nouvelle tâche
  const handleAddTask = async (newTaskData) => {
    try {
      // console.log(' API: Ajout d\'une nouvelle tâche...', newTaskData);
      
      // Préparer les données pour l'API (format TaskRequest)
      const taskRequest = {
        title: newTaskData.title,
        status: newTaskData.status,
        userId: currentUser.id // ID de l'utilisateur connecté
      };
      
      // console.log('API: Données envoyées:', taskRequest);
      
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskRequest)
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const createdTask = await response.json();
      // console.log(' API: Tâche créée:', createdTask);
      
      // Mettre à jour l'état local
      setTasks([...tasks, createdTask]);
      
    } catch (err) {
      // console.error(' Erreur lors de l\'ajout de la tâche:', err);
      setError(`Erreur ajout: ${err.message}`);
      
      // En cas d'erreur, ajouter quand même localement pour le développement
      const fallbackTask = {
        id: Date.now(),
        ...newTaskData,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, fallbackTask]);
    }
  };

  // SUPPRIMER une tâche
  const handleDeleteTask = async (taskId) => {
    try {
      // console.log(' API: Suppression de la tâche', taskId);
      
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      // console.log(' API: Tâche supprimée');
      
      // Mettre à jour l'état local
      setTasks(tasks.filter(task => task.id !== taskId));
      
    } catch (err) {
      // console.error(' Erreur lors de la suppression:', err);
      setError(`Erreur suppression: ${err.message}`);
      
      // En cas d'erreur, supprimer quand même localement
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // MODIFIER le statut d'une tâche
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // console.log(` API: Changement statut tâche ${taskId} → ${newStatus}`);
      
      const taskRequest = {
        status: newStatus
        // Le titre reste le même, pas besoin de le renvoyer
      };
      
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskRequest)
      });
      
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      
      const updatedTask = await response.json();
      // console.log(' API: Tâche mise à jour:', updatedTask);
      
      // Mettre à jour l'état local
      setTasks(tasks.map(task => 
        task.id === taskId ? updatedTask : task
      ));
      
    } catch (err) {
      // console.error(' Erreur lors de la mise à jour:', err);
      setError(`Erreur modification: ${err.message}`);
      
      // En cas d'erreur, modifier quand même localement
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    }
  };

  // ========================================
  // 4. CALCULS STATISTIQUES
  // ========================================
  const todoCount = tasks.filter(t => t.status === 'TODO').length;
  const enCoursCount = tasks.filter(t => t.status === 'EN_COURS').length;
  const termineeCount = tasks.filter(t => t.status === 'TERMINEE').length;
  const totalCount = tasks.length;

  // ========================================
  // 5. RENDU AVEC GESTION DES ÉTATS DE CHARGEMENT
  // ========================================
  
  // Affichage pendant le chargement
  if (loading) {
    return (
      <div style={containerStyle}>
        <h1>TaskManager</h1>
        <div style={loadingStyle}>
          <p> Chargement des tâches...</p>
          <p>Connexion à l'API Spring Boot...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      
      {/* TITRE ET STATUS */}
      <h1> TaskManager - Connecté à Spring Boot</h1>
      <p>👤 Utilisateur: {currentUser.email}</p>
      
      {/* AFFICHAGE DES ERREURS */}
      {error && (
        <div style={errorStyle}>
          <p> {error}</p>
          <button onClick={() => setError(null)} style={buttonStyle}>
            ✕ Fermer
          </button>
        </div>
      )}
      
      {/* STATISTIQUES EN TEMPS RÉEL */}
      <div style={statsStyle}>
        <div style={statItemStyle}> À faire: {todoCount}</div>
        <div style={statItemStyle}>En cours: {enCoursCount}</div>
        <div style={statItemStyle}> Terminées: {termineeCount}</div>
        <div style={statItemStyle}> Total: {totalCount}</div>
      </div>

      {/* FORMULAIRE D'AJOUT */}
      <TaskForm onAddTask={handleAddTask} />
      
      {/* LISTE DES TÂCHES */}
      <div style={tasksContainerStyle}>
        <div style={headerStyle}>
          <h2>Mes Tâches</h2>
          <button onClick={fetchTasks} style={refreshButtonStyle}>
            Actualiser
          </button>
        </div>
        
        {tasks.length === 0 ? (
          <div style={emptyStyle}>
            <p> Aucune tâche trouvée</p>
            <p>Ajoutez votre première tâche ci-dessus !</p>
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} style={taskItemStyle}>
              <div style={taskInfoStyle}>
                <strong>{task.title}</strong>
                <span style={getStatusStyle(task.status)}>{task.status}</span>
                <small>
                  Créée le: {new Date(task.createdAt).toLocaleDateString('fr-FR')}
                </small>
              </div>
              
              <div style={taskActionsStyle}>
                <select 
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  style={selectStyle}
                >
                  <option value="TODO"> À faire</option>
                  <option value="EN_COURS">⚡ En cours</option>
                  <option value="TERMINEE"> Terminée</option>
                </select>
                
                <button 
                  onClick={() => handleDeleteTask(task.id)}
                  style={deleteButtonStyle}
                >
                  
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
    </div>
  );
}

// ========================================
// 6. FONCTION UTILITAIRE POUR LES STATUTS
// ========================================
function getStatusStyle(status) {
  const baseStyle = {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  switch(status) {
    case 'TODO':
      return { ...baseStyle, background: '#ffc107', color: '#000' };
    case 'EN_COURS':
      return { ...baseStyle, background: '#007bff', color: '#fff' };
    case 'TERMINEE':
      return { ...baseStyle, background: '#28a745', color: '#fff' };
    default:
      return baseStyle;
  }
}

// ========================================
// 7. STYLES
// ========================================
const containerStyle = {
  padding: '20px',
  maxWidth: '900px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f8f9fa'
};

const loadingStyle = {
  textAlign: 'center',
  padding: '50px',
  background: 'white',
  borderRadius: '8px',
  border: '2px solid #007bff'
};

const errorStyle = {
  background: '#f8d7da',
  color: '#721c24',
  padding: '15px',
  borderRadius: '8px',
  border: '1px solid #f5c6cb',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const statsStyle = {
  display: 'flex',
  gap: '15px',
  marginBottom: '30px',
  flexWrap: 'wrap'
};

const statItemStyle = {
  padding: '15px',
  background: 'white',
  borderRadius: '8px',
  border: '2px solid #dee2e6',
  fontWeight: 'bold',
  textAlign: 'center',
  flex: 1,
  minWidth: '150px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

const tasksContainerStyle = {
  background: 'white',
  padding: '20px',
  borderRadius: '8px',
  border: '2px solid #28a745'
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px'
};

const refreshButtonStyle = {
  padding: '8px 16px',
  background: '#17a2b8',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

const emptyStyle = {
  textAlign: 'center',
  padding: '40px',
  color: '#6c757d'
};

const taskItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  background: '#f8f9fa',
  borderRadius: '6px',
  marginBottom: '10px',
  border: '1px solid #e9ecef'
};

const taskInfoStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
};

const taskActionsStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center'
};

const selectStyle = {
  padding: '5px',
  fontSize: '14px',
  border: '1px solid #ddd',
  borderRadius: '4px'
};

const buttonStyle = {
  padding: '6px 12px',
  background: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

const deleteButtonStyle = {
  padding: '8px 12px',
  background: '#dc3545',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default TodoApp;