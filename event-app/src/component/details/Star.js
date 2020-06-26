import React,{useState} from 'react'
import { FaStar } from "react-icons/fa"
import "./star.css"
const Star=(props)=> {
    const [rating,setRating]=useState(null)
    return (
        <div >
            {[ ...Array(5)].map((star,i)=>{
                const ratingValue= i + 1;
        return ( <label> 
            <input type="radio" name="rating" value={ratingValue} onClick={()=>{setRating(ratingValue) && props.handlenote()}}></input>
            <FaStar className="star" color={ratingValue <= rating ? "#ffc107" : "#b2b2b4"} size={40}/>

            </label>    )  
            })}
           
        </div>
    )
}

export default Star
