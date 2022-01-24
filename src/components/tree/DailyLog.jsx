import React from 'react';
import {DailyLogWrapper} from './style'

const DailyLog = () => {
    return (
        <DailyLogWrapper>
            <h3>서울시 00구 00동</h3>
            <div>
                <div>
                    <span>전체 참여자수</span>
                    <span>356</span>
                </div>
                <div>
                    <span>오늘 미션 참여자수</span>
                    <span>120</span>
                </div>
            </div>
        </DailyLogWrapper>
    );
};

export default DailyLog;