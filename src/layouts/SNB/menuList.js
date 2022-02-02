import {
  MdDrafts,
  MdCheck,
  MdReport,
  MdRemoveCircle,
  MdMap,
  MdBarChart,
} from 'react-icons/md';

export const mainMenuList = [
  {
    icon: <MdDrafts size={24} />,
    title: '전체 입양신청',
    link: '/adopt/all',
  },
  {
    icon: <MdCheck size={24} />,
    title: '승인한 입양신청',
    link: '/adopt/approval',
  },
  {
    icon: <MdReport size={24} />,
    title: '반려한 입양신청',
    link: '/adopt/rejection',
  },
  {
    icon: <MdRemoveCircle size={24} />,
    title: '대기중인 입양신청',
    link: '/adopt/waiting',
  },
];

export const treeMenuList = [
  {
    icon: <MdMap size={24} />,
    title: '모니터링 지도',
    link: '/tree/map',
  },
  {
    icon: <MdBarChart size={24} />,
    title: '가로수 데이터관리',
    link: '/tree/data',
  },
];

export const educationMenuList = [
  {
    title: '교육 관리',
    link: '/education/education',
  },
  {
    title: '공지사항 관리',
    link: '/education/notice',
  },
];
