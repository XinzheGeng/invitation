'use client';

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  Images,
  MapPin,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ENTRIES,
  GALLERY_GROUPS,
  SCHEDULE_ITEMS,
  STORY_STEPS,
  VENUE_PHOTOS,
  WEEKEND_SECTIONS,
  WEDDING,
  type DetailView,
  type GalleryCategory,
  type View,
  type WeekendPlace,
} from './invitation-data';

const GALLERY_CATEGORIES: readonly GalleryCategory[] = ['travel', 'wedding'];

export default function Home() {
  const [view, setView] = useState<View>('cover');

  return (
    <main className="site-shell">
      <div className="paper-stage" aria-live="polite">
        {view === 'cover' ? (
          <Cover onOpen={() => setView('home')} />
        ) : view === 'home' ? (
          <Hub onSelect={setView} onBackToCover={() => setView('cover')} />
        ) : (
          <Detail view={view} onBack={() => setView('home')} />
        )}
      </div>
    </main>
  );
}

function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="cover-screen screen-enter">
      <header className="cover-meta">
        <span>WEDDING INVITATION · 2026</span>
        <span>致我们最重要的人</span>
      </header>
      <div className="cover-title-block">
        <p className="eyebrow">{WEDDING.couple} · INVITATION</p>
        <h1>
          一根红线，
          <br />
          装订两个人生
        </h1>
        <p className="cover-lead">从各自的小时候，走到共同的以后。</p>
      </div>
      <figure className="cover-photo">
        <img src="/assets/placeholders/cover-main.svg" alt="封面照片待补充" />
        <figcaption>THE BEGINNING</figcaption>
      </figure>
      <svg className="cover-thread" viewBox="0 0 420 320" aria-hidden="true">
        <path d="M210 0 C212 60 160 64 170 122 C181 184 256 153 244 222 C239 251 212 256 210 320" />
        <circle cx="170" cy="122" r="4" />
        <circle cx="244" cy="222" r="4" />
      </svg>
      <div className="cover-info">
        <div>
          <small>DATE</small>
          <strong>{WEDDING.date}</strong>
        </div>
        <div>
          <small>PLACE</small>
          <strong>{WEDDING.venue}</strong>
        </div>
      </div>
      <Button
        className="seal-button"
        onClick={onOpen}
        aria-label="打开请柬并进入导航页"
      >
        <span>轻触启封</span>
        <ArrowUpRight aria-hidden="true" />
      </Button>
      <p className="cover-footnote">红线将带你进入请柬，并陪你走过每一页</p>
    </section>
  );
}

function Hub({
  onSelect,
  onBackToCover,
}: {
  onSelect: (view: View) => void;
  onBackToCover: () => void;
}) {
  return (
    <section className="hub-screen screen-enter">
      <header className="hub-header">
        <div>
          <p className="eyebrow">HOME / 01</p>
          <h1>{WEDDING.couple}</h1>
        </div>
        <Button
          variant="ghost"
          className="hub-cover-button"
          onClick={onBackToCover}
        >
          <ArrowLeft aria-hidden="true" />
          回到封面
        </Button>
      </header>
      <figure className="hub-hero">
        <img src="/assets/placeholders/hub-main.svg" alt="导航页照片待补充" />
        <div className="hero-caption">
          <p>WE ARE GETTING MARRIED</p>
          <strong>{WEDDING.date}</strong>
        </div>
      </figure>
      <div className="invitation-note">
        <span>诚挚邀请你</span>
        <p>来见证我们的重要一天，也来翻阅这份关于“我们”的小小档案。</p>
      </div>
      <nav className="thread-nav" aria-label="请柬栏目导航">
        <svg viewBox="0 0 420 510" aria-hidden="true">
          <path d="M210 0 C210 60 208 68 210 108 C210 150 116 142 116 204 C116 246 304 238 304 302 C304 354 116 352 116 412 C116 451 210 448 210 510" />
          <circle cx="116" cy="170" r="5" />
          <circle cx="304" cy="268" r="5" />
          <circle cx="116" cy="384" r="5" />
          <circle cx="304" cy="466" r="5" />
        </svg>
        <div className="entry-grid">
          {ENTRIES.map((entry) => (
            <button
              type="button"
              className={`entry-card entry-${entry.id}`}
              key={entry.id}
              onClick={() => onSelect(entry.id)}
              aria-label={`进入${entry.subtitle}：${entry.title}`}
            >
              <span className="entry-number">{entry.number}</span>
              <span className="entry-image">
                <img
                  src={entry.image}
                  alt=""
                  style={{ objectPosition: entry.position }}
                />
              </span>
              <span className="entry-copy">
                <small>{entry.subtitle}</small>
                <strong>{entry.title}</strong>
                <em>{entry.note}</em>
              </span>
              <ArrowUpRight className="entry-arrow" aria-hidden="true" />
            </button>
          ))}
        </div>
      </nav>
      <footer className="hub-footer">
        <span>沿红线任选一页</span>
        <span>INVITATION · 2026</span>
      </footer>
    </section>
  );
}

