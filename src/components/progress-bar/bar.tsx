import React from 'react'
import './bar.css'

interface IProps{
    completed: number,
    color?: string
}

const bar:React.FC<IProps> = ({completed, color}) => {
    return (
        <div className="border">
            <div style={{width: `${completed}%`, background: color}} className="Progress"></div>
        </div>
    )
}

export default bar;
