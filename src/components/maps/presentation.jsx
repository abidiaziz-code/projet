import React from 'react';
import { Link } from 'react-router-dom';

export default function Presentation() {
  return (
    <div className="app-container">
      <div className="container">
        {/* Header Component */}
        <header className="header">
          <h1>Carte Agricole Intelligente de Jendouba</h1>
          <p className="tagline">Votre récolte au bon moment, un pas vers l'agriculture intelligente</p>
        </header>

        {/* Intro Section Component */}
        <section className="intro-section">
          <h2>Un voyage vers une agriculture réfléchie</h2>
          <p>
            La <span className="highlight">Carte Agricole Interactive de Jendouba</span> 
            est une plateforme numérique pionnière qui met la technologie cartographique 
            au service de l'agriculteur tunisien.
          </p>
          <p>
            Nous offrons une solution pratique qui rend la planification agricole plus 
            précise et efficace grâce à une visualisation des cultures et des périodes 
            appropriées pour chaque région.
          </p>
        </section>

        {/* Features Grid Component */}
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>Carte interactive intelligente</h3>
            <ul>
              <li>Carte détaillée de toutes les zones agricoles de Jendouba</li>
              <li>Interaction directe en cliquant sur n'importe quelle zone</li>
              <li>Affichage visuel des cultures prédominantes</li>
              <li>Navigation intuitive et responsive</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Calendrier agricole complet</h3>
            <ul>
              <li>Périodes de plantation optimales pour chaque culture</li>
              <li>Saisons de récolte et prévisions météorologiques</li>
              <li>Conseils saisonniers actualisés</li>
              <li>Alertes personnalisées pour vos cultures</li>
            </ul>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Base de connaissances agricoles</h3>
            <ul>
              <li>Informations détaillées sur 20+ cultures principales</li>
              <li>Conseils agricoles personnalisés par région</li>
              <li>Données réalistes et vérifiées par des agronomes</li>
              <li>Ressources pour une agriculture durable</li>
            </ul>
          </div>
        </div>

        {/* CTA Button Component - تم التصحيح هنا */}
        <div className="cta-button">
          <Link to="/FormComponent">
            Cliquez ici pour remplir le formulaire ✅
            <span className="arrow">→</span>
          </Link>
        </div>

        {/* Footer Component */}
        <footer className="footer">
          <p>Carte Agricole Intelligente de Jendouba &copy; 2026 | Un outil pour l'agriculture moderne</p>
          <p>Contact : info@carteagricole-jendouba.tn | Tél : +216 XX XXX XXX</p>
        </footer>
      </div>

      {/* CSS Styles in JSX */}
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app-container {
          background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
                      url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          min-height: 100vh;
          color: aliceblue;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
        }

        /* Overlay pour améliorer la lisibilité */
        .app-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: -1;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          position: relative;
          z-index: 1;
        }

        /* Header Styles */
        .header {
          text-align: center;
          padding: 30px 20px;
          margin-bottom: 40px;
          background: rgba(0, 80, 0, 0.7);
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        h1 {
          font-family: Arial, Helvetica, sans-serif;
          color: #ffcc00;
          font-size: 2.8rem;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }

        .tagline {
          font-size: 1.4rem;
          color: #fff;
          font-weight: 300;
          margin-bottom: 5px;
        }

        /* Intro Section Styles */
        .intro-section {
          background: rgba(30, 60, 30, 0.85);
          padding: 30px;
          border-radius: 10px;
          margin-bottom: 40px;
          line-height: 1.7;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .intro-section h2 {
          color: #4CAF50;
          margin-bottom: 15px;
          font-size: 1.8rem;
          text-align: center;
        }

        .intro-section p {
          font-size: 1.1rem;
          margin-bottom: 15px;
        }

        /* Features Grid Styles */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 60px;
        }

        .feature-card {
          background: rgba(40, 70, 40, 0.9);
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
        }

        .feature-icon {
          font-size: 3rem;
          margin-bottom: 15px;
          text-align: center;
        }

        .feature-card h3 {
          color: #ffcc00;
          margin-bottom: 15px;
          font-size: 1.4rem;
          text-align: center;
        }

        .feature-card ul {
          padding-left: 20px;
          list-style-type: disc;
        }

        .feature-card li {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        /* CTA Button Styles */
        .cta-button {
          position: fixed;
          bottom: 50px;
          right: 50px;
          background-color: #4CAF50;
          padding: 15px 25px;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          z-index: 100;
        }

        .cta-button:hover {
          background-color: #3d8b40;
          transform: scale(1.05);
        }

        .cta-button a {
          font-size: 18px;
          text-decoration: none;
          color: white;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cta-button .arrow {
          font-size: 24px;
        }

        /* Footer Styles */
        .footer {
          text-align: center;
          padding: 20px;
          margin-top: 40px;
          color: #ccc;
          font-size: 0.9rem;
          background: rgba(0, 0, 0, 0.6);
          border-radius: 10px;
        }

        /* General Styles */
        .highlight {
          color: #ffcc00;
          font-weight: bold;
        }

        a:link {
          color: #4CAF50;
        }

        a:visited {
          color: #ff66b2;
        }

        a:hover {
          color: #ffa500;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          .tagline {
            font-size: 1.1rem;
          }

          .cta-button {
            position: static;
            display: block;
            width: 90%;
            margin: 30px auto;
            text-align: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .container {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}