import { useEffect, useRef, useState } from "react"
import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux"
import PokeContainer from "../components/Pokedex/PokeContainer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import './styles/Pokedex.css'


const Pokedex = () => {

  const [ selectValue, setSelectValue ] = useState('all-pokemons')

  const trainerName = useSelector(states => states.trainerName)

  let url = 'https://pokeapi.co/api/v2/pokemon?limit=900&offset=0'
  const [ pokemons, getAllPokemons, hasError, setPokemons ] = useFetch(url)
  const urlTypes = 'https://pokeapi.co/api/v2/type'
  const [ types, getAllTypes ] = useFetch(urlTypes)

  useEffect(() => {
    if(selectValue === 'all-pokemons') {
      getAllPokemons()
    } else {
      axios.get(selectValue)
        .then(res => {
          const data = {
            results: res.data.pokemon.map(pokeInfo => pokeInfo.pokemon) 
          }
          setPokemons(data)
        })
        .catch(err => console.log(err))
    }
  }, [selectValue])

  useEffect(() => {
    getAllTypes()
  }, [])

  const searchPokemon = useRef()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const inputValue = searchPokemon.current.value.trim().toLowerCase()
    navigate(`/pokedex/${inputValue}`)
  }

  const handleChangeType = (e) => {
    setSelectValue(e.target.value)
  }

  return (
    <>
      <header className="pokedex__section">
        <img className="pokedex__logo" src="./pokedex-logo.png" alt="pokedex-logo" />
        <div className="pokedex__div1"></div>
        <div className="pokedex__div2"></div>
        <div className="pokedex__div3"></div>
      </header>
        <p className="pokedex__p"><span className="pokedex__span">Welcome {trainerName},</span> you can find your favorite pokemon</p>
      <div>
        <section className="pokedex__flex">
          <form onSubmit={handleSubmit}>
            <input className="pokedex__in" ref={searchPokemon} type="text" placeholder="Search your pokemon" />
            <button className="pokedex__bu">Search</button>
          </form>
          <select className="pokedx__select" onChange={handleChangeType}>
            <option value='all-pokemons'>All pokemons</option>
            {
              types?.results.map(typeInfo => (
                <option key={typeInfo.url} value={typeInfo.url}>{typeInfo.name}</option>
              ))
            }
          </select>
          <PokeContainer pokemons={pokemons?.results}/>
        </section>
      </div>
    </>
  )
}

export default Pokedex