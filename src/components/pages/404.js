import React from 'react'
import MasterPage from '../organisms/MasterPage'
import Header from '../organisms/Header'

function FrontPage(props) {
  return (
    <MasterPage title={'Page Not Found'} className='404'>
      <Header headerText='Html5BP' />
      <main>
        <h1>Page Not Found</h1>
        <p>Sorry, but the page you were trying to view does not exist.</p>
      </main>
    </MasterPage>
  )
}

export default FrontPage