import React, { useRef, useEffect, useState } from 'react';

/* ---------- Sub-components ---------- */

const Badge = ({ badge }) => {
  if (!badge) return null;
  return (
    <span className={`badge badge--${badge.type}`}>
      <i className={`fa-solid ${badge.icon}`}></i> {badge.text}
    </span>
  );
};

const InfoRow = ({ row }) => (
  <div className="info-row">
    <div className={`info-icon ico-${row.icon}`}>
      <i className={`fa-solid ${row.faIcon}`}></i>
    </div>
    <div className="info-text" dangerouslySetInnerHTML={{ __html: row.html }} />
  </div>
);

const ItemRow = ({ item }) => (
  <div className="item-row">
    <span className="item-row__icon"><i className={`fa-solid ${item.icon}`}></i></span>
    <div>
      <span className="item-row__name">{item.name}</span><br />
      <span className="item-row__desc">{item.desc}</span>
    </div>
  </div>
);

const RouteBox = ({ route }) => {
  if (!route) return null;
  return (
    <div className="route-box">
      <div className="route-box__head">
        <i className="fa-solid fa-route"></i> {route.title}
      </div>
      <div className="route-steps" style={{ marginBottom: 10 }}>
        {route.steps.map((step, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="route-arrow"><i className="fa-solid fa-arrow-right"></i></span>}
            <span className="route-step">
              <i className={`fa-solid ${step.icon}`}></i> {step.text}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const ScheduleTable = ({ schedule }) => {
  if (!schedule) return null;
  return (
    <table className="sched">
      <thead><tr><th>시즌</th><th>요일</th><th>시간</th></tr></thead>
      <tbody>
        {schedule.map((row, i) => (
          <tr key={i}><td>{row.season}</td><td>{row.days}</td><td>{row.time}</td></tr>
        ))}
      </tbody>
    </table>
  );
};

const LazyMap = ({ map }) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!ref.current || !map?.q) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true);
        obs.disconnect();
      }
    }, { rootMargin: '250px 0px', threshold: 0 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [map]);

  if (!map) return null;

  return (
    <div className="card__map" ref={ref}>
      {!loaded && (
        <div className="card__map-ph">
          <i className="fa-solid fa-map-location-dot"></i>
          <span>지도 보기</span>
        </div>
      )}
      {loaded && (
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(map.q)}&output=embed&hl=ko&z=15`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title={`${map.q} map`}
          style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
        />
      )}
      {map.link && (
        <a href={map.link} target="_blank" rel="noopener noreferrer" className="map-link">
          <i className="fa-solid fa-up-right-from-square"></i> Google Maps
        </a>
      )}
    </div>
  );
};

/* ---------- Main Card ---------- */

const Card = ({ data }) => (
  <article className="card">
    {data.image && (
      <div className="card__img">
        <img src={data.image} alt={data.name} loading="lazy" referrerPolicy="no-referrer" />
      </div>
    )}
    <div className="card__body">
      {/* Header */}
      <div className="card__top">
        <h3 className="card__name">
          {data.name}
          {data.nameEn && <small>{data.nameEn}</small>}
        </h3>
        <div className="card__badges">
          {data.visited && <span className="badge badge--visited"><i className="fa-solid fa-check"></i> sangsang 방문</span>}
          <Badge badge={data.badge} />
        </div>
      </div>

      {/* Address */}
      {data.address && (
        <div className="card__addr">
          <i className="fa-solid fa-location-dot"></i>
          <span>{data.address}</span>
        </div>
      )}

      {/* Route */}
      <RouteBox route={data.route} />

      {/* Info rows */}
      {data.info && (
        <div className="info-list">
          {data.info.map((row, i) => <InfoRow key={i} row={row} />)}
        </div>
      )}

      {/* Schedule */}
      <ScheduleTable schedule={data.schedule} />

      {/* Sub-sections (daytrips) */}
      {data.sections && data.sections.map((sec, i) => (
        <React.Fragment key={i}>
          <h4 className="sub-label" style={{ marginTop: 18 }}>
            <i className={`fa-solid ${sec.icon}`}></i> {sec.title}
          </h4>
          <div className="info-list">
            {sec.info.map((row, j) => <InfoRow key={j} row={row} />)}
          </div>
        </React.Fragment>
      ))}

      {/* Item list (shopping) */}
      {data.items && (
        <div className="item-list">
          {data.items.map((item, i) => <ItemRow key={i} item={item} />)}
        </div>
      )}

      {/* Highlight box */}
      {data.highlight && (
        <div className="highlight-box" dangerouslySetInnerHTML={{ __html: data.highlight.html }} />
      )}
    </div>

    {/* Map */}
    <LazyMap map={data.map} />
  </article>
);

export default Card;
