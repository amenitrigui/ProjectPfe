import React, { useState } from 'react';

const Test1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password, 'Remember Me:', rememberMe);
    // Authentification ici
  };

  const styles = {
    container: {
      margin: 0,
      padding: 0,
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(120deg, #a6c0fe, #f68084)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginBox: {
      width: '90%',
      maxWidth: '1000px',
      display: 'flex',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
    },
    imageSection: {
      flex: 1,
      background: '#6e8efb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    },
    image: {
      width: '100%',
      height: 'auto',
      maxWidth: '400px',
      objectFit: 'contain',
    },
    formSection: {
      flex: 1,
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '1.5rem',
      color: '#333',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      color: '#444',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    formOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1rem',
      fontSize: '0.9rem',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
    },
    checkbox: {
      marginRight: '0.5rem',
    },
    forgotLink: {
      color: '#6e8efb',
      textDecoration: 'none',
    },
    button: {
      width: '100%',
      padding: '0.8rem',
      backgroundColor: '#6e8efb',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontWeight: 'bold',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    signup: {
      textAlign: 'center',
      marginTop: '1.5rem',
      color: '#555',
    },
    signupLink: {
      color: '#6e8efb',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.imageSection}>
          <img src="/logo.png" alt="Logo" style={styles.image} />
        </div>
        <div style={styles.formSection}>
          <h2 style={styles.title}>Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Email</label>
              <input
                style={styles.input}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Entrez votre email"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">Mot de passe</label>
              <input
                style={styles.input}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Entrez votre mot de passe"
              />
            </div>
            <div style={styles.formOptions}>
              <label style={styles.checkboxLabel}>
                <input
                  style={styles.checkbox}
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Se souvenir de moi
              </label>
              <a href="/forgot-password" style={styles.forgotLink}>Mot de passe oublié ?</a>
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#5a7df4'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6e8efb'}
            >
              Se connecter
            </button>
            <div style={styles.signup}>
              Pas encore de compte ? <a href="/signup" style={styles.signupLink}>S'inscrire</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Test1;
