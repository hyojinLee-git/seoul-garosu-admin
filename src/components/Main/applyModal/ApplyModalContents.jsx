import React, { useEffect, useState } from 'react';
import {ApplyModalContentsDiv} from './css/styledApplyModal'
import { applyModalState} from '../../../state/applyModalState'
import { useRecoilState } from 'recoil';
import { clickedApplyState } from '../../../state/applyModalState';
import {getDatabase,ref,child,get, set} from 'firebase/database'

const ApplyModalContents = () => {
    const [showApplyModal,setShowApplyModal]=useRecoilState(applyModalState)
    const [clickedApply]=useRecoilState(clickedApplyState)
    const [clickedApplyItem,setClickedApplyItem]=useState({})
    const {name, date,location, tree_location, tree_type}=clickedApplyItem
    const closeApplyModal=()=>{
        setShowApplyModal(false)
    }
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
        <ApplyModalContentsDiv>
            <h1>입양 신청서</h1>
            <button onClick={closeApplyModal}>x</button>
            <hr/>
            <div>
                <span>
                    {name},{location},{date}
                </span>
                <button>승인</button>
                <button>반려</button>
            </div>
            <div>
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
            </div>
        </ApplyModalContentsDiv>
    );
};

export default ApplyModalContents;