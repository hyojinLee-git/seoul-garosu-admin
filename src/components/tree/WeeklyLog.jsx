import React from 'react';
import {WeeklyLogWrapper,Wrapper} from './style'

const WeeklyLog = () => {
    return (
        <WeeklyLogWrapper>
            <Wrapper color="#989594">
                <div>
                    <div>월</div>
                    <div>17</div>
                </div>
                <div>
                    <div>화</div>
                    <div>18</div>
                </div>
                <div>
                    <div>수</div>
                    <div>19</div>
                </div>
                <div>
                    <div>목</div>
                    <div>20</div>
                </div>
                <div className='today'>
                    <div>금</div>
                    <div>21</div>
                </div>
                <div>
                    <div>토</div>
                    <div>22</div>
                </div>
                <div>
                    <div>일</div>
                    <div>23</div>
                </div>
            </Wrapper>
            <Wrapper border="1px solid #EDEAE9" color="#707070" size="25px">
                <div>123</div>
                <div>245</div>
                <div>156</div>
                <div>134</div>
                <div className='today'>120</div>
                <div>176</div>
                <div>234</div>
               
            </Wrapper>
        </WeeklyLogWrapper>
    );
};

export default WeeklyLog;