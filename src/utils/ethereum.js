import { ethers } from "ethers";

// Initialiser la connexion avec MetaMask et Ethereum
export const initializeEthereum = async () => {
    try {
        // Vérifier si MetaMask est installé
        if (!window.ethereum) {
            alert("Veuillez installer MetaMask pour utiliser cette application.");
            return null;
        }

        // Demander à l'utilisateur de se connecter à MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Initialiser le provider et le signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Vérifier si un compte est déjà connecté
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length === 0) {
            alert("Aucun compte connecté. Veuillez vous connecter à MetaMask.");
            return null;
        }

        return { provider, signer };

    } catch (error) {
        console.error("Erreur d'initialisation de MetaMask:", error);
        alert("Erreur lors de l'initialisation de MetaMask. Veuillez réessayer.");
        return null;
    }
};

// Récupérer l'adresse du compte connecté
export const getAccount = async (signer) => {
    try {
        // Vérifier que le signer est valide
        if (!signer) {
            alert("Signer invalide. Veuillez vous reconnecter à MetaMask.");
            return null;
        }

        // Récupérer l'adresse du compte
        const account = await signer.getAddress();
        return account;

    } catch (error) {
        console.error("Erreur lors de la récupération de l'adresse:", error);
        alert("Erreur lors de la récupération de l'adresse du compte.");
        return null;
    }
};
