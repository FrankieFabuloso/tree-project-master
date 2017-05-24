const htmlSource = `
  <!doctype html>
  <html lang="en" />
  <head>
    <meta charset="utf-8" />
    <title>DOM Tree as a File System</title>
  </head>
  <body>
    <h1>An Example Site</h1>
    <h3>To Demonstrate what some nested nodes might look like</h3>
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
    <p>
      Some Text
      <!-- A Comment -->
      More Text
    </p>
  </body>
</html>`

const dom = ( new DOMParser() ).parseFromString( htmlSource, 'text/html' )

$( document ).ready( () => {
  const DOM = dom.children[ 0 ]
  printByLevel(DOM)

  $( document ).on( 'click', '.toggle-button', event => {
    let imgURL = event.target.attributes.src.value
    const list = $(event.target).siblings()[1]
    toggleHidden( list.children )

    if( imgURL === './images/icon-close.png' ) {
      imgURL = './images/icon-open.png'
    } else {
      imgURL = './images/icon-close.png'
    }
     event.target.setAttribute( 'src', imgURL )
  })
})

const printByLevel = ( node ) => {
  const children = node.children
  for( let node of children ){
    addTreeNode( node )
    printByLevel( node )
  }
}

const addTreeNode = ( node ) => {
  const parentTag = node.parentNode.tagName
  const parentNode = parentTag === 'HTML'? $('#root') : $( `.${parentTag}`)
  const childNodes = node.childNodes
  let imgFileNode
  const imgToggleNode = createDomNode( 'img',{
    'src': './images/icon-close.png',
    'class': 'toggle-button open'
  } )
  const divFileNode = createDomNode( 'div', {'class': 'file-node-container' } )
  console.log('node.tagName:', node.tagName)
  if ( node.tagName === 'HEAD' ){
    imgFileNode = createDomNode( 'img',{'src': './images/icon-folder-private.png'} )
  } else {
    imgFileNode = createDomNode( 'img',{'src': './images/icon-folder-public.png'} )
  }
  const newNode = createDomNode( 'ul', {'class': node.tagName} )

  newNode.text( node.tagName )

  childNodes.forEach( node => {
    if( node.nodeType === 3 ) {
      if( node.wholeText.trim() !== '' ) {
        const divTextNode = createDomNode( 'div', {'class': 'text-node-container'} )
        const textNode = createDomNode( 'li', {'class': 'file-node'} )
        const imgtextNode = createDomNode( 'img', {'src': './images/icon-file.png'})

        textNode.text( node.wholeText.trim() )
        divTextNode.append( imgtextNode )
        divTextNode.append( textNode )
        newNode.append( divTextNode )
      }
    }
  })
  divFileNode.append( imgToggleNode )
  divFileNode.append( imgFileNode )
  divFileNode.append( newNode )
  parentNode.append( divFileNode )

}

const toggleHidden = DOMNodes => {
  for( let i=0; i < DOMNodes.length; i++ ) {
    if( $( DOMNodes[i] ).hasClass('hidden')  ) {
      $( DOMNodes[i] ).removeClass( 'hidden' )
    } else {
      $( DOMNodes[i] ).addClass( 'hidden' )
    }
  }
}

const createDomNode = ( tag, attributes ) => {
  return $( `<${tag}>`, attributes)
}
