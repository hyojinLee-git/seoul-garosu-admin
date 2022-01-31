import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {MdRefresh,MdOutlineChevronLeft,MdOutlineChevronRight,MdArrowDropDown} from 'react-icons/md'
import { checkboxState } from '../../../state/checkboxState';
import {AdmissionBarDiv,AdmissionBarButton,ProcessButton} from './style'
import { useRecoilState } from 'recoil';
import { fetchDataState } from '../../../state/fetchDataState';
import { CheckBox } from '../style';
import { checkedListState } from '../../../state/checkedListState';
import { tokenState } from '../../../state/tokenState';
import { modalState } from '../../../state/modalState';
import { admissionState } from '../../../state/admissionState';

const AdmissionBar = ({onToggleDropDown}) => {
    const [checked,setChecked]=useRecoilState(checkboxState)
    const [dataList,]=useRecoilState(fetchDataState)
    const [checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [token,]=useRecoilState(tokenState)
    const [,setShowModal]=useRecoilState(modalState)
    const [,setAdmission]=useRecoilState(admissionState)


    const dbURL=process.env.REACT_APP_DATABASE_URL;
    //이거 컴포넌트 마운트언마운트 시간대 바뀌는지 알아야할듯
    const today=new Date();

    
    const onChange=()=>{
        setChecked(!checked)
    }
    
    

    //승인버튼
    //promise.all 쓰면 더 빠름
    const onSubmitApproval=()=>{

        //선택한 데이터 없을때
        if(checkedList.length===0) {
            alert('선택한 신청이 없습니다.')
            return
        }
        //승인or 반려 테이블의 데이터 있으면 return
        for(let i=0;i<checkedList.length;i++){
            if(checkedList[i].field==='Trees_taken'||checkedList[i].field==='Rejections'){
                alert('이미 처리된 요청이 있습니다.')
                setCheckedList([])
                return
            }
        }
        
        //백엔드 통신
        checkedList.forEach(checkedListItem=>{

            //data 전처리
            const postData={
                ...checkedListItem,
                xp:0,
                start_date:`${today.getFullYear()}-${today.getMonth()+1>=10? today.getMonth()+1:`0${today.getMonth()+1}`}-${today.getDate()}`,
                tree_name:checkedListItem.tree_id
            }
            delete postData.field
            delete postData.key
            delete postData.date

            //Trees_taken에 데이터 추가
            axios.post(`${dbURL}/Trees_taken.json?auth=${token}`,postData)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))

            //Candidates에서 데이터 삭제
            axios.delete(`${dbURL}/Candidates/${checkedListItem.key}.json?auth=${token}`)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))

            
        })

        //modal창 열기
        setAdmission('승인')
        setShowModal(true)
        

    }
    //반려버튼
    const onSubmitRejection=()=>{

        //선택한 데이터 없을때
        if(checkedList.length===0) {
            alert('선택한 신청이 없습니다.')
            return
        }
        //반려 테이블에 데이터 있는지 검사
        for(let i=0;i<checkedList.length;i++){
            if(checkedList[i].field==='Rejections'){
                alert('이미 반려된 요청이 있습니다.')
                setCheckedList([])
                return
            }
        }

        //백엔드 통신
        checkedList.forEach(checkedListItem=>{

            //Rejection에 데이터 추가
            axios.post(`${dbURL}/Rejections.json?auth=${token}`,checkedListItem)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))

            //Candidates에서 데이터 삭제
            axios.delete(`${dbURL}/Candidates/${checkedListItem.key}.json?auth=${token}`)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))

            //Trees_taken에서 데이터 삭제
            axios.delete(`${dbURL}/Trees_taken/${checkedListItem.key}.json?auth=${token}`)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))
            
        })

        //modal창 열기
        setShowModal(true)
        setAdmission('반려')

    }
    
    const onSubmitWait=()=>{
        //선택한 데이터 없을때
        if(checkedList.length===0) {
            alert('선택한 신청이 없습니다.')
            return
        }
        //반려 테이블에 데이터 있는지 검사
        for(let i=0;i<checkedList.length;i++){
            if(checkedList[i].field==='Candidates'){
                alert('대기중인 요청이 있습니다.')
                setCheckedList([])
                return
            }
        }

        //백엔드 통신
        checkedList.forEach(checkedListItem=>{
            //여기는 좀 전처리 필요할듯

            //Rejection에 데이터 추가
            axios.post(`${dbURL}/Candidates.json?auth=${token}`,checkedListItem)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))

            //Candidates에서 데이터 삭제
            axios.delete(`${dbURL}/Rejections/${checkedListItem.key}.json?auth=${token}`)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))

            //Trees_taken에서 데이터 삭제
            axios.delete(`${dbURL}/Trees_taken/${checkedListItem.key}.json?auth=${token}`)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))
            
        })

        //modal창 열기
        setShowModal(true)
        setAdmission('반려')
    }

    //새로고침 버튼
    const onRefresh=()=>{
        window.location.reload()
    }

    
    useEffect(()=>{
        if (checked){
            setCheckedList(dataList)
        }else{
            setCheckedList([])
        }

    },[checked, dataList, setCheckedList])

    useEffect(()=>{
        if(dataList.length===checkedList.length&&dataList.length!==0 && checkedList.length!==0){
            setChecked(true)
        }

    },[checkedList.length, dataList.length, setChecked])

    return (
        <AdmissionBarDiv>
            <div>
                <CheckBox 
                    type="checkbox" 
                    onChange={onChange}
                    checked={dataList.length!==0 && checkedList.length===dataList.length}
                />
                <AdmissionBarButton onClick={onToggleDropDown} type='button'> 
                    <MdArrowDropDown size={18}/>
                </AdmissionBarButton>
            </div>
            <div>
                {/* 제출부분인가 */}
                <ProcessButton onClick={onSubmitApproval}  type='button' className={"admission-btn"} color="#6AD39F">승인</ProcessButton>
                <ProcessButton onClick={onSubmitRejection}  type='button' className={"admission-btn"} color="#FF7E6B">반려</ProcessButton>
                <ProcessButton type='button' className={"admission-btn"} color="#DADADA">대기</ProcessButton>
            </div>
            <div>
                <AdmissionBarButton type='button' onClick={onRefresh}>
                    <MdRefresh size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
                <AdmissionBarButton type='button'>
                    <MdOutlineChevronLeft size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
                <AdmissionBarButton type='button'>
                    <MdOutlineChevronRight size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
            </div>
        </AdmissionBarDiv>
    );
};

export default React.memo(AdmissionBar);