import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
    const [ name, setName ] = useState ( '' )
    const [ plataform, setPlataform]  = useState ( '' )
    const [ price, setPrice ] = useState (0)
    const navigate = useNavigate()

    const gameCollection = collection(db, "games")

    const store = async (e) => {
        e.preventDefault()
        await addDoc( gameCollection, {name: name, plataform: plataform, price: price})
        navigate('/')
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Add Game</h1>
                <form onSubmit={store}>

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
                    <button type='submit' className='btn btn-primary'>Store</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Create