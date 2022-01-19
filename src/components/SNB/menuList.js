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
  },
  {
    icon: <MdCheck size={24} />,
    title: '승인한 입양신청',
  },
  {
    icon: <MdReport size={24} />,
    title: '반려한 입양신청',
  },
  {
    icon: <MdRemoveCircle size={24} />,
    title: '대기중인 입양신청',
  },
];

export const treeMenuList = [
  {
    icon: <MdMap size={24} />,
    title: '모니터링 지도',
  },
  {
    icon: <MdBarChart size={24} />,
    title: '가로수 데이터관리',
  },
];
