import React from 'react'
import MasterPage from '../organisms/MasterPage'
import Header from '../organisms/Header'

function FrontPage(props) {
  return (
    <MasterPage title={'Front page'}>
      <Header title='My Header title' />
      <main>
        <h1>Hi! My name is...</h1>
        <h2>Slam shotty !!</h2>
      </main>
    </MasterPage>
  )
}

export default FrontPage