function Detail({ view, onBack }: { view: DetailView; onBack: () => void }) {
  const entry = ENTRIES.find((item) => item.id === view)!;
  return (
    <section className={`detail-screen detail-${view} screen-enter`}>
      <header className="detail-header">
        <Button variant="ghost" className="back-button" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
          循红线返回
        </Button>
        <span>{entry.number} / 04</span>
      </header>
      <div className="detail-title">
        <p className="eyebrow">{entry.subtitle}</p>
        <h1>{entry.title}</h1>
        <p>{entry.note}</p>
      </div>
      {view === 'story' && <StoryPanel />}
      {view === 'gallery' && <GalleryPanel />}
      {view === 'day' && <DayPanel />}
      {view === 'weekend' && <WeekendPanel />}
      <footer className="detail-footer">
        <span>
          {WEDDING.couple} · {WEDDING.date}
        </span>
        <button type="button" onClick={onBack}>
          回到目录 ↑
        </button>
      </footer>
    </section>
  );
}

function StoryPanel() {
  return (
    <div className="story-list">
      <div className="story-line" aria-hidden="true" />
      {STORY_STEPS.map((step, index) => (
        <article className="story-item" key={step.id}>
          <span className="story-knot" aria-hidden="true" />
          <div className="story-date">{step.date}</div>
          <div className="story-copy">
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </div>
          {index === 1 && (
            <img
              src="/assets/placeholders/story-trip.svg"
              alt="南京旅行照片待补充"
            />
          )}
        </article>
      ))}
    </div>
  );
}

function GalleryPanel() {
  const [category, setCategory] = useState<GalleryCategory>('travel');
  const [photoIndex, setPhotoIndex] = useState(0);
  const gestureStart = useRef<{ x: number; y: number } | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const group = GALLERY_GROUPS[category];
  const photo = group.photos[photoIndex];

  const selectCategory = (next: GalleryCategory) => {
    setCategory(next);
    setPhotoIndex(0);
  };
  const shiftPhoto = (offset: number) =>
    setPhotoIndex(
      (current) =>
        (current + offset + group.photos.length) % group.photos.length,
    );
  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    event.stopPropagation();
    const offset = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex =
      (index + offset + GALLERY_CATEGORIES.length) % GALLERY_CATEGORIES.length;
    selectCategory(GALLERY_CATEGORIES[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  };
  const handlePanelKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    event.stopPropagation();
    shiftPhoto(event.key === 'ArrowRight' ? 1 : -1);
  };
  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    gestureStart.current = { x: event.clientX, y: event.clientY };
  };
  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    const start = gestureStart.current;
    gestureStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.2)
      shiftPhoto(dx < 0 ? 1 : -1);
  };

  return (
    <div className="gallery-panel">
      <div className="gallery-tabs" role="tablist" aria-label="照片分类">
        {GALLERY_CATEGORIES.map((item, index) => (
          <button
            type="button"
            role="tab"
            id={`gallery-tab-${item}`}
            aria-controls={`gallery-panel-${item}`}
            aria-selected={category === item}
            tabIndex={category === item ? 0 : -1}
            className={category === item ? 'active' : ''}
            key={item}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            onClick={() => selectCategory(item)}
            onKeyDown={(event) => handleTabKeyDown(event, index)}
          >
            {GALLERY_GROUPS[item].label}
          </button>
        ))}
      </div>
      {/* The tab panel is intentionally focusable so arrow keys and touch gestures share one browsing surface. */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <figure
        className="gallery-main"
        role="tabpanel"
        id={`gallery-panel-${category}`}
        aria-labelledby={`gallery-tab-${category}`}
        aria-label={`${group.label}分类第${photoIndex + 1}张照片，共${group.photos.length}张`}
        tabIndex={0}
        onKeyDown={handlePanelKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          gestureStart.current = null;
        }}
      >
        <div className="gallery-photo-frame">
          <img src={photo.src} alt={photo.alt} />
          <button
            type="button"
            className="gallery-control gallery-control-prev"
            onClick={() => shiftPhoto(-1)}
            aria-label="查看上一张照片"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="gallery-control gallery-control-next"
            onClick={() => shiftPhoto(1)}
            aria-label="查看下一张照片"
          >
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
        <figcaption>
          <span>
            CONTACT SHEET / {String(photoIndex + 1).padStart(2, '0')} OF{' '}
            {String(group.photos.length).padStart(2, '0')}
          </span>
          <span>左右滑动查看 →</span>
        </figcaption>
      </figure>
      <p className="gallery-quote">镜头里总有丰收</p>
    </div>
  );
}

