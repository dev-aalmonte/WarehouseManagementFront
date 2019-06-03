import React from 'react';

export function PlaceholderImage({className, width, height}) {
    return (
        <img className={`${className} image`} src={`http://via.placeholder.com/${width}x${height}`} />
    )
}

export function BackgroundImage({className, src}) {
    return (
        <img className={`${className} image`} src={src} />
    )
}