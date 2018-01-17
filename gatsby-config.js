module.exports = {
    siteMetadata: {
        title: 'Gatsby Default Starter',
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-react-helmet'
        },
        {
            resolve: 'craftql',
            options: {
                sourcesPath: './sources/**/*.js',
                connection: {
                    baseURL: 'http://dev.craftql.com/api',
                    headers: {'Authorization': 'Bearer tU1OUjEjNDi0MHNXRyZ_4pYRV2DUUmUMo4pOezuhBRCQJN2pfye4QPUO4rJeTKHs'}
                }
            }
        }
    ],
}
