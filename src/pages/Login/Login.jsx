import React, {  useState } from 'react';
import {Input,Button,Label,Form,LogoDiv,MetaData,Error} from './style'
import LogoImg from '../../assets/logo.png'
import { authService } from '../../utils/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate=useNavigate();
    const [loginData,setLoginData]=useState({
        id:'',
        password:''
    })
    const [error,setError]=useState(false)

    //change input function
    const onChangeLonginData=(e)=>{
        const {value,name}=e.target
        setLoginData({
            ...loginData,
            [name]:value
        })
    }

    //중복 로그인 방지
    // if(authService.currentUser){
    //     return <Navigate replace to="/main"/>
    // }

    //submit function
    const onSubmit= async (e)=>{
        e.preventDefault();
        const {id,password}=loginData;
        setError(false)
        try{
            
            await signInWithEmailAndPassword(authService,id,password)
            setError(false)
            //main으로 이동
            navigate('/adopt/all/1')
        }catch(e){
            if (e.code==='auth/user-not-found'){
                setError('허가되지 않은 사용자입니다.')
            }else if(e.code==='auth/wrong-password'){
                setError('비밀번호가 일치하지 않습니다.')
            }else{
                setError('알수없는 오류가 발생하였습니다.')
            }
        }

    }
    return (
        <div>
            <LogoDiv>
                <img src={LogoImg} alt="logo"/>
                서울가로수
            </LogoDiv>
            <MetaData>
                서울가로수를 통해 <br/>쉽고 빠르게 입양자를 관리하세요
            </MetaData>
            <Form onSubmit={onSubmit}>
                <Label>
                    <Input 
                        type="email" 
                        placeholder='아이디' 
                        value={loginData.id} 
                        onChange={onChangeLonginData} name='id'
                    />
                </Label>
            <Label>
                <Input 
                    type="password" 
                    placeholder='비밀번호' 
                    value={loginData.password} 
                    onChange={onChangeLonginData} 
                    name='password'
                />
            </Label>
            {error && <Error>{error}</Error>}
            <Button type='submit'>로그인</Button>
            </Form>

        </div>
    );
};

export default Login;