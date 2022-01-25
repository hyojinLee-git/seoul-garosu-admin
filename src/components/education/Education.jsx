import React from 'react';
import {EducationContainer,ControlBar,Button,ListHeader, Ul, Li} from './style'
import {MdCreate} from 'react-icons/md'

const Education = () => {
    const dataList=[
        {
            title:"제목",
            contents:"내용내용",
            category:'식물관리',
            date:'2022.01.23',
            id:1
        },{
            title:"제목",
            contents:"내용내용",
            category:'식물관리',
            date:'2022.01.23',
            id:2
        },{
            title:"제목",
            contents:"내용내용",
            category:'식물관리',
            date:'2022.01.23',
            id:3
        },{
            title:"제목",
            contents:"내용내용",
            category:'식물관리',
            date:'2022.01.23',
            id:4
        },{
            title:"제목",
            contents:"내용내용",
            category:'식물관리',
            date:'2022.01.23',
            id:5
        },
    ]
    return (
        <EducationContainer>
            <h2>교육 관리</h2>
            <ControlBar>
                <div>
                    <Button color="white" border="3px solid" width="180px">
                        업로드 날짜
                    </Button>
                    <Button color="white" border="3px solid">
                        카테고리
                    </Button>
                </div>
                <Button color="#669AFF" borderRadius="5px">추가하기</Button>
            </ControlBar>
            <ListHeader>
                <span>컨텐츠 제목</span>
                <span>회차 정보</span>
                <span>카테고리명</span>
                <span>게시글</span>
            </ListHeader>
            <Ul>
                {
                    dataList.map(el=>(
                        <Li key={el.id}>
                            <div style={{width:"100px",height:"75px",background:'#C4C4C4'}}>thumbnail</div>
                            <div className='meta'>
                                <h3>
                                    {el.title}
                                </h3>
                                <div>
                                    {el.contents}
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
        </EducationContainer>
    );
};

export default Education;