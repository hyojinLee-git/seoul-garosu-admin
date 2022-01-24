import React from 'react';
import DailyLog from './DailyLog';
import Map from './Map';
import WeeklyLog from './WeeklyLog';
import ParticipationRate from './ParticipationRate'
import PoorManagement from './PoorManagement';
import { TreeWrapper } from './style';

const MainContents = () => {
    return (
        <TreeWrapper>
            <div style={{display:'flex'}}>
                <DailyLog/>
                <WeeklyLog/>
            </div>
            <Map/>
            <div style={{display:'flex'}}>
                <PoorManagement/>
                <ParticipationRate/>
            </div>
        </TreeWrapper>
    );
};

export default MainContents;