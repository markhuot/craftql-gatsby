var path = require('path')
var axios = require('axios')
var fs = require('fs')
var glob = require('glob')

exports.sourceNodes = async({ boundActionCreators }, { sourcesPath, connection }) => {
    const { createNode, createPage } = boundActionCreators

    const client = axios.create(connection)

    // ------------------------------------------------------------------

    var files = glob.sync(sourcesPath, {})

    for (var file of files) {
        var source = require(path.resolve(file))

        var results = await client.post('', {
            query: source.query,
            variables: source.variables || {}
        })
        .then(response => response.data.data)

        source.remap(results, { createNode, createPage })

    }

    // ------------------------------------------------------------------

    // var base = './sources/'
    // var files = fs.readdirSync(path.resolve(base))
    // for (var file of files) {
    //     if (file.match(/^[^_].*\.js$/)) {
    //         var source = require(path.resolve(base+file))
    //
    //         const result = await client.post('', {
    //             query: source.query,
    //             variables: {}
    //         })
    //         .then(response => response.data.data)
    //
    //         var pagesKey = objectPath.get(source, 'remap.pagesKey', 'pages')
    //         var nodesKey = objectPath.get(source, 'remap.nodesKey', 'nodes')
    //         var pathKey = objectPath.get(source, 'remap.pathKey', 'path')
    //         var component = objectPath.get(source, 'remap.component', 'src/foobar.js')
    //         var layout = objectPath.get(source, 'remap.layout', null)
    //         var idKey = objectPath.get(source, 'remap.idKey', 'id')
    //         var contentDigestCallback = objectPath.get(source, 'remap.contentDigest', (item) => item.id)
    //
    //         for (var page of objectPath.get(result, pagesKey, [])) {
    //             createPage({
    //                 path: objectPath.get(page, pathKey),
    //                 component: path.resolve(component),
    //                 layout: layout,
    //                 context: page
    //             })
    //         }
    //
    //         for (var node of objectPath.get(result, nodesKey, [])) {
    //             if (typeof(idKey) == 'function') {
    //                 id = idKey(node)
    //             }
    //             else {
    //                 id = objectPath.get(page, idKey)
    //             }
    //
    //             createNode({
    //                 id: id,
    //                 parent: null,
    //                 children: [],
    //                 internal: {
    //                     type: path.basename(file, '.js'),
    //                     mediaType: 'text/html',
    //                     content: JSON.stringify(node),
    //                     contentDigest: contentDigestCallback(node)
    //                 },
    //                 title: node.node.title,
    //                 status: node.node.status,
    //             })
    //         }
    //     }
    // }

    // ------------------------------------------------------------------

    // const result = await client.post('', {
    //     query: "{pages: entries{id,title,uri,type{name},...on Stories{socialLinks}}}",
    //     variables: {}
    // })
    // .then(response => response.data.data)
    //
    // console.log('the pages are', result)
    //
    // for (page of result.pages) {
    //     createPage({
    //         path: page.uri,
    //         component: path.resolve('src/foobar'),
    //         context: page
    //     })
    // }

    // ------------------------------------------------------------------

    // const entryTypes = await client.post('', {
    //     query: "{sections{entryTypes{graphQlTypeName,fields{name}}}}",
    //     variables: {},
    // })
    // .then(response => response.data.data.sections)
    // .then(sections => sections.map((section) => section.entryTypes))
    // .then(entryTypes => [].concat.apply([], entryTypes))

    // for (var entryType of entryTypes) {
    //
    // }

    // console.log('the entries are', entryTypes)

    // ------------------------------------------------------------------

    // const entries = await client.post('', {
    //     query: "{entries{id,title,uri,type{name,handle}}}",
    //     variables: {}
    // })
    //     .then(response => response.data.data.entries)
    //
    // for (entry of entries) {
    //     const context = {
    //         id: entry.id,
    //         title: entry.title,
    //         type: entry.type.handle,
    //         // json: entry.json,
    //     }
    //
    //     createNode({
    //         id: `craftql:${entry.id}`,
    //         children: [],
    //         parent: null,
    //         internal: {
    //             contentDigest: 'text/html',
    //             type: 'CraftQL',
    //             content: JSON.stringify(context)
    //         },
    //     })
    //
    //     createPage({
    //         path: `/${entry.uri}/`,
    //         component: path.resolve('./src/foobar.js'),
    //         context
    //     })
    // }

    return
}