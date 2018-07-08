import React from 'react'

function Head(props) {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{ props.title || 'Template title'}</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="manifest" href="site.webmanifest" />
      <link rel="apple-touch-icon" href="icon.png" />
      {'<!-- inject:css --><!-- endinject -->'}
      { props.children }
    </head>
  )
}

export default Head

