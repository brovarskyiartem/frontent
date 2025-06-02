import React, { useState, useEffect } from 'react';
import Header from '../../components/header.jsx'
import './mainpage.css';

const MainPage = () => {
  useEffect(() => {
    document.addEventListener("scroll", function () {
      let scrollY = window.scrollY;
      let scaleValue = 1 + scrollY * 0.001;
      let text = document.querySelector(".text-container");
      let container = document.querySelector(".first-container");
      if (container) {
        container.style.transform = `scale(${Math.min(scaleValue, 1.5)})`;
        container.style.transformOrigin = "top center";
      }
      if (text) {
        text.style.fontSize = "5pc";
      }
    });
  }, []);

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div>
      <div>
        <button className="floating-element-1" onClick={() => scrollToElement('section-info')}>
          🆘 Допомога 24/7
        </button>
      </div>

      <div className="floating-element-3">
        📢 Спеціальна знижка -20% на оренду будь якого спорядження!
      </div>

      <div className="wrapper">
        <div className="first-container"></div>
        <Header/>
        <div className="text-container">
          <p className="head-text">Для тих, хто завжди шукає нові пригоди.</p>
        </div>
      </div>

      <div className="second-container">
        <div className="mountians">
          <img src="./img/mountians.png" alt="" className="mountian-img" />
        </div>
        <div className="black-fon"></div>

        <div className="about-comp">
          <div className="text-about-comp">
            <div className="left-text-comp">
              <img className="text-logo" src="./img/logo.png" alt="" />
            </div>
            <div className="right-text-comp">
              <p>Наша компанія взагалі сама класна і ми вам допоможемо</p>
            </div>
          </div>
        </div>

        <div className="attraction">
          <div className="wrapper-attraction">
            <ul className="attraction-ul">
              <li className="attraction-li">
                <Link to="/lakes">
                  <img src="./img/lakes.jpg" alt="" className="li-photo" />
                  <p>Озера</p>
                </Link>
              </li>
              <li className="attraction-li">
                <Link to="/waterfalls">
                  <img src="./img/waterfall.jpg" alt="" className="li-photo" />
                  <p>Водоспади</p>
                </Link>
              </li>
              <li className="attraction-li">
                <Link to="/instahouses">
                  <img src="./img/instahouses2.jpeg" alt="" className="li-photo" />
                  <p>Інстабудиночки</p>
                </Link>
              </li>
              <li className="attraction-li">
                <Link to="/peaks">
                  <img src="./img/peaks.jpg" alt="" className="li-photo" />
                  <p>Вершини</p>
                </Link>
              </li>
              <li className="attraction-li">
                <Link to="/forest">
                  <img src="./img/forest.jpg" alt="" className="li-photo" />
                  <p>Ліси</p>
                </Link>
              </li>
              <li className="attraction-li">
                <Link to="/hidden">
                  <img src="./img/hide_places.jpg" alt="" className="li-photo" />
                  <p>Сховані перлини</p>
                </Link>
              </li>
              <li className="attraction-li">
                <Link to="/culture">
                  <img src=".e/img/cult2.jpg" alt="" className="li-photo" />
                  <p>Культура</p>
                </Link>
              </li>
              <li className="attraction-li">
                <Link to="/rocks">
                  <img src="./img/rock.jpeg" alt="" className="li-photo" />
                  <p>Скелі</p>
                </Link>
              </li>
            </ul>
          </div>

          <div className="difficulty">
            <h1 className="difficulty-lable">На скільки важкий рівень?</h1>
            <div className="wrapper-difficulty">
              <ul className="difficulty-ul">
                <li className="difficulty-li">
                  <Link to="/easy">
                    <img src="./img/level/easy.png" alt="" className="li-difficulty-photo" />
                    <p>Легкий</p>
                  </Link>
                </li>
                <li className="difficulty-li">
                  <Link to="/medium">
                    <img src="./img/level/medium.png" alt="" className="li-difficulty-photo" />
                    <p>Середній</p>
                  </Link>
                </li>
                <li className="difficulty-li">
                  <Link to="/hard">
                    <img src="./img/level/hard.png" alt="" className="li-difficulty-photo" />
                    <p>В усі тяжкі</p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="current_trails">
          <div className="wrapper_trails">
            <div className="container_trails">
              <img className="trail_img" src="./img/rock.jpeg" />
              <div className="trail_desc">
                <h2>Похід на Шпиці</h2>
                <p className="trail_text">Похід відбудеться бла бла бла бла бла </p>
                <Link to="/trail/1" className="btn-order">Дізнатись більше</Link>
              </div>
            </div>
            <div className="container_trails">
              <img className="trail_img" src="./img/rock.jpeg" />
              <div className="trail_desc">
                <h2>Похід на Шпиці</h2>
                <p className="trail_text">Похід відбудеться бла бла бла бла бла </p>
                <Link to="/trail/2" className="btn-order">Дізнатись більше</Link>
              </div>
            </div>
            <div className="container_trails">
              <img className="trail_img" src="./img/rock.jpeg" />
              <div className="trail_desc">
                <h2>Похід на Шпиці</h2>
                <p className="trail_text">Похід відбудеться бла бла бла бла бла </p>
                <Link to="/trail/3" className="btn-order">Дізнатись більше</Link>
              </div>
            </div>
          </div>
          <div>
            <img src="./img/transfer_mountian.png" className="transfer_mountian" />
          </div>
        </div>
      </div>

      <section className="next_section">
        <h1 className="comment_titel">Поділись своїми світлинами</h1>
        <div className="comment_container">
          <div className="comment_wrapper">
            {[1, 7, 1, 2, 3, 4, 5, 6].map((photo, index) => (
              <PhotoContainer key={index} photoNumber={photo} />
            ))}
          </div>
        </div>
      </section>

      <section className="lists">
        <h2 className="list-header">Трохи корисних порад</h2>
        <div className="list-container">
          <div className="floating-element-2">
            <strong>Погода сьогодні:</strong><br />
            ☀️ +18°C, сонячно
          </div>
          <div className="list-section">
            <h3 className="h3-info1">Популярні маршрути</h3>
            <ol>
              <li>Говерла (2061 м) - найвища вершина України</li>
              <li>Петрос (2020 м) - друга за висотою вершина</li>
              <li>Піп Іван (2022 м) - містична вершина</li>
              <li>Брескул (1911 м) - доступна для початківців</li>
              <li>Шпиці (1863 м) - мальовничі скелі</li>
            </ol>
          </div>

          <div className="list-section">
            <h3 className="h3-info2">Що взяти з собою</h3>
            <ul>
              <li>Водонепроникний одяг</li>
              <li>Трекінгове взуття</li>
              <li>Фонарик та запасні батарейки</li>
              <li>Аптечка першої допомоги</li>
              <li>GPS-навігатор або карта</li>
              <li>Сонцезахисний крем</li>
              <li>Термос та перекус</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="rent-container">
        <div className="rent-wrapper">
          <h1 className="rent-lable">Потрібне хороше <br /> спорядження?</h1>
          <h2 className="rent-h2">Бронюй тут</h2>
          <a href="../rent_page/rent_page.html" className="rent-btn">Обрати</a>
        </div>
      </div>

      <section className="contact-info" id="section-info">
        <div className="container-info">
          <h2 className="h2-header">Потрібна допомога?</h2>
          <div className="form-container">
            <ContactForm />
          </div>
        </div>
      </section>

      <div className="footer">
        <div className="footer-wrapper">
          <img className="footer-logo" src="./img/logo.png" alt="" />
          <div className="footer-nav">
            <Link to="/area" className="nav-link">Місцевість</Link>
            <Link to="/attractions" className="nav-link">Що подивитися</Link>
            <Link to="/about" className="nav-link">Про нас</Link>
            <Link to="/contacts" className="nav-link">Контакти</Link>
            <Link to="/login" className="nav-link">Увійти</Link>
            <a className="footer_icon">
              <img src="./img/icons/instagram.png" alt="" className="footer_icon_img" />
            </a>
            <a className="footer_icon">
              <img src="./img/icons/facebook.png" alt="" className="footer_icon_img" />
            </a>
            <a className="footer_icon">
              <img src="./img/icons/twitter.png" alt="" className="footer_icon_img" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
const PhotoContainer = ({ photoNumber }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1000);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="photo_container">
      <img className="photo photo1" src={`./img/people_photo/photo${photoNumber}.jpg`} alt="" />
      <div className="like_comment_container">
        <div className="like_div" onClick={handleLike}>
          <img
            src="./img/icons/like_icon.png"
            alt=""
            className={`like_icon ${liked ? 'hidden' : ''}`}
          />
          <img
            src="./img/icons/like_icon_pressed.png"
            alt=""
            className={`like_icon_pressed ${!liked ? 'hidden' : ''}`}
          />
          <p className="like_num">{likeCount}</p>
        </div>
        <div className="comment_div">
          <img src="./img/icons/comment_icon.png" alt="" className="comment_icon" />
          <img src="./img/icons/comment_icon_pressed.png" alt="" className="comment_icon_pressed" />
          <p className="like_num">1000</p>
        </div>
      </div>
    </div>
  );
};
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="info-form">
      <div className="form-group">
        <label htmlFor="contact-name">Ваше ім'я: </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="contact-email">Email: </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Тема повідомлення: </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        >
          <option value="">Оберіть тему</option>
          <option value="rent">Оренда спорядження</option>
          <option value="tour">Організація туру</option>
          <option value="info">Загальна інформація</option>
          <option value="other">Інше</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Повідомлення: </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Надіслати повідомлення</button>
    </form>
  );
};

