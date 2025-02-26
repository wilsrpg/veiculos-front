import React, { useEffect } from 'react'

export default function PaginaNaoEncontrada() {
  useEffect(()=>{
    document.title = 'Página não encontrada - Veículos';
  }, [])

  return (
    <div className='centralizado'>
      <h2>Página não encontrada</h2>
    </div>
  )
}