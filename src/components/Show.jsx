import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { collection, getDoc, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from "../firebaseConfig/firebase"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

const Show = () => {

  const [game, setGames] = useState([])

  const gameCollection = collection(db, "games")

  const getGames = async () => {
    const data = await getDocs(gameCollection)
    setGames(
      data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
    )
    console.log(game)
  }

  const deleteGame = async (id) => {
    const gameDoc = doc(db, "games", id)
    await deleteDoc(gameDoc)
    getGames()
  }

  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Desea eliminar el juego?",
      text: "No se podran revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteGame(id)
        Swal.fire({
          title: "Eliminado!",
          text: "El juego ha sido eliminado",
          icon: "success"
        });
      }
    });
  }

  useEffect(() => {
    getGames()
  }, [])

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
          </div>
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Plataform</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {game.map( (game) =>(
                <tr key={game.id}>
                  <td>{game.name}</td>
                  <td>{game.plataform}</td>
                  <td>{game.price}</td>
                  <td>
                    <Link to={`/edit/${game.id}`} className="btn btn-light"><i className="fa-solid fa-pen-to-square"></i></Link>
                    <button onClick={() => {confirmDelete(game.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default Show