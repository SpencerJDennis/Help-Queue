import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import Documenting from './Documenting';
import Pair from './Pair';
import DebugLesson from './DebugLesson';
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm"

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      debugVisibleOnPage: false, 
      count: 0,
      ticketList: [],
      selectedTicket: null,
      editing: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    
    }  else if (this.state.count < 3) {
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

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.ticketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleDeletingTicket = (id) => {
    const newTicketList = this.state.ticketList.filter(ticket => ticket.id !== id);
    this.setState({
      ticketList: newTicketList,
      selectedTicket: null
    });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedTicketList = this.state.ticketList.filter(ticket => ticket.id !== this.state.selectedTicket.id).concat(ticketToEdit);
    this.setState({
      ticketList: editedTicketList,
      editing: false,
      selectedTicket: null
    });
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";

    }  else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";

    } else if (this.state.count === 0) {    
      currentlyVisibleState = <DebugLesson /> 
      buttonText = "Yes";

    } else if (this.state.count === 1) {
      currentlyVisibleState = <Pair/>
      buttonText = "Yes 2";

    } else if (this.state.count === 2) {
      currentlyVisibleState = <Documenting/>
      buttonText = "Yes 3";

    } else if (this.state.debugVisibleOnPage) { 
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />;  
      buttonText = "return to ticket form";

    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.ticketList} onTicketSelection={this.handleChangingSelectedTicket} />;  
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