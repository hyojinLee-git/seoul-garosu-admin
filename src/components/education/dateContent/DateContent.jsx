import React, { useEffect, useState } from 'react';
import {ListHeader, Ul, Li} from './style'
import {MdCreate,MdClose} from 'react-icons/md'
import { useRecoilState } from 'recoil';
import { educationListState } from '../../../state/education/educationListState';
import DropDown from './DropDown';
import Paging from '../../adopt/pagination/Paging'
import { dateAscending } from '../../../utils/sortFunction';
import {deleteObject, getStorage,ref} from 'firebase/storage'
import { currentPageState } from '../../../state/currentPageState';
import axios from 'axios'

const DateContent = ({currentCategory}) => {
    const [filteredList,setFilteredList]=useState([])
    const [educationList,]=useRecoilState(educationListState)
    const [isDeleteMode,setIsDeleteMode]=useState(false)
    const [showDropDown,setShowDropDown]=useState(false)
    const [dropDownPosition,setDropDownPosition]=useState('')
    const [currentPage,setCurrentPage]=useRecoilState(currentPageState)
    const maxDataCurrentPage=currentCategory? 3:4
    const storage=getStorage()
    //pagination
    const startIndex=(Number(currentPage)-1)*maxDataCurrentPage
    const endIndex=(filteredList.length-startIndex)%maxDataCurrentPage===0? 
        Number(currentPage)*10:
            Math.ceil(filteredList.length/maxDataCurrentPage)===Number(currentPage)?
            filteredList.length:startIndex+maxDataCurrentPage
    const currentData=filteredList.slice(startIndex,endIndex)

    //이름때매 죽겠네
    const onClickDropDown=(e)=>{
        if(e.target.tagName==='BUTTON') return
        setShowDropDown(!showDropDown)
        setDropDownPosition(Number(e.currentTarget.offsetTop)+50)
    }

    const onModify=()=>{
        console.log('수정수정')
    }

    const onDelete=(e)=>{
        const {category,key,content}=e.currentTarget.parentNode.dataset

        //delete data from realtime database
        axios.delete(`${process.env.REACT_APP_DATABASE_URL}/Education/${category}/${key}`)
        .catch(e=>console.log(e))

        //delete data from storage
        deleteObject(ref(storage,content))
        .catch(e=>console.log(e))
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


        return ()=>{
            setCurrentPage(1)
        }


    },[currentCategory, educationList, setCurrentPage])

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
                    currentData?.map((el,idx)=>(
                        <Li
                            data-filename={el.content}
                            data-key={el.key}
                            data-category={el.category}
                            key={idx} 
                            onClick={(e)=>onClickDropDown(e)}
                            color={el.color}
                        >
                            <div style={{width:"90%",height:"100%",background:"#c4c4c4"}}>thumbnail</div>
                            {/* <video width="90%" controls>
                                <source src={"https://firebasestorage.googleapis.com/v0/b/garosero-70ff7.appspot.com/o/Educations%2FPlanting%2FPexels%20Videos%203617.mp4?alt=media&token=7c13c008-d6b8-4d14-8111-53f20f51a347"} type="video/mp4"/>
                            </video> */}
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
                itemsCountPerPage={maxDataCurrentPage} 
                pageRangeDisplayed={maxDataCurrentPage}
            />
            {showDropDown && <DropDown setShowDropDown={setShowDropDown} setIsDeleteMode={setIsDeleteMode} dropDownPosition={dropDownPosition}/>}
        </>
    );
};

export default React.memo(DateContent);