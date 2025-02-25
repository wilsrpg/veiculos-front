import React, { useEffect } from 'react'

export default function PaginaNaoEncontrada() {
  useEffect(()=>{
    document.title = 'Página não encontrada';
  }, [])

  return (
    <div className='conteudo'>
      <h2>Página não encontrada</h2>
    </div>
  )
}