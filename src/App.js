import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,} from "reactstrap";
import axios from "axios";

const data = [];
class App extends React.Component {
  state = {
    data: data,
    personas:[],
    persons: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      name: "",
      email: "",
      gender: "",
      status: "",
    },
  };

  peticionGet() {
    axios.get(`https://gorest.co.in/public/v1/users/1831`)
      .then(Response => {
        const personas = Response.data;
        this.setState({ personas });
      })
  }

  peticionPost() {
    console.log('Here we go!!!');
    axios.get(`https://gorest.co.in/public/v1/users`)
      .then(Response => {
        const personas = Response.data;
        this.setState({ personas });
        console.log('Created!!!');
      })
  }

  mostrarModalActualizar = (personas) => {
    this.setState({
      form: personas,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    console.log('Closing...');
    this.setState({ modalInsertar: false });
  };

  editar = (personas) => {
    // var contador = 0;
    // var arreglo = this.state.data;
    // arreglo.map((registro) => {
    //   if (personas.id === registro.id) {
    //     arreglo[contador].name = personas.name;
    //     arreglo[contador].email = personas.email;
    //     arreglo[contador].gender = personas.gender;
    //   }
    //   contador++;
    // });

    console.log('Updating... ' + personas.id);

    const config = {
      headers: { Authorization: `Bearer 6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a` }
    };

    // let newPerson = {name: this.state.name, email: this.state.email, gender: this.state.gender, status: this.state.status};
    let newPerson = {name: 'Name Updated', email: 'newmail@nothing.com', gender: 'male', status: 'active'};

    axios.put(`https://gorest.co.in/public/v1/users/` + personas.id, newPerson, config);

    console.log('Updated.');
    this.setState({ modalActualizar: false });
  };

  eliminar = (personas) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+personas.id);
    if (opcion === true) {

      const config = {
        headers: { Authorization: `Bearer 6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a` }
      };
      
      // const bodyParameters = {
      //   key: "value"
      // };
      
      // let config = {
      //   headers: {
      //     'Authorization': 'Bearer ' + '6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a'
      //   }
      // }

      return axios.delete(`https://gorest.co.in/public/v1/users/` + personas.id, config);

      // var contador = 0;
      // var arreglo = this.state.data;
      // arreglo.map((registro) => {
      //   if (personas.id === registro.id) {
      //     arreglo.splice(contador, 1);
      //   }
      //   contador++;
      // });
      // this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    // var valorNuevo= {...this.state.form};
    // valorNuevo.id=this.state.data.length+1;
    // var lista= this.state.data;
    // lista.push(valorNuevo);
    // this.setState({ modalInsertar: false, data: lista });

    console.log('Here we go.');

    const config = {
      headers: { Authorization: `Bearer 6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a` }
    };

    // let newPerson = {name: this.state.name, email: this.state.email, gender: this.state.gender, status: this.state.status};
    let newPerson = {name: 'New Name', email: 'newmail@nothing.com', gender: 'male', status: 'active'};

    this.setState({ modalInsertar: false });

    return axios.post(`https://gorest.co.in/public/v1/users`, newPerson, config);

    // axios.get(`https://gorest.co.in/public/v1/users`)
    //   .then(res => {
    //     const personas = res.data.data;
    //     this.setState({ personas });
    //   })
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  getAll = async () => {
    let url = `https://gorest.co.in/public/v1/users`;
    let userToken = '6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a';
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      },
      method: 'GET'
    };
    var data;
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(json => {data = json; this.state.personas = data.data; this.setState( data.data );})
    .catch(error => {console.log('getAll: error: ' + error.message);});
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
    let userToken = '6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a';
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      },
      body: JSON.stringify({ name: persona.name, gender: persona.gender, email: persona.email, status: persona.status }),
      method: 'PATCH'
    };
    var data;
    console.log('Url: ' + url + persona.id);
    console.log(JSON.stringify(requestOptions));
    console.log(JSON.stringify({ name: persona.name, gender: persona.gender, email: persona.email, status: persona.status }));

    fetch(url + persona.id, requestOptions)
    .then(response => response.json())
    .then(json => {data = json;})
    .catch(error => {console.log('updateUser error: ' + error.message);});
    console.log(data);
    return data;
  }

  delete = async (persona) => {
    let url = `https://gorest.co.in/public/v1/users/`;
    let userToken = '6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a';
    const requestOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
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

  mostrarTodo = () => {
    let url = `https://gorest.co.in/public/v1/users`;
    const config = {
      headers: { Authorization: `Bearer 6b4a8a1beaadfc04077ebbab1f44f0d0464fc254fd4d5c1cce259b766efd834a` }
    };
    var data;

    // axios.get(`https://gorest.co.in/public/v1/users`, config)
    //   .then(res => {
    //     const personas = res.data.data;
    //     this.setState({ personas });
    //   })

    const requestOptions = {
      method: 'GET'
    };

    // fetch('https://api.mydomain.com')
    //   .then(response => response.json())
    //   .then(data => this.setState({ data }));
    
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(json => {data = json;  this.state.personas = data.data; this.setState( data.data ); })
    
    .catch(error => {console.log('getSearchTurns: error: ' + error.message);});

    

      // .then(res => {
      //   // const personas = res.json();
      //   .then(response => response.json())
      //   .then(json => {data = json;})
      //   // console.log(JSON.stringify(personas));
      //   // console.log(personas);
      //   // this.setState({ personas });
      // })
      // // .then(handleResponse);
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="primary" onClick={()=>this.getAll()}>Consultar Todo</Button>
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>    
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
                      onClick={() => this.mostrarModalActualizar(persona)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.delete(persona)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
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

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar registro</h3></div>
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
                value={this.state.data.length+1}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Name: 
              </label>
              <input
                className="form-control"
                name="namne"
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
              onClick={() => this.insertar()}
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
      </>
    );
  }
}
export default App;