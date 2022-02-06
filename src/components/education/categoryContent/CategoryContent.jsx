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
                            className={currentCategory===el.title? 'current-category':''}
                            onClick={onChangeCategory}
                            color={
                                el.color
                            } 
                            key={el.title}>
                                {el.title}
                        </Button>
                    ))
                }
            </div>
            <DateContent currentCategory={currentCategory}/>
            
        </>
    );
};

export default React.memo(CategoryContent);