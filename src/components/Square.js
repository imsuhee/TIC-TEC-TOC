import React from "react";
import "./Square.css"
export const Square = ({ onClick, value }) => {
    const imageSource = value === "X" ? "./img/cat-icon1.png" : value === "O" ? "./img/cat-icon2.png" : null;

    // value가 null인 경우 이미지를 표시하지 않음
    return (
        <button className="square" onClick={onClick}>
            {value !== null && <img src={imageSource} alt={value} className="square-image" />}
        </button>
    )
}

export default Square;