import React from 'react'

function Head(props) {
  return (
    <head>
      <title>{ props.title || 'Template title'}</title>
      <meta name="description" content="" />
      <meta property="og:site_name" content="ARc" />
      <meta property="og:image" content="https://diegohaz.github.io/arc/thumbnail.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="icon.png" />
      <link rel="stylesheet" href="assets/css/styles.css" />
      { props.children }
    </head>
  )
}

export default Head

