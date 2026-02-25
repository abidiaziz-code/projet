import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Effacer l'erreur lorsqu'on modifie le champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    }
    
    if (!formData.email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsLoading(false);
      return;
    }
    
    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
      
      const result = await register(userData);
      
      if (result.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    if (!formData.password) return { strength: 0, text: '', color: '' };
    
    let strength = 0;
    if (formData.password.length >= 6) strength++;
    if (/[a-z]/.test(formData.password)) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/\d/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    
    const strengths = [
      { text: 'Très faible', color: 'red' },
      { text: 'Faible', color: 'orange' },
      { text: 'Moyen', color: 'yellow' },
      { text: 'Fort', color: 'lightgreen' },
      { text: 'Très fort', color: 'green' }
    ];
    
    return {
      strength: (strength / 5) * 100,
      text: strengths[strength - 1]?.text || '',
      color: strengths[strength - 1]?.color || ''
    };
  };

  const strength = passwordStrength();

  return (
    <div className="register-form-container">
      <div className="register-card">
        <h2 className="register-title">Créer un compte</h2>
        <p className="register-subtitle">Inscrivez-vous gratuitement</p>
        
        {authError && (
          <div className="alert alert-danger">
            {authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`form-input ${errors.username ? 'input-error' : ''}`}
              placeholder="Votre nom d'utilisateur"
              disabled={isLoading}
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="votre@email.com"
              disabled={isLoading}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`form-input ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill" 
                    style={{
                      width: `${strength.strength}%`,
                      backgroundColor: strength.color
                    }}
                  ></div>
                </div>
                <span className="strength-text">
                  Force du mot de passe: {strength.text}
                </span>
              </div>
            )}
            
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
            
            <div className="password-requirements">
              <h4>Exigences de sécurité:</h4>
              <ul>
                <li className={formData.password.length >= 6 ? 'met' : 'unmet'}>
                  Au moins 6 caractères
                </li>
                <li className={/[a-z]/.test(formData.password) ? 'met' : 'unmet'}>
                  Une lettre minuscule
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'met' : 'unmet'}>
                  Une lettre majuscule
                </li>
                <li className={/\d/.test(formData.password) ? 'met' : 'unmet'}>
                  Un chiffre
                </li>
              </ul>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                disabled={isLoading}
                className="checkbox-input"
              />
              <span className="checkbox-text">
                J'accepte les{' '}
                <Link to="/terms" className="terms-link">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/privacy" className="terms-link">
                  politique de confidentialité
                </Link>
              </span>
            </label>
            {errors.acceptTerms && (
              <div className="error-message">{errors.acceptTerms}</div>
            )}
          </div>
          
          <div className="form-group">
            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : 'S\'inscrire'}
            </button>
          </div>
          
          <div className="login-link-container">
            <span className="login-text">Déjà un compte ?</span>
            <Link to="/login" className="login-link">
              Se connecter
            </Link>
          </div>
        </form>
        
        <div className="social-register">
          <div className="separator">
            <span className="separator-text">Ou s'inscrire avec</span>
          </div>
          
          <div className="social-buttons">
            <button type="button" className="social-button google-button">
              <svg className="social-icon" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            
            <button type="button" className="social-button github-button">
              <svg className="social-icon" viewBox="0 0 24 24">
                <path fill="#333" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;