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
  console.log( dom.children[ 0 ])

  printByLevel(DOM)
})


const printByLevel = ( node, level=0, parent='#root') => {
  const childNodes = node.children
  const parentNode = $(parent)

  for( let node of childNodes ){
    let directory = makeDirectory( node, level, parent);
    parentNode.append(directory)
    printByLevel( node, level++, `.${node.tagName}` )
  }
}

const makeDirectory = ( node, level, parent ) => {
  let mynode = $(node)
  let file = document.createElement("ul");
  file.className+=`parent-${parent} level-${level} ${node.tagName} directory`
  file.innerHTML = node.tagName
  if( node.childNodes.length === 1 || node.tagName === 'P'){
    let li = document.createElement("li");
    li.className+=`${node.tagName} innerText file`
    li.innerHTML = mynode.text()
    file.append(li)
  }
  console.log('file:', file)
  return file
}
