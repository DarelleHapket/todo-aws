
# TODO App - Déploiement AWS

Application de gestion de tâches (Todo List) avec :
- **Backend** : Spring Boot (Java) + MariaDB
- **Frontend** : React (Vite)

## Structure du projet
- `backendTODOAPP/` : API REST Spring Boot
- `frontendTodoAPPP/task-manager-frontend/` : Interface utilisateur React

## Déploiement
Déployé sur AWS EC2 avec Nginx comme reverse proxy.

## Installation locale
### Backend
\`\`\`bash
cd backendTODOAPP
./mvnw spring-boot:run
\`\`\`

### Frontend
\`\`\`bash
cd frontendTodoAPPP/task-manager-frontend
npm install
npm run dev
\`\`\`
