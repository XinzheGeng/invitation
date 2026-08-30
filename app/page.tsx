'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, Images, MapPin, Music2, Pause } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

type View = 'cover' | 'home' | 'story' | 'gallery' | 'day' | 'weekend';

const entries: Array<{
  id: Exclude<View, 'cover' | 'home'>;
  number: string;
  title: string;
  subtitle: string;
  note: string;
  image: string;
  position: string;
}> = [
  { id: 'story', number: '01', title: '沿途有你', subtitle: '我们的故事', note: '从相遇，到并肩走向今天', image: '/assets/story.png', position: '50% 30%' },
  { id: 'gallery', number: '02', title: '光影成册', subtitle: '婚纱与日常', note: '把喜欢的时刻，装订成册', image: '/assets/gallery.png', position: '50% 52%' },
  { id: 'day', number: '03', title: '良辰入席', subtitle: '婚礼当天', note: '关于时间、地点与相见', image: '/assets/day-trip.png', position: '50% 20%' },
  { id: 'weekend', number: '04', title: '赴约之外', subtitle: '周边游玩', note: '也想把这座城，介绍给你', image: '/assets/day-trip.png', position: '50% 78%' },
];

const storySteps = [
  ['2019.08', '初见', '那天的天气已经记不清，只记得我们聊了很久。'],
  ['2021.05', '远行', '第一次把两张车票，放进同一个信封。'],
  ['2024.10', '相守', '寻常日子渐渐有了共同的名字。'],
  ['2026.10', '婚礼', '这一页，想邀请你一起见证。'],
];

