import React from "react";

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


export default Test1;
