import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter} from "reactstrap";
import axios from "axios";

const data = [];
class App extends React.Component {
  state = {
    token: '6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a',
    data: data,
    personas:[],
    persons: [],
    showModalUpdate: false,
    showModalCreate: false,
    form: {
      id: "",
      name: "",
      email: "",
      gender: "",
      status: "",
    },
  };

  showModalCreate = () => {
    this.setState({ showModalCreate: true });
  };

  closeModalCreate = () => {
    this.setState({ showModalCreate: false });
  };

  showModalUpdate = (user) => {
    this.setState({
      form: user,
      showModalUpdate: true,
    });
  };

  closeModalUpdate = () => {
    this.setState({ showModalUpdate: false });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  readUsers = async () => {
    let url = `https://gorest.co.in/public/v1/users`;
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      },
      method: 'GET'
    };
    var data;
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(json => {data = json; this.state.personas = data.data; this.setState( data.data );})
    .catch(error => {console.log('readUsers error: ' + error.message);});
    return data;
  }

  insertUser = async (persona) => {
    const user = {
      name: persona.name, 
      gender: persona.gender, 
      email: persona.email, 
      status: persona.status
    }
    let url = `https://gorest.co.in/public/v1/users/`;
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      },
      body: JSON.stringify({ name: persona.name, gender: persona.gender, email: persona.email, status: persona.status }),
      method: 'POST'
    };
    var data;
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(json => {data = json;})
    .catch(error => {console.log('insertUser error: ' + error.message);});

    console.log('result');
    console.log(data);
    this.closeModalCreate();
    return data;
  }

  updateUser = async (persona) => {
    const user = {
      name: persona.name, 
      gender: persona.gender, 
      email: persona.email, 
      status: persona.status
    }
    let url = `https://gorest.co.in/public/v1/users/`;
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      },
      body: JSON.stringify({ name: persona.name, gender: persona.gender, email: persona.email, status: persona.status }),
      method: 'PATCH'
    };
    var data;
    console.log('Url: ' + url + persona.id);
    console.log('requestOptions:');
    console.log(JSON.stringify(requestOptions));
    console.log('Other things');
    console.log(JSON.stringify({ name: persona.name, gender: persona.gender, email: persona.email, status: persona.status }));

    fetch(url + persona.id, requestOptions)
    .then(response => response.json())
    .then(json => {data = json;})
    .catch(error => {console.log('updateUser error: ' + error.message);});
    console.log(data);

    this.closeModalUpdate();

    return data;
  }

  deleteUser = async (persona) => {
    let url = `https://gorest.co.in/public/v1/users/`;
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      },
      method: 'DELETE'
    };
    var data;
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + persona.id);
    if (opcion === true) {
      fetch(url + persona.id, requestOptions)
      .then(response => response.json())
      .then(json => {data = json;})
      .catch(error => {console.log('delete: error: ' + error.message);});
    }
    return data;
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="primary" onClick={()=>this.readUsers()}>Read Users</Button>
          <Button color="success" onClick={()=>this.showModalCreate()}>Create User</Button>    
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>EMail</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.personas.map((persona) => (
                <tr key={persona.id}>
                  <td>{persona.id}</td>
                  <td>{persona.name}</td>
                  <td>{persona.email}</td>
                  <td>{persona.gender}</td>
                  <td>{persona.status}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.showModalUpdate(persona)}
                    >
                      Edit
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.deleteUser(persona)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        
        <Modal isOpen={this.state.showModalCreate}>
          <ModalHeader>
           <div><h3>Insert User</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                Name: 
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                EMail: 
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Gender: 
              </label>
              <input
                className="form-control"
                name="gender"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Status: 
              </label>
              <input
                className="form-control"
                name="status"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertUser(this.state.form)}
            >
              Insert
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.showModalUpdate}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Name: 
              </label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
            </FormGroup>
            <FormGroup>
              <label>
                EMail: 
              </label>
              <input
                className="form-control"
                readOnly
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.email}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Gender: 
              </label>
              <input
                className="form-control"
                name="gender"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.gender}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Status: 
              </label>
              <input
                className="form-control"
                name="status"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.status}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.updateUser(this.state.form)}
            >
              Save
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

      </>
    );
  }
}
export default App;