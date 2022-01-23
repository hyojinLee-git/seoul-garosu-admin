import React, { useEffect, useState } from 'react';
import {ApplyModalContentsWrapper,ApplyModalContentsHeader,ApplyModalContentsBody,ApplyModalContentsMeta,Button} from './css/style'
import { applyModalState} from '../../../state/applyModalState'
import { useRecoilState } from 'recoil';
import { clickedApplyState } from '../../../state/applyModalState';
import {getDatabase,ref,child,get, set} from 'firebase/database'
import {MdClear} from 'react-icons/md'

const ApplyListModalContents = () => {
    const [showApplyModal,setShowApplyModal]=useRecoilState(applyModalState)
    const [clickedApply]=useRecoilState(clickedApplyState)
    const [clickedApplyItem,setClickedApplyItem]=useState({})
    const {name, date,location, tree_location, tree_type}=clickedApplyItem

    //close modal
    const closeApplyModal=()=>{
        setShowApplyModal(false)
    }

    

    //data loading
    useEffect(()=>{
        //아이디로 가져오긴 해야댐
        //키 가져와야되네!?
        const dbref=ref(getDatabase())
        get(child(dbref,`Candidates/-Mpyi-aJ4x0K3KqdFgQV`))
        .then((res)=>{
            console.log(res.val())
            setClickedApplyItem(res.val())
        })
        .catch(e=>console.log(e))
    },[])

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

export default ApplyListModalContents;