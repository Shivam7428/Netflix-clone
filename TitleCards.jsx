import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data'
import { Link } from 'react-router-dom'



const TitleCards = ({ title, category }) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDAwMTQyOTcxNTk3ZTQ5NzNhYjczYTc0M2U1N2Y4NiIsIm5iZiI6MTc4NjY5MzQ2MC45OTEwMDAyLCJzdWIiOiI2YTdlYzc1NDNlZjk1NTgxNDUzZGE3MjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.p6pbaPM9rK5U_bE05WHZnxkB2rbrljuauiObuxiV5EU'
  }
};



  const handlewheel = (event)=>{
    event.preventDefault();
    if(cardsRef.current){
      cardsRef.current.scrollLeft += event.deltaY;
    }
  }

  useEffect(()=>{


   fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
   .then(res => res.json())
   .then(res => setApiData(res.results))
   .catch(err => console.error(err));

    const current = cardsRef.current
    if(current){
      current.addEventListener('wheel', handlewheel)
      return () => current.removeEventListener('wheel', handlewheel)
    }
    return
  }, [])

  return (
    <div className='Title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="cards-list" ref={cardsRef}>
        {apiData.map((cards, index)=>{
          return <Link to={`/player/${cards.id}`} className='cards' key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+cards.backdrop_path} alt='' />
              <p>{cards.original_title}</p>
            </Link>
          
        })}
      </div>
    </div>
  )
}

export default TitleCards

