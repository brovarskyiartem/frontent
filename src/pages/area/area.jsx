import React, {useEffect } from 'react';
import Header from '../../components/header.jsx'
import './area_style.css';

const AreaPage = () => {
  const showRidgeInfo = (ridgeKey) => {
    const ridgeInfos = document.querySelectorAll('.ridge-info');
    ridgeInfos.forEach(info => {
      info.classList.remove('active');
    });
    const targetInfo = document.getElementById(`info-${ridgeKey}`);
    if (targetInfo) {
      targetInfo.classList.add('active');
    }
  };
  useEffect(() => {
    const areas = document.querySelectorAll('area[data-ridge]');
    areas.forEach(area => {
      const ridgeKey = area.dataset.ridge;
      const handleClick = (e) => {
        e.preventDefault();
        showRidgeInfo(ridgeKey);
      };
      area.addEventListener('click', handleClick);
      return () => {
        area.removeEventListener('click', handleClick);
      };
    });
  }, []);
  return (
    <div>
      <Header/>
      <div className="container">
        <h2>Інтерактивна карта туристичних районів Карпат</h2>
        <img src="./img/area.png" alt="Карта Українських Карпат" className="map-image"  useMap="#carpathians-map"/>
        <map name="carpathians-map" id="carpathians-map">
          <area
            shape="poly"
            coords="159, 12, 157, 186,205, 216,197, 265,309, 385,362, 418,488, 272,395, 149,164, 13"
            data-ridge="beskidy"
            alt="Бескиди"
            title="Бескиди"
          />
          <area
            shape="poly"
            coords=" 192, 258, 127, 218, 61, 373,212, 396,229, 434,444, 609,477, 590,489, 535,272, 364,214, 320, 195, 257"
            data-ridge="polonyny"
            alt="Полонинський хребет (Боржава)"
            title="Полонинський хребет (Боржава)"
          />
          <area
            shape="poly"
            coords=" 494, 273,481, 321,432, 346,377, 413,426, 428,453, 491, 494, 502,537, 506,610, 541,612, 546, 662, 496, 657, 476,676, 435,532, 283,502, 268"
            data-ridge="gorgany"
            alt="Горгани"
            title="Горгани"
          />
          <area
            shape="poly"
            coords="545, 690, 510, 670,483, 596,484, 579,498, 567, 499, 538, 495, 524, 538, 514,577, 536,598, 537,605, 546,574, 626,552, 651,563, 667"
            data-ridge="svydovets"
            alt="Свидовець"
            title="Свидовець"
          />
          <area
            shape="poly"
            coords=" 610, 551,578, 624,610, 640,635, 630,650, 638,661, 671,689, 656,706, 659, 717, 635,705, 610,666, 542,607, 550"
            data-ridge="chornogora"
            alt="Чорногора"
            title="Чорногора"
          />
          <area
            shape="poly"
            coords=" 950, 677,847, 472,761, 428,762, 431, 684, 448, 664, 484,671, 510,665, 512,664, 543,711, 579,719, 598,763, 643,770, 691,791, 764, 829, 736, 847, 698,952, 679, 962, 526"
            data-ridge="pokuttya"
            alt="Покутсько-Буковинські Карпати"
            title="Покутсько-Буковинські Карпати"
          />
          <area
            shape="poly"
            coords="664, 671,649, 646,646, 640,634, 631,613, 642,600, 641,577, 629,556, 649,565, 670,556, 691,571, 698,629, 671,650, 677"
            data-ridge="marmarosy"
            alt="Мармароський масив"
            title="Мармароський масив"
          />
          <area
            shape="poly"
            coords="780, 763, 772, 737,780, 715,767, 698,757, 664,759, 643,725, 599,706, 612, 716, 644,702, 665, 699, 669,731, 712,749, 733, 742, 750,750, 766, 783, 764"
            data-ridge="gryniavy"
            alt="Гриняські гори"
            title="Гриняські гори"
          />
          <area
            shape="poly"
            coords="740, 746, 745, 731, 721, 701,699, 686, 695, 675, 697, 662,685, 657,669, 670,694, 713"
            data-ridge="chyvchyny"
            alt="Чивчинські гори"
            title="Чивчинські гори"
          />
        </map>

      </div>

      <div className="info-panel">
        <h2>📍 Інформація про гірські хребти</h2>
        <div className="ridge-info" id="info-beskidy">
          <h3>🏔️ Бескиди</h3>
          <div className="ridge-description">
            <p>Найпівнічніший гірський хребет Українських Карпат, що простягається вздовж кордону з Польщею і Словаччиною.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Пікуй (1405 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Довжина хребта</div>
              <div className="stat-value">~120 км</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіон</div>
              <div className="stat-value">Закарпатська область</div>
            </div>
            <div className="stat">
              <div className="stat-label">Тип рельєфу</div>
              <div className="stat-value">М'які схили</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Густі букові ліси, багата фауна, численні туристичні стежки, традиційні гуцульські села.</p>
        </div>
        <div className="ridge-info" id="info-polonyny">
          <h3>🌲 Полонинський хребет (Боржава)</h3>
          <div className="ridge-description">
            <p>Один з найдовших хребтів Українських Карпат, відомий своїми високогірними пасовищами - полонинами.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Великий Полонинський Верх (1880 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Довжина хребта</div>
              <div className="stat-value">~70 км</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіон</div>
              <div className="stat-value">Закарпатська область</div>
            </div>
            <div className="stat">
              <div className="stat-label">Національні парки</div>
              <div className="stat-value">Ужанський НПП</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Унікальні високогірні луки (полонини), традиційне скотарство, багата флора субальпійського поясу.</p>
        </div>
        <div className="ridge-info" id="info-gorgany">
          <h3>🗿 Горгани</h3>
          <div className="ridge-description">
            <p>Унікальний хребет з характерними скельними утвореннями - "горганами", що нагадують руїни стародавніх фортець.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Сивуля (1836 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Довжина хребта</div>
              <div className="stat-value">~50 км</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіон</div>
              <div className="stat-value">Івано-Франківська область</div>
            </div>
            <div className="stat">
              <div className="stat-label">Геологія</div>
              <div className="stat-value">Пісковики</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Унікальні скельні башти-горгани, складні туристичні маршрути, ендемічна флора, заповідні території.</p>
        </div>
        <div className="ridge-info" id="info-svydovets">
          <h3>🏞️ Свидовець</h3>
          <div className="ridge-description">
            <p>Масивний хребет з найбільшою кількістю високогірних озер в Українських Карпатах.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Близниці (1883 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Кількість озер</div>
              <div className="stat-value">7 льодовикових</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіон</div>
              <div className="stat-value">Закарпатська область</div>
            </div>
            <div className="stat">
              <div className="stat-label">Довжина хребта</div>
              <div className="stat-value">~35 км</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Льодовикові озера (Апшинець, Догяска та ін.), високогірні пасовища, альпінізм, гірськолижний туризм.</p>
        </div>
        <div className="ridge-info" id="info-chornogora">
          <h3>⛰️ Чорногора</h3>
          <div className="ridge-description">
            <p>Найвищий хребет України, де розташована найвища точка країни - гора Говерла.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Говерла (2061 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Кількість 2000+</div>
              <div className="stat-value">6 вершин</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіон</div>
              <div className="stat-value">Івано-Франківська область</div>
            </div>
            <div className="stat">
              <div className="stat-label">Національний парк</div>
              <div className="stat-value">Карпатський НПП</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Найвищі вершини України, альпійські луки, льодовикові озера, унікальна високогірна флора і фауна.</p>
        </div>
        <div className="ridge-info" id="info-pokuttya">
          <h3>🌲 Покутсько-Буковинські Карпати</h3>
          <div className="ridge-description">
            <p>Північно-східна частина Українських Карпат з м'якими формами рельєфу та густими лісами.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Томнатик (1365 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Довжина</div>
              <div className="stat-value">~80 км</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіони</div>
              <div className="stat-value">Івано-Франківська, Чернівецька</div>
            </div>
            <div className="stat">
              <div className="stat-label">Лісистість</div>
              <div className="stat-value">85%</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Багаті букові ліси, мінеральні джерела, традиційні промисли, етнографічні особливості.</p>
        </div>
        <div className="ridge-info" id="info-marmarosy">
          <h3>🗻 Мармароський масив</h3>
          <div className="ridge-description">
            <p>Найпівденніший масив Українських Карпат з найбільш альпійським характером рельєфу.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Піп Іван (1936 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Історична пам'ятка</div>
              <div className="stat-value">Обсерваторія 1938 р.</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіон</div>
              <div className="stat-value">Закарпатська область</div>
            </div>
            <div className="stat">
              <div className="stat-label">Довжина масиву</div>
              <div className="stat-value">~60 км</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Гострі вершини, льодовикові цирки, історична обсерваторія на Піп Івані, альпійська флора.</p>
        </div>
        <div className="ridge-info" id="info-gryniavy">
          <h3>🌿 Гриняські гори</h3>
          <div className="ridge-description">
            <p>Невисокий гірський масив з багатими лісами та мінеральними джерелами.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Гриняв (1748 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Курорти</div>
              <div className="stat-value">Синяк, Квитка</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіон</div>
              <div className="stat-value">Закарпатська область</div>
            </div>
            <div className="stat">
              <div className="stat-label">Мінеральні води</div>
              <div className="stat-value">30+ джерел</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Бальнеологічні курорти, мінеральні води типу "Боржомі", традиційна медицина, екотуризм.</p>
        </div>
        <div className="ridge-info" id="info-chyvchyny">
          <h3>🏔️ Чивчинські гори</h3>
          <div className="ridge-description">
            <p>Найсхідніший гірський масив Українських Карпат з унікальною геологічною будовою.</p>
          </div>
          <div className="ridge-stats">
            <div className="stat">
              <div className="stat-label">Найвища точка</div>
              <div className="stat-value">г. Гімба (1649 м)</div>
            </div>
            <div className="stat">
              <div className="stat-label">Національний парк</div>
              <div className="stat-value">Гуцульщина НПП</div>
            </div>
            <div className="stat">
              <div className="stat-label">Регіони</div>
              <div className="stat-value">Івано-Франківська, Чернівецька</div>
            </div>
            <div className="stat">
              <div className="stat-label">Геологія</div>
              <div className="stat-value">Флішові породи</div>
            </div>
          </div>
          <p><strong>Особливості:</strong> Унікальна флішова геологія, заповідні букові ліси, традиційна гуцульська культура, мальовничі села.</p>
        </div>
      </div>
    </div>
  );
};

export default AreaPage