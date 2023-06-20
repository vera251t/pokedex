import { useRef } from "react"
import { setTrainerNameG } from "../store/slices/trainerName.sclice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import './styles/Home.css'

const Home = () => {

  const trainerNameRef = useRef()

  const navigate = useNavigate()

  const disptach = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    disptach(setTrainerNameG(trainerNameRef.current.value.trim()))
    navigate('/pokedex')
  }

  return (
    <div>
      <div className="pokedex">
        <img className="pokedex__img" src="/public/pokedex-logo.png" alt="pokedex" />
        <h2 className="pokedex__title">Hi Trainer!</h2>
        <p className="pokedex__description">To start in this application please give me your trainer name</p>
        <form className="pokedex__form" onSubmit={handleSubmit}>
            <input class="pokedex__input" ref={trainerNameRef} type="text" placeholder="Enter your name" />
            <button className="pokedex__btn">Catch them all!</button>
        </form>
      </div>
        <footer className="footer__pokedex">
          <div className="footer__div1"></div>
          <div className="footer__div2"></div>
          <div className="footer__div3"></div>
        </footer>
    </div>
  )
}

export default Home