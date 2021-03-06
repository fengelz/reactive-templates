import React from 'react'
import MasterPage from '../organisms/MasterPage'
import Header from '../organisms/Header'

export default function (props) {
  return (
    <MasterPage title={'Front page'} >
        <Header headerText='Html5BP' />
        <main>
          {'<!--[if lte IE 9]>'}
          <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
          {'<![endif]-->'}
          {'<!-- Add your site or application content here -->'}
          <p>Hello world! This is HTML5 Boilerplate.</p>
        </main>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        {'<!-- inject:js --><!-- endinject -->'}
    </MasterPage>
  )
}