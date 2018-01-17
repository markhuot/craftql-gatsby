import React from 'react'
import Link from 'gatsby-link'

export default class Foobar extends React.Component {

    render() {
        console.log('the props are', this.props)

        return (
            <div>
                <h1>({this.props.pathContext.id}) the title is: {this.props.pathContext.title}</h1>
                <p>{this.props.pathContext.socialLinks.join(', ')}</p>
            </div>
        )
    }

}