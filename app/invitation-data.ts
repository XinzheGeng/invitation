export const WEDDING = {
  couple: '耿信哲 & 何爽',
  date: '2026.10.03',
  month: 'OCT',
  day: '03',
  yearAndWeekday: '2026 · SATURDAY',
  venue: '铂爵宫皇家婚礼会馆',
  title: '耿信哲 & 何爽 婚礼请柬',
} as const;

export type View = 'cover' | 'home' | 'story' | 'gallery' | 'day' | 'weekend';
export type DetailView = Exclude<View, 'cover' | 'home'>;
export type GalleryCategory = 'travel' | 'wedding';
export type WeekendCategory = 'sightseeing' | 'shopping' | 'food';

export interface PhotoItem {
  src: string;
  alt: string;
  position?: string;
  title?: string;
  note?: string;
}

export interface WeekendPlace {
  name: string;
  tags: readonly string[];
  address: string;
  driveTime: string;
  mapUrl: string;
}

export const ENTRIES: ReadonlyArray<{
  id: DetailView;
  number: string;
  title: string;
  subtitle: string;
  note: string;
  image: string;
  position: string;
}> = [
  {
    id: 'story',
    number: '01',
    title: '来路偕行',
    subtitle: '我们的故事',
    note: '从相遇，到并肩走向今天',
    image: '/assets/placeholders/nav-story.svg',
    position: '50% 50%',
  },
  {
    id: 'gallery',
    number: '02',
    title: '菲林拾光',
    subtitle: '旅途与成婚',
    note: '把喜欢的时刻，装订成册',
    image: '/assets/placeholders/nav-gallery.svg',
    position: '50% 50%',
  },
  {
    id: 'day',
    number: '03',
    title: '良辰入席',
    subtitle: '婚礼当天',
    note: '关于时间、地点与相见',
    image: '/assets/placeholders/nav-day.svg',
    position: '50% 50%',
  },
  {
    id: 'weekend',
    number: '04',
    title: '赴约之外',
    subtitle: '周边游玩',
    note: '也想把这座城，介绍给你',
    image: '/assets/placeholders/nav-weekend.svg',
    position: '50% 50%',
  },
];

export const STORY_STEPS = [
  {
    id: 'together',
    date: '2016.09',
    title: '相恋',
    body: '从高中同桌到异地恋人，隔着西安与保定，我们用每天的消息和电话走过四年。',
  },
  {
    id: 'nanjing',
    date: '2017.xx',
    title: '同游',
    body: '第一次和朋友结伴远行，南京的夫子庙与总统府，留下了我们的青春足迹。',
  },
  {
    id: 'world-cup',
    date: '2022.12',
    title: '并肩',
    body: '一起熬过核酸与隔离，也第一次并肩熬夜，看完一场世界杯。',
  },
  {
    id: 'growth',
    date: '2023.07',
    title: '成长',
    body: '我迎来第一份工作，你为第一篇论文努力，我们在各自的路上并肩向前。',
  },
  {
    id: 'beijing',
    date: '2025.06',
    title: '奔赴',
    body: '我们一起到了北京，也一起走进人生的新阶段。',
  },
  {
    id: 'wedding',
    date: '2026.10',
    title: '成婚',
    body: '一路走到这一页，想邀请你来见证我们的婚礼。',
  },
] as const;

export const SCHEDULE_ITEMS = [
  { time: '11:00', title: '相迎', note: '循着红线而来，留下名字与祝福。' },
  { time: '11:30', title: '入席', note: '请慢慢坐好，良辰即将开启。' },
  { time: '11:58', title: '成礼', note: '在亲友的见证里，许下余生的约定。' },
  { time: '12:20', title: '共宴', note: '举杯同欢，把祝福融进这一席欢喜。' },
] as const;

export const GALLERY_GROUPS: Record<
  GalleryCategory,
  { label: string; photos: readonly PhotoItem[] }
> = {
  travel: {
    label: '旅途',
    photos: [1, 2, 3].map((number) => ({
      src: `/assets/placeholders/gallery-travel-0${number}.svg`,
      alt: `旅途分类第${number}张照片待补充`,
    })),
  },
  wedding: {
    label: '成婚',
    photos: [1, 2, 3].map((number) => ({
      src: `/assets/placeholders/gallery-wedding-0${number}.svg`,
      alt: `成婚分类第${number}张照片待补充`,
    })),
  },
};

export const VENUE_PHOTOS: readonly PhotoItem[] = [1, 2, 3].map((number) => ({
  src: `/assets/placeholders/venue-0${number}.svg`,
  alt: `场地影像第${number}张照片待补充`,
  title: `场地影像 0${number}`,
  note: '场地照片待补充',
}));

export const WEEKEND_SECTIONS: ReadonlyArray<{
  id: WeekendCategory;
  label: string;
  places: readonly WeekendPlace[];
}> = [
  {
    id: 'sightseeing',
    label: '一瞥',
    places: [],
  },
  {
    id: 'shopping',
    label: '拾趣',
    places: [],
  },
  { id: 'food', label: '寻味', places: [] },
];
