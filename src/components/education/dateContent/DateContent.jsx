import React, { useEffect, useState } from 'react';
import {ListHeader, Ul, Li} from './style'
import {MdCreate} from 'react-icons/md'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../../state/tokenState';
import { educationListState } from '../../../state/education/educationListState';



const DateContent = () => {
    const dbURL=process.env.REACT_APP_DATABASE_URL;
    const [token,]=useRecoilState(tokenState)
    const [educationList,setEducationList]=useRecoilState(educationListState)
    
    const convertData=(dataList,categoryList)=>{
        const convertedData=[]
        for(let i=0;i<dataList.length;i++){
            const temp=[]
            temp.push(...Object.values(dataList[i]))
            for(let j=0;j<temp.length;j++){
                convertedData.push({...temp[j],category:categoryList[i]})
            }
            
        }
        return convertedData
    }

    useEffect(()=>{
        axios.get(`${dbURL}/Educations.json?auth=${token}`)
        .then(res=>{
            const convertedData=convertData(Object.values(res.data),Object.keys(res.data))
            setEducationList(convertedData)
            //아몰랑ㅠ
        })
        .catch(e=>console.log(e))
    },[dbURL, setEducationList, token])
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
                    educationList?.map((el,idx)=>(
                        <Li key={idx}>
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
                            
                            <button>
                                <MdCreate/>
                            </button>
                            
                        </Li>
                    ))
                }
            </Ul>
        </>
    );
};

export default DateContent;