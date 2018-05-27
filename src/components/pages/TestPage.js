import React from 'react'
import MasterPage from '../organisms/MasterPage'
import Header from '../organisms/Header'

const TestPage = (props) => {
  return (
    <MasterPage>
      <Header bgColor='red' />
      <main>
        <h1>Hi! My name is...</h1>
        <h2>Slam shitty</h2>
      </main>
    </MasterPage>
  )
}

export default TestPage