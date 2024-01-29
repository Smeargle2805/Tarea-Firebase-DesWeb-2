import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Edit = () => {
  const [name, setName] = useState('')
  const [plataform, setPlataform] = useState('')
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()
  const { id } = useParams()

  const update = async (e) => {
    e.preventDefault()
    const game = doc(db, "games", id)
    const data = { name: name, plataform: plataform, price: price }
    await updateDoc(game, data)
    navigate('/')
  }

  const getGameById = async (id) => {
    const game = await getDoc(doc(db, "games", id))
    if (game.exists()) {
        setName(game.data().name)
        setPlataform(game.data().plataform)
        setPrice(game.data().price)
    } else {
      console.log('El Juego no Existe')
    }
  }

  useEffect(() => {
    getGameById(id)
  }, [])

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Edit Game</h1>
                <form onSubmit={update}>

                    <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input value={name}
                                onChange={ (e) => setName(e.target.value)}
                                type='text'
                                className='form-control'></input>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Plataform</label>
                        <input value={plataform}
                                onChange={ (e) => setPlataform(e.target.value)}
                                type='text'
                                className='form-control'></input>
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Price</label>
                        <input value={price}
                                onChange={ (e) => setPrice(e.target.value)}
                                type='number'
                                className='form-control'></input>
                    </div>
                    <button type='submit' className='btn btn-primary'>Update</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit