const COMMENTS_STORAGE_KEY = 'comments_data';
const COMMENTS_LOADED_KEY = 'comments_loaded';
const loadInitialComents = async () => {
  try {
    if (window.fs && window.fs.readFile) {
      try {
        const data = await window.fs.readFile('./coments.json', { encoding: 'utf8' });
        const comments = JSON.parse(data);
        return comments;
      } catch (fsError) {
      }
    }
    const response = await fetch('./coments.json');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const comments = await response.json();
    return comments;

  } catch (error) {
    return [];
  }
};
const getStoredComments = async () => {
  const stored = sessionStorage.getItem(COMMENTS_STORAGE_KEY);
  const loaded = sessionStorage.getItem(COMMENTS_LOADED_KEY);

  if (stored && loaded) {
    return JSON.parse(stored);
  } else {
    const initialComments = await loadInitialComents();
    sessionStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(initialComments));
    sessionStorage.setItem(COMMENTS_LOADED_KEY, 'true');
    return initialComments;
  }
};
const saveComments = (comments) => {
  sessionStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
};
export const getComments = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const comments = await getStoredComments();
    return {
      success: true,
      data: comments,
      status: 200,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 500,
      timestamp: new Date().toISOString()
    };
  }
};

export const addComment = async (commentData) => {
  try {
    if (!commentData.name || !commentData.coment) {
      throw new Error('Відсутні обов\'язкові поля');
    }

    if (commentData.coment.trim().length < 3) {
      throw new Error('Коментар занадто короткий');
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    const existingComments = await getStoredComments();
    const newComment = {
      id: Date.now(), // Простий ID на основі часу
      name: commentData.name.trim(),
      coment: commentData.coment.trim(),
      date: commentData.date || new Date().toISOString()
    };

    const updatedComments = [newComment, ...existingComments];
    saveComments(updatedComments);
    return {
      success: true,
      data: newComment,
      message: 'Коментар успішно додано!',
      status: 201,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: 400,
      timestamp: new Date().toISOString()
    };
  }
};