function DayPanel() {
  const [venueOpen, setVenueOpen] = useState(false);
  const [venueIndex, setVenueIndex] = useState(0);
  const showVenuePhoto = (index: number) => {
    setVenueIndex(index);
    setVenueOpen(true);
  };
  const shiftVenuePhoto = (offset: number) =>
    setVenueIndex(
      (current) =>
        (current + offset + VENUE_PHOTOS.length) % VENUE_PHOTOS.length,
    );
  const venuePhoto = VENUE_PHOTOS[venueIndex];

  return (
    <div className="day-panel">
      <div className="date-block">
        <span>{WEDDING.month}</span>
        <strong>{WEDDING.day}</strong>
        <em>{WEDDING.yearAndWeekday}</em>
      </div>
      <div className="schedule-list">
        {SCHEDULE_ITEMS.map((item) => (
          <article key={item.time}>
            <time>{item.time}</time>
            <i aria-hidden="true" />
            <div>
              <h2>{item.title}</h2>
              <p>{item.note}</p>
            </div>
          </article>
        ))}
      </div>
      <section className="place-card" aria-labelledby="venue-title">
        <div className="place-heading">
          <div>
            <small>PLACE / 场地</small>
            <strong id="venue-title">{WEDDING.venue}</strong>
            <p>
              <MapPin aria-hidden="true" />
              建议提前 20 分钟到达
            </p>
          </div>
          <span className="venue-count">
            03
            <br />
            <em>VIEWS</em>
          </span>
        </div>
        <button
          type="button"
          className="venue-preview"
          onClick={() => showVenuePhoto(0)}
          aria-label="查看婚礼场地照片，共三张"
        >
          <span className="venue-thumbnails" aria-hidden="true">
            {VENUE_PHOTOS.map((item, index) => (
              <img
                key={item.src}
                src={item.src}
                alt=""
                style={{ zIndex: VENUE_PHOTOS.length - index }}
              />
            ))}
          </span>
          <span className="venue-action">
            <Images aria-hidden="true" />
            <span>
              <small>VENUE ALBUM</small>查看场地影像
            </span>
            <ArrowRight aria-hidden="true" />
          </span>
        </button>
      </section>

      <Dialog open={venueOpen} onOpenChange={setVenueOpen}>
        <DialogContent className="venue-dialog" showCloseButton>
          <div className="venue-dialog-header">
            <div>
              <p>THE WEDDING PLACE · 2026</p>
              <DialogTitle>场地影像</DialogTitle>
            </div>
            <span>
              {String(venueIndex + 1).padStart(2, '0')} /{' '}
              {String(VENUE_PHOTOS.length).padStart(2, '0')}
            </span>
          </div>
          <DialogDescription className="venue-dialog-description">
            场地影像将在确认后更新。
          </DialogDescription>
          <figure className="venue-slide">
            <img src={venuePhoto.src} alt={venuePhoto.alt} />
            <figcaption>
              <span>{String(venueIndex + 1).padStart(2, '0')}</span>
              <div>
                <strong>{venuePhoto.title}</strong>
                <p>{venuePhoto.note}</p>
              </div>
            </figcaption>
          </figure>
          <div className="venue-controls">
            <button
              type="button"
              onClick={() => shiftVenuePhoto(-1)}
              aria-label="查看上一张场地照片"
            >
              <ChevronLeft aria-hidden="true" />
              上一景
            </button>
            <div className="venue-dots" aria-label="选择场地照片">
              {VENUE_PHOTOS.map((item, index) => (
                <button
                  type="button"
                  key={item.src}
                  className={index === venueIndex ? 'active' : ''}
                  onClick={() => setVenueIndex(index)}
                  aria-label={`查看${item.title}`}
                  aria-current={index === venueIndex ? 'true' : undefined}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => shiftVenuePhoto(1)}
              aria-label="查看下一张场地照片"
            >
              下一景
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
          <p className="venue-footnote">
            {WEDDING.venue}　/　婚礼当天请循红线入场
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WeekendPlaceCard({ place }: { place: WeekendPlace }) {
  return (
    <article className="weekend-place-card">
      <h3>{place.name}</h3>
      <div className="place-tags" aria-label="地点标签">
        {place.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <p>{place.address}</p>
      <small>从婚礼场地出发，预计车程 {place.driveTime}</small>
      <a
        href={place.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`在地图中打开${place.name}`}
      >
        地图导航
        <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  );
}

function WeekendPanel() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(`weekend-${id}`);
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    section?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="weekend-panel">
      <figure className="weekend-hero">
        <img
          src="/assets/placeholders/weekend-hero.svg"
          alt="石家庄周边推荐照片待补充"
        />
        <figcaption>WEEKEND NOTES</figcaption>
      </figure>
      <nav className="weekend-category-nav" aria-label="周边推荐分类">
        {WEEKEND_SECTIONS.map((section) => (
          <button
            type="button"
            key={section.id}
            aria-controls={`weekend-${section.id}`}
            onClick={() => scrollToSection(section.id)}
          >
            <strong>{section.label}</strong>
            <span>{section.subtitle}</span>
          </button>
        ))}
      </nav>
      <div className="weekend-sections">
        {WEEKEND_SECTIONS.map((section, index) => (
          <section
            className="weekend-section"
            id={`weekend-${section.id}`}
            key={section.id}
            aria-labelledby={`weekend-heading-${section.id}`}
          >
            <header>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p>{section.subtitle}</p>
                <h2 id={`weekend-heading-${section.id}`}>{section.label}</h2>
              </div>
              <em>{section.expectedCount} PLACES</em>
            </header>
            {section.places.length > 0 && (
              <div className="weekend-place-list">
                {section.places.map((place) => (
                  <WeekendPlaceCard key={place.name} place={place} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