export default function Home() {
  const [view, setView] = useState<View>('cover');
  const [music, setMusic] = useState(false);

  return (
    <main className="site-shell">
      <div className="paper-stage" aria-live="polite">
        {view === 'cover' ? (
          <Cover onOpen={() => setView('home')} />
        ) : view === 'home' ? (
          <Hub onSelect={setView} music={music} onMusic={() => setMusic((value) => !value)} />
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
      <header className="cover-meta"><span>WEDDING ARCHIVE · 2026</span><span>致我们最重要的人</span></header>
      <div className="cover-title-block">
        <p className="eyebrow">L &amp; Z · INVITATION</p>
        <h1>一根红线，<br />装订两个人生</h1>
        <p className="cover-lead">从各自的小时候，走到共同的以后。</p>
      </div>
      <figure className="cover-photo">
        <img src="/assets/cover.png" alt="两张童年照片被红线连接的概念图" />
        <figcaption>ARCHIVE 01—01 · THE BEGINNING</figcaption>
      </figure>
      <svg className="cover-thread" viewBox="0 0 420 320" aria-hidden="true">
        <path d="M210 0 C212 60 160 64 170 122 C181 184 256 153 244 222 C239 251 212 256 210 320" />
        <circle cx="170" cy="122" r="4" /><circle cx="244" cy="222" r="4" />
      </svg>
      <div className="cover-info">
        <div><small>DATE</small><strong>2026.10.18</strong></div>
        <div><small>PLACE</small><strong>山澜里宴会厅</strong></div>
      </div>
      <Button className="seal-button" onClick={onOpen} aria-label="打开请柬并进入导航页"><span>轻触启封</span><ArrowUpRight aria-hidden="true" /></Button>
      <p className="cover-footnote">红线将带你进入请柬，并陪你走过每一页</p>
    </section>
  );
}

function Hub({ onSelect, music, onMusic }: { onSelect: (view: View) => void; music: boolean; onMusic: () => void }) {
  return (
    <section className="hub-screen screen-enter">
      <header className="hub-header">
        <div><p className="eyebrow">HOME / 01</p><h1>L <i>&amp;</i> Z</h1></div>
        <Button variant="ghost" size="icon" className="music-button" onClick={onMusic} aria-label={music ? '暂停音乐' : '播放音乐'}>{music ? <Pause /> : <Music2 />}</Button>
      </header>
      <figure className="hub-hero">
        <img src="/assets/home-v2.png" alt="婚礼请柬首页视觉占位图" />
        <div className="hero-caption"><p>WE ARE GETTING MARRIED</p><strong>2026.10.18</strong></div>
      </figure>
      <div className="invitation-note"><span>诚挚邀请你</span><p>来见证我们的重要一天，也来翻阅这份关于“我们”的小小档案。</p></div>
      <div className="thread-nav" aria-label="请柬栏目导航">
        <svg viewBox="0 0 420 510" aria-hidden="true">
          <path d="M210 0 C210 60 208 68 210 108 C210 150 116 142 116 204 C116 246 304 238 304 302 C304 354 116 352 116 412 C116 451 210 448 210 510" />
          <circle cx="116" cy="170" r="5" /><circle cx="304" cy="268" r="5" /><circle cx="116" cy="384" r="5" /><circle cx="304" cy="466" r="5" />
        </svg>
        <div className="entry-grid">
          {entries.map((entry) => (
            <button className={`entry-card entry-${entry.id}`} key={entry.id} onClick={() => onSelect(entry.id)} aria-label={`进入${entry.subtitle}：${entry.title}`}>
              <span className="entry-number">{entry.number}</span>
              <span className="entry-image"><img src={entry.image} alt="" style={{ objectPosition: entry.position }} /></span>
              <span className="entry-copy"><small>{entry.subtitle}</small><strong>{entry.title}</strong><em>{entry.note}</em></span>
              <ArrowUpRight className="entry-arrow" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <footer className="hub-footer"><span>沿红线任选一页</span><span>INVITATION · 2026</span></footer>
    </section>
  );
}

function Detail({ view, onBack }: { view: Exclude<View, 'cover' | 'home'>; onBack: () => void }) {
  const entry = entries.find((item) => item.id === view)!;
  return (
    <section className={`detail-screen detail-${view} screen-enter`}>
      <header className="detail-header">
        <Button variant="ghost" className="back-button" onClick={onBack}><ArrowLeft aria-hidden="true" />循红线返回</Button>
        <span>{entry.number} / 04</span>
      </header>
      <div className="detail-title"><p className="eyebrow">{entry.subtitle}</p><h1>{entry.title}</h1><p>{entry.note}</p></div>
      {view === 'story' && <StoryPanel />}
      {view === 'gallery' && <GalleryPanel />}
      {view === 'day' && <DayPanel />}
      {view === 'weekend' && <WeekendPanel />}
      <footer className="detail-footer"><span>L &amp; Z · 2026.10.18</span><button onClick={onBack}>回到目录 ↑</button></footer>
    </section>
  );
}

function StoryPanel() {
  return (
    <div className="story-list">
      <div className="story-line" aria-hidden="true" />
      {storySteps.map(([date, title, body], index) => (
        <article className="story-item" key={date}>
          <span className="story-knot" aria-hidden="true" /><div className="story-date">{date}</div>
          <div className="story-copy"><h2>{title}</h2><p>{body}</p></div>
          {index === 1 && <img src="/assets/story.png" alt="旅行记忆照片占位图" />}
        </article>
      ))}
    </div>
  );
}

function GalleryPanel() {
  return (
    <div className="gallery-panel">
      <div className="gallery-tabs" aria-label="照片分类"><button className="active">日常</button><button>婚纱</button><button>旅途</button></div>
      <figure className="gallery-main"><img src="/assets/gallery.png" alt="装订式照片档案占位图" /><figcaption><span>CONTACT SHEET / 05</span><span>左右滑动查看 →</span></figcaption></figure>
      <p className="gallery-quote">“相册不是为了记住每一天，<br />而是记住我们怎样一起生活。”</p>
    </div>
  );
}

function DayPanel() {
  const [venueOpen, setVenueOpen] = useState(false);
  const [venueIndex, setVenueIndex] = useState(0);
  const schedule = [['16:30', '候场', '来到我们身边'], ['17:00', '入席', '写下祝福，慢慢坐好'], ['18:00', '仪式', '关于爱与未来的回答'], ['19:00', '举杯', '今晚不谈散场']];
  const venuePhotos = [
    { image: '/assets/day-trip.png', position: '50% 74%', title: '迎宾庭院', note: '穿过树影与花径，从这里走进我们的这一天。' },
    { image: '/assets/home-v2.png', position: '50% 16%', title: '仪式空间', note: '傍晚六点，红线会在这里抵达它的另一端。' },
    { image: '/assets/gallery.png', position: '50% 52%', title: '拾光晚宴', note: '灯亮以后，请与我们一起入席、举杯、慢慢说话。' },
  ];
  const showVenuePhoto = (index: number) => {
    setVenueIndex(index);
    setVenueOpen(true);
  };
  const shiftVenuePhoto = (offset: number) => setVenueIndex((current) => (current + offset + venuePhotos.length) % venuePhotos.length);

  return (
    <div className="day-panel">
      <div className="date-block"><span>OCT</span><strong>18</strong><em>2026 · SUNDAY</em></div>
      <div className="schedule-list">{schedule.map(([time, title, note]) => <article key={time}><time>{time}</time><i /><div><h2>{title}</h2><p>{note}</p></div></article>)}</div>
      <section className="place-card" aria-labelledby="venue-title">
        <div className="place-heading">
          <div><small>PLACE / 场地</small><strong id="venue-title">山澜里宴会厅 · 拾光厅</strong><p><MapPin aria-hidden="true" />建议提前 20 分钟到达</p></div>
          <span className="venue-count">03<br /><em>VIEWS</em></span>
        </div>
        <button className="venue-preview" onClick={() => showVenuePhoto(0)} aria-label="查看婚礼场地照片，共三张">
          <span className="venue-thumbnails" aria-hidden="true">
            {venuePhotos.map((photo, index) => <img key={photo.title} src={photo.image} alt="" style={{ objectPosition: photo.position, zIndex: venuePhotos.length - index }} />)}
          </span>
          <span className="venue-action"><Images aria-hidden="true" /><span><small>VENUE ALBUM</small>查看场地影像</span><ArrowRight aria-hidden="true" /></span>
        </button>
      </section>

      <Dialog open={venueOpen} onOpenChange={setVenueOpen}>
        <DialogContent className="venue-dialog" showCloseButton>
          <div className="venue-dialog-header">
            <div><p>THE WEDDING PLACE · 2026</p><DialogTitle>场地影像</DialogTitle></div>
            <span>{String(venueIndex + 1).padStart(2, '0')} / {String(venuePhotos.length).padStart(2, '0')}</span>
          </div>
          <DialogDescription className="venue-dialog-description">提前看一眼，我们将在这里相见。</DialogDescription>
          <figure className="venue-slide">
            <img src={venuePhotos[venueIndex].image} alt={`${venuePhotos[venueIndex].title}场地预览`} style={{ objectPosition: venuePhotos[venueIndex].position }} />
            <figcaption><span>{String(venueIndex + 1).padStart(2, '0')}</span><div><strong>{venuePhotos[venueIndex].title}</strong><p>{venuePhotos[venueIndex].note}</p></div></figcaption>
          </figure>
          <div className="venue-controls">
            <button onClick={() => shiftVenuePhoto(-1)} aria-label="查看上一张场地照片"><ChevronLeft aria-hidden="true" />上一景</button>
            <div className="venue-dots" aria-label="选择场地照片">
              {venuePhotos.map((photo, index) => <button key={photo.title} className={index === venueIndex ? 'active' : ''} onClick={() => setVenueIndex(index)} aria-label={`查看${photo.title}`} aria-current={index === venueIndex ? 'true' : undefined} />)}
            </div>
            <button onClick={() => shiftVenuePhoto(1)} aria-label="查看下一张场地照片">下一景<ArrowRight aria-hidden="true" /></button>
          </div>
          <p className="venue-footnote">山澜里宴会厅 · 拾光厅　/　婚礼当天请循红线入场</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WeekendPanel() {
  const places = [['01', '湖边', '步行 10 分钟', '风会把城市的声音吹远。'], ['02', '旧街', '车程 12 分钟', '适合慢慢吃一顿午饭。'], ['03', '山顶', '车程 25 分钟', '日落前到达，刚刚好。']];
  return (
    <div className="weekend-panel">
      <figure><img src="/assets/day-trip.png" alt="周边游玩路线占位图" /><figcaption>WEEKEND NOTES</figcaption></figure><div className="route-line" aria-hidden="true" />
      {places.map(([number, name, distance, note]) => <article key={number}><span>{number}</span><div><h2>{name}</h2><small>{distance}</small><p>{note}</p></div><ArrowUpRight /></article>)}
    </div>
  );
}
