import React, {useContext} from 'react'
import {Button} from '@material-ui/core'
import {SocketContext} from '../socketContext.js'


function Notifications() {
    
    const {answerCall, call, callAccepted, callEnded} = useContext(SocketContext)
    
    return (
        <div>
            {call.isReceivingCall && !callAccepted &&(
                 <div style={{display: 'flex', justifyContent: 'space-around'}}>
                  <h1>{call.name} is calling:  </h1>
                <Button variant='contained' color='primary' onClick={answerCall}>
                Answer
                </Button>
                 </div>
            )} 
        </div>
    )
}

export default Notifications
