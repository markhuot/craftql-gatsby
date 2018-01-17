import React from 'react'
import Link from 'gatsby-link'

export default class Foobar extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.pathContext.node.title}</h1>
                <p>This is an enum field {this.props.pathContext.node.socialLinks.join(', ')}</p>
            </div>
        )
    }

}