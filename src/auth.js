const loadUsersFromFile = async () => {
  try {
    console.log('📁 Завантажуємо користувачів з файлу...');
    if (window.fs && window.fs.readFile) {
      try {
        const data = await window.fs.readFile('users.json', { encoding: 'utf8' });
        const users = JSON.parse(data);
        return users;
      } catch (fsError) {
      }
    }
    const response = await fetch('/users.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const users = await response.json();
    console.log('Користувачі завантажені через fetch:', users);
    return users;

  } catch (error) {
    console.error('Помилка завантаження користувачів:', error);
  }
};

export const loginUser = async (username, password) => {
  console.log('🔐 Спроба авторизації:', { username, timestamp: new Date().toISOString() });

  try {
    const users = await loadUsersFromFile();
    const requestBody = {
      username: username.trim(),
      password: password,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };
    console.log({ username: requestBody.username });
    if (!username || !password) {
      throw new Error('Відсутні обов\'язкові поля');
    }
    const user = users.find(u =>
      u.username === username.trim() && u.password === password
    );

    if (user) {
      return {
        success: true,
        data: {
          username: user.username,
          role: user.role || 'User',
          id: user.id,
          message: 'Авторизація успішна'
        },
        status: 200,
        timestamp: new Date().toISOString()
      };

    } else {
      return {
        success: false,
        error: 'Неправильні облікові дані',
        errorType: 'AuthenticationError',
        status: 401,
        timestamp: new Date().toISOString()
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      errorType: error.name,
      timestamp: new Date().toISOString()
    };
  }
};