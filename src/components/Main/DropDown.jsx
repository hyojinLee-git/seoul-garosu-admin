import React from 'react';
import { DropDownDiv,DropDownMenuButton,DropDownUl,DropDownLi } from './css/styleDropDown';

const DropDown = () => {
    const dropDownList=['전체 선택', '읽은 내용만','안읽은 내용만']
    return (
        <DropDownDiv>
            <DropDownUl>
                {
                    dropDownList.map(dropDownItem=>(
                        <DropDownLi key={dropDownItem}>
                            <DropDownMenuButton type='button'>{dropDownItem}</DropDownMenuButton>
                        </DropDownLi>
                    ))
                }
            </DropDownUl>
        </DropDownDiv>
    );
};

export default DropDown;