import axios from 'axios';
import { update, ref, getDatabase } from 'firebase/database';

const dbURL = process.env.REACT_APP_DATABASE_URL;

const db = getDatabase();
//승인버튼
//promise.all 쓰면 더 빠름
export const onSubmitApproval = (
  checkedList,
  setCheckedList,
  token,
  setAdmission,
  setShowModal,
) => {
  //선택한 데이터 없을때
  if (checkedList.length === 0) {
    alert('선택한 신청이 없습니다.');
    return;
  }
  //승인or 반려 테이블의 데이터 있으면 return
  for (let i = 0; i < checkedList.length; i++) {
    if (
      checkedList[i].field === 'Approve' ||
      checkedList[i].field === 'Rejections'
    ) {
      alert('이미 처리된 요청이 있습니다.');
      setCheckedList([]);
      return;
    }
  }

  const today = new Date(+new Date() + 3240 * 10000).toISOString().split('T');

  //백엔드 통신
  checkedList.forEach(checkedListItem => {
    //data 전처리
    const postData = {
      ...checkedListItem,
      date: `${today[0]} ${today[1].split(':')[0]}:${today[1].split(':')[1]}`,
    };
    delete postData.field;
    delete postData.key;

    //Approve에 데이터 추가
    const updates = {};
    updates[`Approve/${checkedListItem.key}`] = postData;
    update(ref(db), updates);

    //Trees_taken에 데이터 추가
    const updateData = {};
    updateData[`Trees_taken/${checkedListItem.key}`] = {
      xp: 0,
      tree_name: `${checkedListItem.name}의 나무`,
    };
    update(ref(db), updateData);

    // //Candidates에서 데이터 삭제
    axios
      .delete(`${dbURL}/Candidates/${checkedListItem.key}.json?auth=${token}`)
      .catch(e => console.log(e));
  });

  //modal창 열기
  setAdmission('승인');
  setShowModal(true);
};

//반려버튼
export const onSubmitRejection = (
  checkedList,
  setCheckedList,
  token,
  setShowModal,
  setAdmission,
) => {
  //선택한 데이터 없을때
  if (checkedList.length === 0) {
    alert('선택한 신청이 없습니다.');
    return;
  }
  //반려 테이블에 데이터 있는지 검사
  for (let i = 0; i < checkedList.length; i++) {
    if (checkedList[i].field === 'Rejections') {
      alert('이미 반려된 요청이 있습니다.');
      setCheckedList([]);
      return;
    }
  }

  //백엔드 통신
  checkedList.forEach(checkedListItem => {
    //데이터 전처리
    const postData = {
      ...checkedListItem,
    };
    delete postData.key;
    delete postData.field;

    //Rejection에 데이터 추가
    const updates = {};
    updates[`/Rejections/${checkedListItem.key}`] = postData;
    update(ref(db), updates);

    //Candidates에서 데이터 삭제
    axios
      .delete(`${dbURL}/Candidates/${checkedListItem.key}.json?auth=${token}`)
      .catch(e => console.log(e));

    //Trees_taken에서 데이터 삭제
    axios
      .delete(`${dbURL}/Approve/${checkedListItem.key}.json?auth=${token}`)
      .catch(e => console.log(e));
  });

  //modal창 열기
  setShowModal(true);
  setAdmission('반려');
};
