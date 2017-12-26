import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Collapsible extends Component {
    constructor(props){
        super(props);
        this.state = {
            isExpanded : false
        };
    }

    handleClick(e) {
        e.preventDefault();
        console.log("this.refs.", this.refs.panelBody.clientHeight);
        this.setState({
            isExpanded : !this.state.isExpanded,
            height : this.refs.panelBody.clientHeight
        });
        
        if (!$(this).hasClass("active")) {
            $("#user-list li").removeClass("active");
            $(this).toggleClass("active");
        } else {
            $(this).removeClass("active");
        }
    }

    render () {
        const { title, image, location, email, children } = this.props;
        const { isExpanded, height } = this.state;
        const currentHight = isExpanded ? height : 0 ;
        return (
            <div className={`panel ${isExpanded ? 'is-expanded' : ''}`} onClick={(e)=>this.handleClick(e)}>
                <div className="panel-heading">
                    <img src={image} />
                    <div>
                        <span className="name fa fa-user">{title}</span>
                        <span className="fa fa-envelope">{email}</span>
                        <span className="fa fa-map-marker loc">{location}</span>
                    </div>
                </div>
                <div className="panel-collapse" style={{height: currentHight+'px'}}>
                    <div ref="panelBody" className="panel-body">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

}

Collapsible.protoTypes = {
    title : PropTypes.string
}

export default Collapsible;