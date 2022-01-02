import React, { useEffect, useState } from "react";
import './App.css';
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";


export default () => {

  const [movieList, setMovieLIst] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  
  useEffect(()=>{
    const loadAll = async () => {
    let list = await Tmdb.getHomeList();
    setMovieLIst(list);

    let originals = list.filter(i=>i.slug=== 'original');
    let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
    let chosen = originals[0].items.results[randomChosen];
    let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo);

    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener );

    return() => {
      window.removeEventListener('scroll', scrollListener)
    }

  }, []); 

  return (
    

    <div className="page">

      <Header black={blackHeader} />
      
        {featuredData &&
        <FeaturedMovie item={featuredData} />
        }
      
      <section className="lists">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items= {item.items} />
        ))}
      </section>

      <footer>
        Projeto desenvolvido utilizando React<br/>
        Direitos de imagens para Netflix<br/>
        Dados pegos da API do site Themoviedb.org<br/>
        Feito por João Henrique Batista de Freitas
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="http://static.demilked.com/wp-content/uploads/2016/06/gif-animations-replace-loading-screen-14.gif" alt="Carregando"/>
        </div>
      }
    </div>
  )

}