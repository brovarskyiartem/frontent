import React, { useState, useEffect, useCallback } from 'react';
import './coments_style.css';
import Header from '../../components/header';
import { getComments, addComment } from '../../coments.js'; // Імпортуємо функції

function Coment({ name, coment, date }) {
  return (
    <li className="comment">
      <div className="comment-author">{name}</div>
      <div className="comment-text">{coment}</div>
      {date && <div className="comment-date">{new Date(date).toLocaleString('uk-UA')}</div>}
    </li>
  );
}
function ComentForm({ user, onComentAdded }) {
  const [coment, setComent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const handleSubmit = async () => {
    if (!coment.trim()) return;
    setLoading(true);
    setMessage('');
    try {
      const result = await addComment({
        name: user,
        coment: coment.trim(),
        date: new Date().toISOString()
      });
      if (result.success) {
        setComent('');
        setMessage('Коментар успішно додано!');
        onComentAdded();
      } else {
        setMessage(result.error || 'Помилка при додаванні коментаря');
      }
    } catch (err) {
      console.error('Помилка додавання коментаря:', err);
      setMessage('Помилка мережі');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="comment-form">
      <h3>Додати коментар</h3>
      {message && (
        <div className={message.includes('успішно') ? 'success' : 'error'}>
          {message}
        </div>
      )}
      <div>
        <textarea
          value={coment}
          onChange={(e) => setComent(e.target.value)}
          placeholder="Напишіть ваш коментар..."
          required
        />
        <button onClick={handleSubmit} className="btn" disabled={loading}>
          {loading ? 'Додавання...' : 'Додати коментар'}
        </button>
      </div>
    </div>
  );
}
function Pagination({ currentPage, totalPages, onPageChange, totalComments, commentsPerPage }) {
  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);
      if (currentPage <= 3) {
        end = Math.min(maxVisible, totalPages);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(1, totalPages - maxVisible + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };
  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * commentsPerPage + 1;
  const endItem = Math.min(currentPage * commentsPerPage, totalComments);
  if (totalPages <= 1) return null;
  return (
    <div className="pagination">
      <button className="pagination-btn" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        ← Попередня
      </button>
      {visiblePages[0] > 1 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>
            1
          </button>
          {visiblePages[0] > 2 && <span>...</span>}
        </>
      )}
      {visiblePages.map(page => (
        <button key={page} className={`pagination-btn ${page === currentPage ? 'active' : ''}`} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span>...</span>}
          <button className="pagination-btn" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}
      <button className="pagination-btn" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Наступна →
      </button>
      <div className="pagination-info">
        {startItem}-{endItem} з {totalComments}
      </div>
    </div>
  );
}
function ComentsPage() {
  const [allComents, setAllComents] = useState([]);
  const [displayedComents, setDisplayedComents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('Тестовий користувач'); // Для демонстрації
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(5);

  const loadComents = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getComments();
      if (result.success) {
        setAllComents(result.data);
      } else {
        console.error('Помилка завантаження коментарів:', result.error);
      }
    } catch (err) {
      console.error('Помилка завантаження коментарів:', err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    setDisplayedComents(allComents.slice(startIndex, endIndex));
  }, [allComents, currentPage, commentsPerPage]);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleCommentsPerPageChange = (e) => {
    setCommentsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };
  const checkUserSession = useCallback(() => {
    const session = sessionStorage.getItem('userSession') || localStorage.getItem('userSession');
    const username = sessionStorage.getItem('username') || localStorage.getItem('username');
    if (session && username) {
      setUser(username);
    }
  }, []);
  const handleLogout = () => {
    sessionStorage.removeItem('userSession');
    sessionStorage.removeItem('username');
    localStorage.removeItem('userSession');
    localStorage.removeItem('username');
    setUser(null);
  };
  const handleCommentAdded = () => {
    loadComents();
    setCurrentPage(1);
  };
  useEffect(() => {
    loadComents();
    checkUserSession();
  }, [loadComents, checkUserSession]);

  const totalPages = Math.ceil(allComents.length / commentsPerPage);
  return (
      <div>
        <Header/>
          <div className="content">
            {user ? (
              <div className="user-info">
                <span>Привіт, <strong>{user}</strong>!</span>
                <button onClick={handleLogout} className="btn btn-logout">
                  Вийти
                </button>
              </div>
            ) : (
              <div className="login-prompt">
                <p>Щоб додавати коментарі, потрібно увійти в систему</p>
                <a href="/login" className="btn">Увійти</a>
              </div>
            )}
            {user && (<ComentForm user={user} onComentAdded={handleCommentAdded}/>)}
            {!loading && allComents.length > 0 && (
              <div className="comments-per-page">
                <label>
                  Коментарів на сторінці:
                  <select value={commentsPerPage} onChange={handleCommentsPerPageChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </label>
              </div>
            )}

            {loading ? (
              <div className="loading">Завантаження коментарів...</div>
            ) : (
              <>
                {allComents.length > 0 ? (
                  <>
                    <ul className="comments-list">
                      {displayedComents.map((c, i) => (
                        <Coment key={c.id || i} name={c.name} coment={c.coment} date={c.date}/>
                      ))}
                    </ul>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} totalComments={allComents.length} commentsPerPage={commentsPerPage}/>
                  </>
                ) : (
                  <div className="no-comments">
                    Поки що коментарів немає. Станьте першим!
                  </div>
                )}
              </>
            )}
          </div>
        </div>

  );
}
export default ComentsPage;