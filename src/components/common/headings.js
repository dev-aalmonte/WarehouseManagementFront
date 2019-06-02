import React from 'react';

export function Heading ({className, text}) {
    return (
        <div className={`${className} heading`}>
            {text}
        </div>
    )
}