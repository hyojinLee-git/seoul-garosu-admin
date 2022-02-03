import React, {  useCallback, useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoryListState } from '../../../state/education/categoryListState';
import DateContent from '../dateContent/DateContent';
import { Button,Input,CategoryForm,FormButton } from './style';
import {getDatabase,ref,update} from 'firebase/database'


const CategoryContent = () => {
    const [categoryList,]=useRecoilState(categoryListState)
    const [category,setCategory]=useState('')

    
    const [currentCategory,setCurrentCategory]=useState('전체보기')
    const colorChart=['#E2E1E1','#F9C3C3','#F7D1C6','#F9E5C4','#FCF2C7','#DFECBB','#BEDACD','#D8F5F4','#B8EAE7','#B5C7ED','#D1CEF6','#E1C4EE','#FDDDF9','#FAC5E0','#FED5D7','#C5C5C5']
    const db=getDatabase()

    const onChangeCategory=(e)=>{
        setCurrentCategory(e.target.innerText)
    }

    const onChange=useCallback((e)=>{
        setCategory(e.target.value)
    },[])

    const onSubmitCategory=(e)=>{
        e.preventDefault()
        if(!category || !category.trim()){
            alert('카테고리를 입력해주세요.')
            return
        }
        if(categoryList.length>10){
            alert('10개 이상입니다.')
            return
        }
        const updates={}
        updates[`/Educations/${category}`]=''
        update(ref(db),updates)
    }

    

    return (
        <>
            <CategoryForm onSubmit={onSubmitCategory}>
                <FormButton type='submit'>카테고리 생성하기</FormButton>
                <Input onChange={onChange} value={category} type="text"/>
            </CategoryForm>
            <div>
                <Button
                    className={currentCategory==='전체보기'? 'current-category':''}
                    onClick={onChangeCategory}
                >전체보기</Button>
                {
                    categoryList?.map(el=>(
                        <Button
                            className={currentCategory===el? 'current-category':''}
                            onClick={onChangeCategory}
                            color={
                                colorChart[Math.floor(Math.random()*colorChart.length)]
                            } 
                            key={el}>
                                {el}
                        </Button>
                    ))
                }
            </div>
            <DateContent currentCategory={currentCategory}/>
            
        </>
    );
};

export default React.memo(CategoryContent);