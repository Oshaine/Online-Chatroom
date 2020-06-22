import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({message: {text, user}, name})=>{
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();
    if(user === trimmedName){
        isSentByCurrentUser = true;
    }
    return(
        isSentByCurrentUser 
        ?(
            <div className="messageContainer justifyEnd">
                <p className="sent-Text pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="MessageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        :(
        <div className="messageContainer justifyStart">
            
            <div className="messageBox backgroundLight">
             <p className="MessageText colorDark">{ReactEmoji.emojify(text)}</p>
           
            </div>
            <p className="sent-Text pl-10">{user}</p>
        </div> 
        )
    )
}


export default Message;