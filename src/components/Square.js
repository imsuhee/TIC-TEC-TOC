import React from "react";
import "./Square.css"

export const Square = ({ onClick, value }) => {
    const imageSource = value === "X" ? "https://github.com/imsuhee/TIC-TEC-TOC/blob/main/public/img/cat-icon1.png?raw=true" : value === "O" ? "https://github.com/imsuhee/TIC-TEC-TOC/blob/main/public/img/cat-icon2.png?raw=true" : null;

    // value가 null인 경우 이미지를 표시하지 않음
    return (
        <button className="square" onClick={onClick}>
            {value !== null && <img src={imageSource} alt={value} className="square-image" />}
        </button>
    )
}

export default Square;