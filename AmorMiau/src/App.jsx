import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function NavButton({ children, href }){
  return(
    <a href={href} className='nav-button'>
      {children}
    </a>
  )
}

function NavBar(){
  return(
    <header>
      <h1>AmorMiau</h1>
      <div className='navbar-options'>
        <NavButton href="#">Adoção</NavButton>
        <NavButton href="#">Eventos</NavButton>
        <NavButton href="#">Doações</NavButton>
        <NavButton href="#">PetSitters</NavButton>
        <NavButton href="#">Sobre Nós</NavButton>
      </div>
    </header>
  )
}

function TituloDescricao({ titulo, descricao }){
  return(
    <div className='titulo-descricao'>
      <h2>{titulo}</h2>
      <p>{descricao}</p>
    </div>
  )
}

function Content(){
  return(
    <section className='content'>
      <TituloDescricao 
        titulo="Adoção" 
        descricao="Encontre seu novo parceiro de quatro patas." 
      />
    </section>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <NavBar/>
      <Content/>
    </main>
  )
}

export default App