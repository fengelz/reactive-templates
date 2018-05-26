import React from 'react'
import MasterPage from '../organisms/MasterPage'

function FrontPage(props) {
  return (
    <MasterPage title={'Front page'}>
      <main>
        <h1>Hi! My name is...</h1>
        <h2>Slam shotty</h2>
      </main>
    </MasterPage>
  )
}

export default FrontPage