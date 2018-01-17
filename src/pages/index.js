import React from 'react'
import Link from 'gatsby-link'

export default class IndexPage extends React.Component {

    render() {
        console.log('the props are', this.props)

        return (
            <div>
                <h1>Hi people</h1>
                <p>Welcome to your new Gatsby site.</p>
                <p>Now go build something great.</p>

                <h2>Stories</h2>
                <ul>
                    {this.props.data.allCraftQlStories.edges.map((edge) => {
                        return (
                            <li key={edge.node.id}><Link to={edge.node.uri}>{edge.node.title}</Link></li>
                        )
                    })}
                </ul>
            </div>
        )
    }

}

export const query = graphql`
    query IndexQuery {
        allCraftQlStories(filter:{status:{eq:"live"}}) {
            edges {
                node {
                    id
                    title
                    status
                    uri
                }
            }
        }
    }
`;
