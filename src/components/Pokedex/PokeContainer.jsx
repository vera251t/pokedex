import { useState } from "react";
import PokeCard from "./PokeCard";
import'./styles/PokeContainer.css'
import PaginationPokemon from "./PaginationPokemon";

const PokeContainer = ({ pokemons }) => {
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(12)
  const maximo = pokemons?.length / porPagina
  return (
    <div className="pokecard__map">
      {
        pokemons?.slice(
          (pagina - 1) * porPagina,
          (pagina - 1) * porPagina + porPagina
        ).map(pokemon => (
          <PokeCard
            key={pokemon.url}
            url={pokemon.url}
          />
        ))
      }
    <PaginationPokemon
      pagina={pagina}
      setPagina={setPagina}
      maximo={maximo}
    />
    </div>
  )
}

export default PokeContainer