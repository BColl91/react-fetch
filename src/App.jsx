import './App.css'
import { useState, useEffect } from 'react'

const App = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://ghibliapi.vercel.app/films")

      console.log(response)
      if(!response.ok) {
        throw new Error("What did you do")
      }

      const filmsData = await response.json()
      setAllFilms(filmsData)
      setErrorMsg("")
    } catch (error) {
      console.log(error.message)
      setErrorMsg(error.message)
    }

  }
  useEffect(() =>{
    fetchData()
  }, [])

  return (
    <>
      <h1>Fetch API</h1>

      {errorMsg !== "" && (
        <p>{errorMsg}</p>
      )}

      {allFilms.map((film, index) =>{

return (
  <h3 key ={index}>{film.original_title}</h3>
)
      })}
    </>
  )
}

export default App
