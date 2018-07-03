import React from 'react'
import MasterPage from '../organisms/MasterPage'
import Header from '../organisms/Header'
import renderHTML from 'react-render-html'

export default function (props) {
  return (
    <MasterPage title={'Front page'} >
        <Header headerText='Html5BP' />
        {'<!--[if lte IE 9]>'}
        <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        {'<![endif]-->'}
        {'<!-- Add your site or application content here -->'}
        <p>Hello world! This is HTML5 Boilerplate.</p>
        <script src="/assets/js/vendor/modernizr-3.6.0.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script> {renderHTML(`window.jQuery || document.write(<script src="/assets/js/vendor/jquery-3.3.1.min.js" />)`)}</script>
        <script src="/assets/js/plugins.js"></script>
        <script src="/assets/js/main.js"></script>
    </MasterPage>
  )
}