import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Vérification de l'authentification...</p>
      </div>
    );
  }

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    // Sauvegarder l'URL actuelle pour rediriger après la connexion
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Vérifier les rôles si spécifiés
  if (requiredRoles.length > 0) {
    const userHasRequiredRole = user && requiredRoles.includes(user.role);
    
    if (!userHasRequiredRole) {
      return (
        <div className="unauthorized-container">
          <div className="unauthorized-content">
            <h2 className="unauthorized-title">Accès non autorisé</h2>
            <p className="unauthorized-message">
              Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
            <div className="unauthorized-actions">
              <button 
                className="back-button"
                onClick={() => window.history.back()}
              >
                Retour
              </button>
              <Navigate to="/dashboard">
                <button className="dashboard-button">
                  Tableau de bord
                </button>
              </Navigate>
            </div>
          </div>
        </div>
      );
    }
  }

  // Si l'utilisateur est authentifié et a les rôles requis, afficher les enfants
  return children;
};

// Composant pour les routes admin uniquement
export const AdminRoute = ({ children }) => {
  return (
    <PrivateRoute requiredRoles={['admin']}>
      {children}
    </PrivateRoute>
  );
};

// Composant pour les routes utilisateur ou admin
export const UserRoute = ({ children }) => {
  return (
    <PrivateRoute requiredRoles={['user', 'admin']}>
      {children}
    </PrivateRoute>
  );
};

export default PrivateRoute;