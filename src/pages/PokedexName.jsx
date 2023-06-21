import { useParams } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import { useEffect } from "react"
import './styles/PokedexName.css'

const PokedexName = () => {

    const { name } = useParams()

    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const [ pokemon, getPokemonByName, hasError ] = useFetch(url)

    useEffect(() => {
        getPokemonByName()
    }, [name])

  return (
    <article>
        <header className="pokedex__section">
            <img className="pokedex__logo" src="./pokedex-logo.png" alt="pokedex-logo" />
            <div className="pokedex__div1"></div>
            <div className="pokedex__div2"></div>
            <div className="pokedex__div3"></div>
        </header>
        {
            hasError
                ? <h1 className="pokedex__err">The pokemon <span>{name}</span> doesn't exist 😭</h1>
                : (
                    <>
                        <div className="poke__div"></div>
                        <div className="poke__article">
                            <header className={`poke__header bg-${pokemon?.types[0].type.name}`}>
                                <img className="poke__img" src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
                            </header>
                            <section className="poke__body">
                                <h3 className={`poke__number ${pokemon?.types[0].type.name}`}>#{pokemon?.order}</h3>
                                <h2 className={`poke__name ${pokemon?.types[0].type.name}`}>{pokemon?.name}</h2>
                                <ul className="poke__info">
                                    <li className="poke__info-item">
                                        <span>Weight</span><span className="poke__t">{pokemon?.weight}</span>
                                    </li>
                                    <li className="poke__info-item">
                                        <span>Height </span><span className="poke__t">{pokemon?.height}</span>
                                    </li>
                                </ul>
                            </section>
                            <section className="poke__type">
                                <ul>
                                    <h3>Type</h3>
                                    {
                                        pokemon?.types.map(typeInfo => (
                                            <li className={`poke__type-a bg-${typeInfo.type.name}`} key={typeInfo.type.url}>{typeInfo.type.name}</li>
                                        ))
                                    }
                                </ul>
                                <ul>
                                    <h3>Abilities</h3>
                                    {
                                        pokemon?.abilities.map(a => (
                                            <li className="poke__type-abi" key={a.ability.url}>{a.ability.name}</li>
                                        ))
                                    }
                                </ul>
                            </section>
                            <section>
                                <h3 className="poke__name-stats">Stats</h3>
                                <ul>
                                    {
                                        pokemon?.stats.map(statInfo => (
                                            <li className="poke__container-stats" key={statInfo.stat.url}>
                                                <span className="poke__container-name">{statInfo.stat.name}:</span>
                                                <span>{statInfo.base_stat} / 150</span>
                                                <div className="poke__barra">
                                                    <div className="poke__progreso" style={{ width: `calc(${statInfo.base_stat} / 150 * 100%)` }}></div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </section>
                        </div>
                        <footer className="poke__footer">
                            <h3 className="poke__movement-titile">Movements</h3>
                            <ul className="poke__movement">
                                {
                                    pokemon?.moves.map(movePokemon => (
                                        <li className="poke__movement-item" key={movePokemon.move.url}>
                                            {movePokemon.move.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </footer>
                    </>
                )
        }
    </article>
  )
}

export default PokedexName