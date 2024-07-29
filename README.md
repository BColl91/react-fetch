Tutors vers w/notes:

import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [allFilms, setAllFilms] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // the fetchData function has the async word in it which means we can wait for lines of code
  // to finish running before moving on to the next line
  const fetchData = async () => {
    // the try/catch block intercepts any error and runs the catch block if something does go wrong
    try {
      // make a fetch request to an API, the await word means we wait until it finishes getting the data
      // before moving on to the next line, we store the result in a varibale
      const response = await fetch("https://ghibliapi.vercel.app/films")

      // we use the response object from the fetch request to check if it was successful, if something
      // failed then run the catch block (if ok is false)
      if (!response.ok) {
        throw new Error("Something has gone wrong!")
      }

      // the data sent back from the response variable is in JSON format so we need to convert it from 
      // JSON into normal javaScript with the .json() method. Again using the await keyword as we don't 
      // know how long it will take
      const filmsData = await response.json()

      // we can then store the api data in the state which we use to display the data on our page
      // also reset the error message
      setAllFilms(filmsData)
      setErrorMsg("")
    } catch (error) {
      // catch an error that occurs in the try block
      // display any message from the error object to the user in here so they know something went wrong
      console.log(error.message)
      setErrorMsg(error.message)
    }

  }

  // this useEffect only runs once when the component is first rendered - avoiding an infinte loop
  useEffect(() => {
    // run the fetchData function once when the app component first loads
    fetchData()
  }, [])

  return (
    <>
      <h1>Fetch API</h1>

      {/* if there is an error message then display it here */}
      {errorMsg !== "" && (
        <p>{errorMsg}</p>
      )}

      {/* map through data from API that is stored in the state and generate a h3 tag for each */}
      {allFilms.map((film, index) => {
        return (
          <h3 key={index}>{film.title}</h3>
        )
      })}
    </>
  )
}

export default App
