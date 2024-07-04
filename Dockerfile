# Utiliser l'image Node.js 18 comme image de base
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application en ignorant les conflits de dépendances
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Exposer le port 3000 pour l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
