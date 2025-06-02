import './login_style.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from "../../components/header";
import { loginUser } from '../../auth.js';
const LoginPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setIsDarkMode(now.getHours() >= 18 || now.getHours() < 6);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const savedAttempts = parseInt(localStorage.getItem('attemptCount') || '0');
    setAttemptCount(savedAttempts);
    const savedUserSession = localStorage.getItem('userSession');
    const savedUsername = localStorage.getItem('username');
    if (savedUserSession && savedUsername) {
      const sessionData = {
        username: savedUsername,
        session: savedUserSession,
        loginTime: localStorage.getItem('loginTime') || new Date().toLocaleString('uk-UA')
      };
      setUser(sessionData);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    const loginTime = new Date().toLocaleString('uk-UA');
    const session = `${userData.username}-${Date.now()}`;

    const userWithSession = {...userData, session, loginTime
    };
    localStorage.setItem('userSession', session);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('loginTime', loginTime);

    setUser(userWithSession);
  };
  if (loading) {
    return (
      <div className="loading-container">
        <div>Завантаження...</div>
      </div>
    );
  }
  return (
    <div className={isDarkMode ? 'theme-dark' : 'theme-light'}>
      <Header/>
      <div className="container">
        {!user ? (
          <LoginForm onLogin={handleLogin} attemptCount={attemptCount} setAttemptCount={setAttemptCount}
          />
        ) : (
          <UserDashboard user={user} />
        )}
      </div>
      <StatsSection attemptCount={attemptCount} currentTime={currentTime} isDarkMode={isDarkMode} />
    </div>
  );
};
const LoginForm = ({ onLogin, attemptCount, setAttemptCount }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const validateUsername = (username) => {
    if (username.length <= 3) {
      return { valid: false, message: "Ім'я користувача має бути довшим ніж 3 символи" };
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return { valid: false, message: "Ім'я користувача має містити тільки букви та цифри" };
    }
    return { valid: true, message: "" };
  };
  const validatePassword = (password) => {
    if (password.length <= 6) {
      return { valid: false, message: "Пароль має бути довшим ніж 6 символів" };
    }
    return { valid: true, message: "" };
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!username || !password) {
      alert("Будь ласка, введіть логін і пароль.");
      setIsLoading(false);
      return;
    }
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
    if (!usernameValidation.valid || !passwordValidation.valid) {
      setErrors({
        username: !usernameValidation.valid ? usernameValidation.message : '',
        password: !passwordValidation.valid ? passwordValidation.message : ''
      });
      setIsLoading(false);
      return;
    }
    setErrors({});
    setAttemptCount(prev => {
      const newCount = prev + 1;
      localStorage.setItem('attemptCount', newCount);
      return newCount;
    });
    const loginResult = await loginUser(username, password);

    if (loginResult.success) {
      onLogin({username: username, ...loginResult.data
      });
      setResult({
        type: 'success',
        message: 'Успішна авторизація! Перенаправлення...'
      });
      setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect') || '/';
        window.location.href = redirect;
      }, 2000);

    } else {
      setResult({
        type: 'error',
        message: loginResult.error || 'Помилка авторизації'
      });

      console.error('Login failed:', {
        error: loginResult.error,
        errorType: loginResult.errorType,
        timestamp: loginResult.timestamp
      });
    }

    setIsLoading(false);
  };

  const handleUsernameBlur = () => {
    if (username) {
      const validation = validateUsername(username);
      if (validation.valid) {
        setResult({type: 'success', message: 'Логін коректний!'});
        setTimeout(() => setResult(null), 2000);
      }
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    console.log('Register clicked');
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    console.log('Forgot password clicked');
  };

  return (
    <div className="login-container">
      <div className="circle circle-one"></div>
      <div className="form-container">
        <h1>LOGIN</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={handleUsernameBlur} required/>
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? 'ЗАВАНТАЖЕННЯ...' : 'SUBMIT'}
          </button>
        </form>

        {result && (
          <div className={`result-message result-${result.type}`}>
            <div dangerouslySetInnerHTML={{ __html: result.message }} />
          </div>
        )}

        <div className="attempt-counter">
          Спроба: <span>{attemptCount}</span>
        </div>

        <div className="register-forget">
          <button type="button" onClick={handleRegisterClick} className="link-button">
            REGISTER
          </button>
          <button type="button" onClick={handleForgotPasswordClick} className="link-button">
            FORGOT PASSWORD
          </button>
        </div>
      </div>
      <div className="circle circle-two"></div>
    </div>
  );
};

const UserDashboard = ({ user }) => (
  <div className="login-container">
    <div className="circle circle-one"></div>
    <div className="form-container">
      <h1>Вітаємо!</h1>
      <div className="result-message result-success">
        <h3>Користувач: {user.username}</h3>
        <p>Час входу: {user.loginTime}</p>
        <p>Ви успішно авторизовані в системі Peak Path</p>
        <div style={{marginTop: '20px'}}>
          <Link to="/" className="btn">Перейти на головну</Link>
        </div>
      </div>
    </div>
    <div className="circle circle-two"></div>
  </div>
);

const StatsSection = ({ attemptCount, isDarkMode, currentTime }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const mockWeatherData = {
      temperature: Math.round(Math.random() * 30 - 5),
      condition: isDarkMode ? 'Ніч' : 'День',
      humidity: Math.round(Math.random() * 100),
      windSpeed: Math.round(Math.random() * 20)
    };
    setWeatherData(mockWeatherData);
  }, [isDarkMode]);

  return (
    <div className="stats-section">
      <h2>Статистика системи</h2>
      <div className="weather-info">
        <div className="weather-card">
          <h4>Спроби входу</h4>
          <p>{attemptCount}</p>
        </div>
        <div className="weather-card">
          <h4>Поточний час</h4>
          <p>{currentTime.toLocaleTimeString('uk-UA')}</p>
        </div>
        {weatherData && (
          <>
            <div className="weather-card">
              <h4>Час доби</h4>
              <p>{weatherData.condition}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;