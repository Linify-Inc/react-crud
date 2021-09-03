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
      nombre: "",
      email: "",
      gender: "",
    },
  };

  peticionGet() {
    axios.get(`https://gorest.co.in/public/v1/users`)
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
    this.setState({ modalInsertar: false });
  };

  editar = (personas) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (personas.id === registro.id) {
        arreglo[contador].nombre = personas.nombre;
        arreglo[contador].email = personas.email;
        arreglo[contador].gender = personas.gender;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (personas) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+personas.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (personas.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarTodo = () => {
    axios.get(`https://gorest.co.in/public/v1/users`)
      .then(res => {
        const personas = res.data.data;
        this.setState({ personas });
      })
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <Button color="success" onClick={()=>this.mostrarTodo()}>Consultar Todo</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>nombre</th>
                <th>email</th>
                <th>gender</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.personas.map((personas) => (
                <tr key={personas.id}>
                  <td>{personas.id}</td>
                  <td>{personas.nombre}</td>
                  <td>{personas.email}</td>
                  <td>{personas.gender}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(personas)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(personas)}>Eliminar</Button>
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
                nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                email: 
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
              gender: 
              </label>
              <input
                className="form-control"
                name="gender"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.gender}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
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
                nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                email: 
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
                gender: 
              </label>
              <input
                className="form-control"
                name="gender"
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
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;