import React, { useEffect } from 'react';

const OutsideModal = () => {
    const useOutside=(ref)=>{
        const handleClickOutside=(event)=>{
            if(ref.current && !ref.current.contains(event.target)){
                alert('you clicked outside')
            }
        }
        useEffect(()=>{
            document.addEventListener('mousedown',handleClickOutside)
            return()=>{
                document.removeEventListener('mousedown',handleClickOutside)
            }
        })
    }

    return (
        <div>
            
        </div>
    );
};

export default OutsideModal;