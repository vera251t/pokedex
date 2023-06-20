import { useState } from 'react'
import './styles/Pagination.css'

const PaginationPokemon = ({ pagina, setPagina, maximo }) => {
  const [input, setInput] = useState(1)
  const nextPage = () => {
    setInput(parseInt(input) + 1)
    setPagina(parseInt(pagina) + 1)
  }
  const previousPage = () => {
    setInput(parseInt(input) - 1)
    setPagina(parseInt(pagina) - 1)
  }
  const onKeyDown = e => {
    if(e.keyCode === 13) {
      setPagina(parseInt(e.target.value))
      if(
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt(e.target.value))
      ) {
          setPagina(1)
          setInput(1)
      } else {
        setPagina(parseInt8e.target.value)
      }
    }
  }
  const onChange = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className="container__pag">
        <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>Previous</button>
        <input onChange={e => onChange(e)} onKeyDown={(e) => onKeyDown(e)} name='page' autoComplete='off' value={input}/>
        <p> de {parseInt(maximo)}</p>
        <button disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)} onClick={nextPage}>Next</button>
    </div>
  )
}

export default PaginationPokemon