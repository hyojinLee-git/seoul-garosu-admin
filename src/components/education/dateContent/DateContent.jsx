import React, { useEffect, useState } from 'react';
import {ListHeader, Ul, Li} from './style'
import {MdCreate,MdClose} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import { educationListState } from '../../../state/education/educationListState';
import DropDown from './DropDown';
import Paging from '../../adopt/pagination/Paging';
import { dateAscending } from '../../../utils/sortFunction';



const DateContent = ({currentCategory}) => {
    const [filteredList,setFilteredList]=useState([])
    const [educationList,]=useRecoilState(educationListState)
    const [isDeleteMode,setIsDeleteMode]=useState(false)
    const [showDropDown,setShowDropDown]=useState(false)
    const [dropDownPosition,setDropDownPosition]=useState('')

    

    //이름때매 죽겠네
    const onClickDropDown=(e)=>{
        if(e.target.tagName==='BUTTON') return
        setShowDropDown(!showDropDown)
        setDropDownPosition(Number(e.currentTarget.offsetTop)+50)
    }

    const onModify=()=>{
        console.log('수정')
    }

    const onDelete=()=>{
        console.log('삭제')
    }



    useEffect(()=>{
        //좀 꼬인듯
        if(currentCategory==='전체보기'||!currentCategory){
            const data=[...educationList]
            data.sort(dateAscending)
            setFilteredList(data)
            
        }else{
            const filteredData=educationList.filter(el=>el.category===currentCategory)
            filteredData.sort(dateAscending)
            setFilteredList(filteredData)
        }
    },[currentCategory, educationList])

    return (
        <>
            <ListHeader>
                <span>컨텐츠 제목</span>
                <span>회차 정보</span>
                <span>카테고리명</span>
                <span>게시글</span>
            </ListHeader>
            <Ul>
                {
                    filteredList?.map((el,idx)=>(
                        <Li key={idx} onClick={(e)=>onClickDropDown(e)}>
                            <div style={{width:"100px",height:"100%",background:'#C4C4C4'}}>thumbnail</div>
                            <div>
                                <h3 className='meta-title'>
                                    {el.title}
                                </h3>
                                <div>
                                    {el.description}
                                </div>
                            </div>
                            <div>
                                {el.title}
                            </div>
                            <div>
                                {el.category}
                            </div>
                            <div>
                                {el.date}
                            </div>
                            {
                                isDeleteMode?
                                <button onClick={onDelete}><MdClose size={16}/></button>:
                                <button onClick={onModify}><MdCreate size={16}/></button>
                            }
                            
                        </Li>
                    ))
                }
            </Ul>
            <Paging 
                totalItemsCount={filteredList.length} 
                itemsCountPerPage={currentCategory==='전체보기'||!currentCategory? 3:4} 
                pageRangeDisplayed={currentCategory==='전체보기'||!currentCategory? 3:4}
            />
            {showDropDown && <DropDown setShowDropDown={setShowDropDown} setIsDeleteMode={setIsDeleteMode} dropDownPosition={dropDownPosition}/>}
        </>
    );
};

export default React.memo(DateContent);