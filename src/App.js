import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";


export default () => {

  const [movieList, setMovieLIst] = useState([]);

  
  useEffect(()=>{
    const loadAll = async () => {
    let list = await Tmdb.getHomeList();
    setMovieLIst(list);
    }

    loadAll();
  }, []);

  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items= {item.items} />
        ))}
      </section>
    </div>
  )

}