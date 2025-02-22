# DecentraFund

DecentraFund est une application de financement participatif décentralisée fonctionnant sur la blockchain Ethereum. Les utilisateurs peuvent consulter des projets et y contribuer en envoyant des fonds via MetaMask.

## Fonctionnalités
- Connexion à MetaMask
- Affichage de la liste des projets
- Contribution à un projet en ETH
- Suivi des fonds collectés
- Indicateurs de chargement et gestion des erreurs

## Technologies Utilisées
- **React.js** (avec Bootstrap pour le design)
- **Ethers.js** (interaction avec Ethereum)
- **Solidity** (contrats intelligents Ethereum)

## Prérequis
- MetaMask installé sur votre navigateur
- Node.js et npm installés sur votre machine
- Un contrat déployé sur Ethereum avec son ABI et son adresse

## Installation
1. Clonez le répertoire du projet :
   ```bash
   git clone https://github.com/mansasidibe/DecentraFund.git
   cd DecentraFund
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez l'adresse du contrat dans `App.js` :
   ```javascript
   const contractAddress = "0xYourContractAddress";
   ```
4. Lancez l'application :
   ```bash
   npm start
   ```

## Utilisation
1. Ouvrez l'application dans votre navigateur.
2. Connectez votre portefeuille MetaMask.
3. Consultez les projets listés.
4. Entrez un montant en ETH et cliquez sur "Contribuer" pour financer un projet.

## Améliorations Futures
- Ajout de la création de projets par les utilisateurs.
- Support pour d'autres blockchains (Polygon, BSC, etc.).
- Amélioration de l'UI/UX.
