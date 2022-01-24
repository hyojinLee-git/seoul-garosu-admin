import React, { useEffect, useState } from 'react';
import {ApplyModalContentsWrapper,ApplyModalContentsHeader,ApplyModalContentsBody,ApplyModalContentsMeta,Button} from './css/style'
import { applyModalState} from '../../../state/applyModalState'
import { useRecoilState } from 'recoil';
import { clickedApplyState } from '../../../state/applyModalState';
import {getDatabase,ref,child,get, set} from 'firebase/database'
import {MdClear} from 'react-icons/md'
import { menuState } from '../../../state/menuState';

const ApplyModalContents = () => {
    const [showApplyModal,setShowApplyModal]=useRecoilState(applyModalState)
    //key
    const [clickedApply]=useRecoilState(clickedApplyState)
    //data 정보
    const [clickedApplyItem,setClickedApplyItem]=useState({})
    const {name, date,location, tree_location, tree_type}=clickedApplyItem
    //선택한 메뉴(임시)
    const [currentMenu]=useRecoilState(menuState)

    //close modal
    const closeApplyModal=()=>{
        setShowApplyModal(false)
    }

    //data loading
    useEffect(()=>{
        const dbref=ref(getDatabase())
        if(currentMenu==='전체 입양신청'){
            return
        }else if(currentMenu==='승인한 입양신청'){
            get(child(dbref,`Trees_taken/${clickedApply}`))
            .then((res)=>{
                setClickedApplyItem(res.val())
            })
            .catch(e=>console.log(e))
        }else if (currentMenu==='반려한 입양신청'){
            return
        }else if(currentMenu==='대기중인 입양신청'){
            get(child(dbref,`Candidates/${clickedApply}`))
            .then((res)=>{
                setClickedApplyItem(res.val())
            })
            .catch(e=>console.log(e))
        }else{
            return
        }

    },[clickedApply, currentMenu])

    return (
        <ApplyModalContentsWrapper>
            <ApplyModalContentsHeader>
                <h1>입양 신청서</h1>
                <button onClick={closeApplyModal}>
                    <MdClear size={35} color='rgba(0, 0, 0, 0.54)'/>
                </button>
            </ApplyModalContentsHeader>
            

            <ApplyModalContentsMeta>
                <div>
                    {name},{location},{date}
                </div>
                <div>
                    <Button color='#6AD39F'>승인</Button>
                    <Button color='#FFBEB4'>반려</Button>
                </div>
            </ApplyModalContentsMeta>
            <ApplyModalContentsBody>
                <h3>입양정보</h3>
                <div>
                    {tree_location} {tree_type}
                </div>
                <div>
                    <h3>지원동기</h3>
                    <p>
                        지원동기를 말하고 있습니다  지원동기를 말하고 있습니다  지원동기를 말하고 있습니다  지원동기를 말하고 있습니다  지원동기를 말하고 있습니다 
                    </p>
                </div>
            
        </ApplyModalContentsBody>
        </ApplyModalContentsWrapper>
    );
};

export default React.memo(ApplyModalContents);