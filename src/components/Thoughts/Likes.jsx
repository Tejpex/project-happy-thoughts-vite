import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import HeartRed from "../../assets/heart-red.png"

export const Likes = ({ id, likes }) => {
  const [newLike, setNewLike] = useState(false)
  const [likesToShow, setLikesToShow] = useState(likes)
  
  useEffect(() => {
    fetch(`https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${id}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLikesToShow(likesToShow+1)
      });
  }, [newLike])

  return (
    <div className="like-box">
      <button onClick={() => setNewLike(!newLike)}>
        <img src={HeartRed} alt="Icon of a heart" className="heart"/>
      </button>
      <p>{likesToShow}</p>
    </div>
  )
}

Likes.propTypes = {
  id: PropTypes.string,
  likes: PropTypes.number,
}