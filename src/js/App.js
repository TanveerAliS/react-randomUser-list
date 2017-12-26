import React from 'react';
import Collapsible from './Collapsible.js';
import image from '../images/expand-vertical-4.svg';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading : true,
            contanct : []
        }
    }

    componentWillMount () {
        localStorage.getItem("contacts") && this.setState({
            contancts: JSON.parse(localStorage.getItem("contacts")),
            isLoading: false
        })
    }
    componentDidMount () {

        const date = localStorage.getItem("currentDataNow");
        const contactsDate = date && new Date(parseInt(date));
        const now = new Date();

        const dateAge = Math.round((now - contactsDate) / (1000 * 60));
        const tooOld = dateAge >= 15;
        if (tooOld){
            this.fetchData();
        } else {
            console.log(`getting data from localstorage which is ${dateAge} min older`);
        }
    }

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem("contacts", JSON.stringify(nextState.contancts));
        localStorage.setItem("currentDataNow", Date.now());
    }

    fetchData (){

        this.setState({
            contancts: [],
            isLoading: true
        })
        fetch(`https://randomuser.me/api/?gender=female&results=50`)
        .then (response => response.json())
        .then ( responseJson => responseJson.results.map(user => ({
            name: user.name.first + user.name.last,
            image: user.picture.thumbnail,
            userName: user.login.username,
            location: user.location.city,
            phone: user.phone,
            dob: user.dob,
            cell: user.cell,
            email: user.email
        })))
        .then ( contancts => this.setState({
            contancts,
            isLoading: false
        }))
        .catch( error => console.log("Oops !!! No data"))
    }

    render() {
        const {isLoading, contancts} = this.state;
        return (
            <div>
                <header>
                    <img src={image} />
                    <h1>Collapsible Content</h1>
                </header>
                <div className="content">
                    <div className="panel-group">
                        <ul id="user-list">
                            { !isLoading && contancts.length > 0 ? contancts.map(contanct => {
                                return <li><Collapsible key={contanct.name} title={contanct.name} image={contanct.image} email={contanct.email} location={contanct.location}>
                                        <div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias quisquam, natus nulla blanditiis rerum neque ad dolores, aut aperiam ut. Quam harum perferendis quibusdam eaque est. Provident, consequuntur beatae eveniet!</p>
                                            <span className="fa fa-birthday-cake">{contanct.dob}</span>
                                            <span className="fa fa-phone">{contanct.cell}</span>
                                            <span className="fa fa-mobile">{contanct.phone}</span>
                                        </div>
                                        </Collapsible>
                                    </li>
                            }) : null }
                        </ul>
                    </div>
                    <div className={`${isLoading ? 'is-loader' : ''}`}></div>
                </div>
            </div>
        );
    }
}

export default App;
