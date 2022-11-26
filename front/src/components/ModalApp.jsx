import React from "react";
import "../resources/css/modalApp.css"
import "../resources/css/publication.css"
import UpdatePublication from "./UpdatePublication";
export default class ModalApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      show: false,
      id: this.props.id,
      title : this.props.title,
      body : this.props.body
    }
    
  }


  showModal = () => {
    this.setState({ show: true });
  }

  hideModal = () => {
    this.setState({ show: false });
  }

  render() {
    return (
      <main>
        <Modal show={this.state.show} handleClose={this.hideModal} >
          <UpdatePublication id={this.state.id} title={this.state.title} body={this.state.body}/>
        </Modal>
        <button className="publicationButton button" type='button' onClick={this.showModal}>Editar</button>
      </main>
    )
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        <div className="divCerrarModal">
          <button onClick={handleClose}>X</button>
        </div>
        {children}
      </section>
    </div>
  );
};


  // const container = document.createElement('div');
  // document.body.appendChild(container);
  // ReactDOM.render(<App />, container);
  // https://www.digitalocean.com/community/tutorials/react-modal-component