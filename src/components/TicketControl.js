import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import Documenting from './Documenting';
import Pair from './Pair';
import DebugLesson from './DebugLesson';

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      debugVisibleOnPage: false, 
      count: 0,
      ticketList: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    
    if (this.state.count < 3) {
      this.setState(prevState => ({
        count: prevState.count + 1 


      }));
    } else {
      this.setState(prevState => ({
        debugVisibleOnPage: !prevState.debugVisibleOnPage
      }));
    }
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newTicketList = this.state.ticketList.concat(newTicket);
    this.setState({ticketList: newTicketList, formVisibleOnPage: false });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;
    if (this.state.count === 0) {    
      currentlyVisibleState = <DebugLesson /> 
      buttonText = "Yes";  
    } else if (this.state.count === 1) {
      currentlyVisibleState = <Pair/>
      buttonText = "Yes 2";
    } else if (this.state.count === 2) {
      currentlyVisibleState = <Documenting/>
      buttonText = "Yes 3";
    } else if (this.state.debugVisibleOnPage) { 
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />  
      buttonText = "return to ticket form";  
    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.ticketList} />  
      buttonText = "Add Ticket"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState} 
        <button onClick = {this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }
}

export default TicketControl;


// render(){
//   let currentlyVisibleState = null;
//   let buttonText = null;
//   if (this.state.formVisibleOnPage) {    /// if the current visible state is that the form is visible 
//     currentlyVisibleState = <NewTicketForm /> // new ticket form is our current visible state
//     buttonText = "Return to Ticket List";  // and the button is this
//   } else if( this.state.formVisibleOnPage === false) {
//     currentlyVisibleState = <TicketList />  /// otherwise it should be ticketlist
//     buttonText = "Add Ticket";  // and this is our button
//   } else if(this.state.debugVisibleOnPage) {
//     currentlyVisibleState = <DebugLesson />
//     buttonText = "yes"
//   }
//   return (
//     <React.Fragment>
//       {currentlyVisibleState} {/*this pulls our current visible state*/}
//       <button onClick = {this.handleClick}>{buttonText}</button>  {/*handle click and whatever relevant buttontext*/}
//     </React.Fragment>
//   );
// }
