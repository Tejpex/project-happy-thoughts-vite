import { useState } from "react"
import PropTypes from "prop-types"

import HeartRed from "../../assets/heart-red.png"
import HeartOutline from "../../assets/heart-outline.png"

export const Likes = ({ id, likes, fetchThoughts }) => {
  const [thoughtLiked, setThoughtLiked] = useState(false)
  const [likesToShow, setLikesToShow] = useState(likes)
  
  const postLike = () => {
    if (thoughtLiked === false) {
      setThoughtLiked(!thoughtLiked)
      fetch(
        `https://tejpex-happy-thoughts-api.onrender.com/thoughts/${id}/like`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then(() => {
          setLikesToShow(likesToShow + 1);
          fetchThoughts();
        })
        .catch((error) => {
          console.log("error:", error);
        });
    } else {
      setThoughtLiked(!thoughtLiked)
      fetch(
        `https://tejpex-happy-thoughts-api.onrender.com/thoughts/${id}/dislike`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then(() => {
          setLikesToShow(likesToShow - 1)
          fetchThoughts()
        })
        .catch((error) => {
          console.log("error:", error)
        })
    }
  }

  return (
    <div className="like-box">
      <button 
        className={thoughtLiked ? "like-button pink" : "like-button grey"} 
        onClick={postLike}
      >
        <img src={thoughtLiked ? HeartRed : HeartOutline} alt="Icon of a heart" className="heart"/>
      </button>
      <p className="like-text">x {likesToShow}</p>
    </div>
  )
}

Likes.propTypes = {
  id: PropTypes.string,
  likes: PropTypes.number,
  fetchThoughts: PropTypes.func,
}