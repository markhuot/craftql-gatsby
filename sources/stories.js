var path = require('path')

module.exports.query = `{
    entriesConnection{
        edges{
            node{
                id
                title
                uri
                dateUpdated@date(as:"r")
                status
                type{
                    name
                }
                ...on Stories{
                    socialLinks
                }
            }
        }
    }
}`

module.exports.remap = (result, { createNode, createPage }) => result.entriesConnection.edges.map((entry) => {
    let node = JSON.parse(JSON.stringify(entry.node))

    node.id = 'craftql' + entry.node.id
    node.parent = null
    node.children = []
    node.internal = {}
    node.internal.contentDigest = JSON.stringify(entry.node)
    node.internal.type = 'CraftQL' + node.type.name
    createNode(node)

    let page = JSON.parse(JSON.stringify(entry.node))
    page.id = 'craftql' + entry.node.id
    page.path = entry.node.uri
    page.component = path.resolve('./src/foobar.js')
    page.context = entry.node
    createPage(page)
})
