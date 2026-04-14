import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

/**
 * CSS columns 대신 JS로 아이템을 컬럼에 분배하는 Masonry 레이아웃.
 * iOS Safari에서 CSS columns의 break-inside/overflow 버그를 우회.
 */
const MasonryGrid = ({ items, wide = false }) => {
  const [cols, setCols] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (wide && w >= 1024) setCols(3);
      else if (w >= 768) setCols(2);
      else setCols(1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [wide]);

  if (cols === 1) {
    return (
      <div className="masonry masonry--1">
        {items.map((item, i) => (
          <div className="masonry__item" key={i}>
            <Card data={item} />
          </div>
        ))}
      </div>
    );
  }

  const columns = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => {
    columns[i % cols].push({ item, key: i });
  });

  return (
    <div className={`masonry masonry--${cols}`}>
      {columns.map((col, ci) => (
        <div className="masonry__col" key={ci}>
          {col.map(({ item, key }) => (
            <div className="masonry__item" key={key}>
              <Card data={item} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;
