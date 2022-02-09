import React, { useEffect } from 'react';
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
import { onSubmitApproval,onSubmitRejection } from '../../../utils/submitFunction';
import { currentPageState } from '../../../state/currentPageState';
import { getDatabase,ref,update } from 'firebase/database';

const AdmissionBar = ({onToggleDropDown}) => {
    const [checked,setChecked]=useRecoilState(checkboxState)
    const [dataList,]=useRecoilState(fetchDataState)
    const [checkedList,setCheckedList]=useRecoilState(checkedListState)
    const [token,]=useRecoilState(tokenState)
    const [,setShowModal]=useRecoilState(modalState)
    const [,setAdmission]=useRecoilState(admissionState)
    const [currentPage,setCurrentPage]=useRecoilState(currentPageState)

    const db=getDatabase()
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    //이거 컴포넌트 마운트언마운트 시간대 바뀌는지 알아야할듯

    
    const onChange=()=>{
        setChecked(!checked)
    }
    const onPrevPage=()=>{
        if(currentPage<=1) return
        setCurrentPage(currentPage-1)
    }
    const onNextPage=()=>{
        const lastPage=Math.ceil(dataList.length/10)
        //마지막 페이지면 return
        if(currentPage>=lastPage) return
        setCurrentPage(currentPage+1)
    }
    
    const onSubmitWait=()=>{
        //선택한 데이터 없을때
        if(checkedList.length===0) {
            alert('선택한 신청이 없습니다.')
            return
        }
        //대기 테이블에 데이터 있는지 검사
        for(let i=0;i<checkedList.length;i++){
            if(checkedList[i].field==='Candidates'){
                alert('대기중인 요청이 있습니다.')
                setCheckedList([])
                return
            }
        }
        console.log(checkedList)

        //백엔드 통신
        checkedList.forEach(checkedListItem=>{
            //데이터 전처리
            const postData={...checkedListItem}

            delete postData.key
            delete postData.field

            //Candidates에 데이터 추가
            const updates={}
            updates[`Candidates/${checkedListItem.key}`]=postData
            update(ref(db),updates)

            //approve일때 Trees_taken에 데이터 삭제
            if(checkedListItem.field==='Approve'){
                axios.delete(`${dbURL}/Trees_taken/${checkedListItem.key}.json?auth=${token}`)
                .then(res=>console.log(res))
                .catch(e=>console.log(e))
            }

            //Rejections에서 데이터 삭제
            axios.delete(`${dbURL}/Rejections/${checkedListItem.key}.json?auth=${token}`)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))

            //Approve에서 데이터 삭제
            axios.delete(`${dbURL}/Approve/${checkedListItem.key}.json?auth=${token}`)
            .then(res=>console.log(res))
            .catch(e=>console.log(e))
            
        })

        //modal창 열기
        setShowModal(true)
        setAdmission('대기')
    }

    //새로고침 버튼
    const onRefresh=()=>{
        //내생각엔 이건 그냥 현재 데이터 새로고침인데
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
                {/* submit button */}
                <ProcessButton 
                    onClick={()=>onSubmitApproval(  
                        checkedList,
                        setCheckedList,
                        token,
                        setAdmission,
                        setShowModal)}  
                        type='button' 
                        className="admission-btn" 
                        color="#6AD39F">
                            승인
                </ProcessButton>
                <ProcessButton 
                    onClick={()=>onSubmitRejection(  checkedList,
                        setCheckedList,
                        token,
                        setShowModal,
                        setAdmission,)}  
                    type='button' 
                    className="admission-btn" 
                    color="#FF7E6B">
                        반려
                </ProcessButton>
                <ProcessButton 
                    type='button' 
                    className="admission-btn"
                    onClick={onSubmitWait}
                    color="#DADADA">
                        대기
                </ProcessButton>
            </div>
            <div>
                <AdmissionBarButton type='button' onClick={onRefresh}>
                    <MdRefresh size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
                <AdmissionBarButton type='button' onClick={onPrevPage}>
                    <MdOutlineChevronLeft size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
                <AdmissionBarButton type='button' onClick={onNextPage}>
                    <MdOutlineChevronRight size={24} color='rgba(0, 0, 0, 0.54)'/>
                </AdmissionBarButton>
            </div>
        </AdmissionBarDiv>
    );
};

export default React.memo(AdmissionBar);