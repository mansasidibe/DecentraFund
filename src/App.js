import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Card, Col, Container, Form, Row, Alert, Spinner } from 'react-bootstrap';
import './App.css'; // Assurez-vous d'avoir un fichier CSS personnalisé

const contractAddress = "0xYourContractAddress";
const abi = [
    // ABI 
];

const App = () => {
    const [account, setAccount] = useState("");
    const [projects, setProjects] = useState([]);
    const [amount, setAmount] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);  // Pour la gestion de l'état de chargement
    const [error, setError] = useState("");  // Pour afficher les erreurs

    useEffect(() => {
        const init = async () => {
            try {
                setIsLoading(true);
                const { signer } = await initializeEthereum();
                const currentAccount = await getAccount(signer);
                setAccount(currentAccount);
                await loadProjects(signer);
            } catch (error) {
                setError("Erreur lors de l'initialisation : " + error.message);
            } finally {
                setIsLoading(false);
            }
        };
        init();
    }, []);

    const initializeEthereum = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            return { provider, signer };
        } else {
            throw new Error("Veuillez installer MetaMask");
        }
    };

    const getAccount = async (signer) => {
        const address = await signer.getAddress();
        return address;
    };

    const loadProjects = async (signer) => {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const projectCount = await contract.projectCount();
        const loadedProjects = [];
        for (let i = 0; i < projectCount; i++) {
            const project = await contract.projects(i);
            loadedProjects.push(project);
        }
        setProjects(loadedProjects);
    };

    const contributeToProject = async (projectId) => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            setError("Veuillez entrer un montant valide.");
            return;
        }
        try {
            setIsLoading(true);
            setError("");  // Réinitialiser les erreurs
            const { signer } = await initializeEthereum();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            const tx = await contract.contribute(projectId, { value: ethers.utils.parseEther(amount) });
            await tx.wait();
            setShowSuccess(true);
            await loadProjects(signer);
        } catch (error) {
            setError("Erreur lors de la contribution : " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container fluid className="bg-light py-5">
            <Row className="mb-4 text-center">
                <Col>
                    <Card className="bg-dark text-white rounded p-4">
                        <Card.Body>
                            <h1 className="display-4">DecentraFund</h1>
                            <p className="lead">Financement Participatif Décentralisé</p>
                            <h3>Compte: {account}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger" onClose={() => setError("")} dismissible>
                    {error}
                </Alert>
            )}

            {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                    Contribution réussie !
                </Alert>
            )}

            {isLoading && (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Chargement...</p>
                </div>
            )}

            {!isLoading && !error && !isLoading && (
                <Row className="g-4">
                    {projects.map((project, index) => (
                        <Col md={4} key={index}>
                            <Card className="shadow-lg border-0 rounded">
                                <Card.Body>
                                    <Card.Title className="text-primary">{project.title}</Card.Title>
                                    <Card.Text>
                                        {project.description}
                                    </Card.Text>
                                    <p><strong>Objectif:</strong> {ethers.utils.formatEther(project.targetAmount)} ETH</p>
                                    <p><strong>Collecté:</strong> {ethers.utils.formatEther(project.raisedAmount)} ETH</p>
                                    {project.raisedAmount.lt(project.targetAmount) ? (
                                        <div>
                                            <Form.Control
                                                type="number"
                                                placeholder="Montant en ETH"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="mb-3"
                                            />
                                            <Button
                                                variant="primary"
                                                onClick={() => contributeToProject(index)}
                                                className="w-100"
                                            >
                                                Contribuer
                                            </Button>
                                        </div>
                                    ) : (
                                        <span className="text-success">Projet financé avec succès !</span>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default App;
