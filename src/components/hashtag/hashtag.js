import React from 'react';
import { useState } from "react"
import './hashtag.css'
const Hashtag = () => {
    const [hashtags, setHashtags] = useState(['fashion', 'style', ' cute', 'life', 'picoftheday', 'photography', 'instagram', 'beautiful', 'photooftheday', 'instagood']);

    return (
        <>
            <form className={'hashtags'}>
                <h1> Related Hashtags: </h1>
                <ul className="i-group">
                    {hashtags.map((hashtag, index) => {
                        return (
                            <li key={index} >
                                <span> {index + 1}.</span>
                                <span className="hashtag"> #{hashtag}</span>
                            </li>
                        )
                    })
                    }
                </ul>
            </form>
        </>
    )
}
export default Hashtag