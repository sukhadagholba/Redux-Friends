import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import '../App.css';
import {fetchingFriendsAction, addFriend, deleteFriend} from "../actions";


class App extends Component {
constructor(props){
	super(props);
	this.state= {
		name: "",
		age: "",
		email: ""
	};

}


  componentDidMount() {
    this.props.fetchingFriendsAction();
  }

changeHandler = event => {
	this.setState({[event.target.name]: event.target.value});

};

addFriendHandler = event => {
	this.props.addFriend(this.state.name, this.state.age, this.state.email);
	this.setState({name: "", age: "", email: ""});
}

deleteFriend = friendId => {
	this.props.deleteFriend(friendId);
}



  render() {
    return (
      <div className="App">
	<div>{this.props.deletingFriend ? (
                <h1>Deleting Friend ..</h1>
        ) : (null)}
           </div>


	<div>{this.props.savingFriends ? (
                <h1>Saving Friend ..</h1>
        ) : (null)}
	   </div>

	 <div>{this.props.friendsSaved ? (
                <h1>A New Friend Saved To The List..</h1>
        ) : (null)}
           </div> 


        {this.props.fetching ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : (
        <div>  <ul>
            {this.props.friends.map(friend => {
              return <div key={friend.id}><li>{friend.name}, {friend.age}, {friend.email}</li>
	      <button onClick={()=>this.deleteFriend(friend.id)}>delete</button></div>;

            })}
          </ul>

		
		<input onChange={this.changeHandler} type="text" name="name" placeholder="Name" value={this.state.name} />
		<input onChange={this.changeHandler} type="number" name="age" placeholder="Age" value={this.state.age} />		
		<input onChange={this.changeHandler} type="text" name="email" placeholder="Email" value={this.state.email} />

		<button onClick={()=> this.addFriendHandler()}>Add New Friend</button>

</div>
        )}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
          friends: state.friends,
          fetching: state.fetchingFriends,
	  savingFriends: state.savingFriends,
	  friendsSaved: state.friendsSaved,
	  deletingFriend: state.deletingFriend

  };
};


export default connect(mapStateToProps, {fetchingFriendsAction, addFriend, deleteFriend})(App);
