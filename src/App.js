import React, { Component } from "react";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class App extends Component {
  state = {
    users: [
      {
        Id: 1,
        username: "kevin",
        password: "12345",
        email: "kevin123@gmail.com",
        role: "user",
      },
      {
        Id: 2,
        username: "admin",
        password: "12345",
        email: "kevin123@gmail.com",
        role: "admin",
      },
    ],
    modalOpen: false,
    dataAdd: {
      username: "",
      password: "",
      email: "",
      role: "",
    },
  };

  onAddDataClick = () => {
    console.log(this.state.dataAdd);
    let { username, password, email, role } = this.state.dataAdd;

    if (!username || !password || !email || !role) {
      alert("tolong lengkapi");
      return;
    }
    let usersNew = this.state.users;
    usersNew.push(this.state.dataAdd);

    let defaultAddData = {
      username: "",
      password: "",
      email: "",
      role: "",
    };
  };

  toggleModalHandler = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  onAddInputHandler = (e) => {
    let dataAddMute = this.state.dataAdd;
    dataAddMute = { ...dataAddMute, [e.target.name]: e.target.value };
    this.setState({ dataAdd: dataAddMute });
  };

  renderListData = () => {
    return this.state.users.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.username}</td>
          <td>{val.password}</td>
          <td>{val.email}</td>
          <td>{val.role}</td>
          <td>
            <button>Delete</button>
            <button>Edit</button>
            <button onClick={this.toggleModalHandler}>Add Data</button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="px 5">
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModalHandler}>
          <ModalHeader toggle={this.toggleModalHandler}>Modal title</ModalHeader>
          <ModalBody>
            <input type="text" name="username" className="form-control" placeholder="username" onChange={this.onAddInputHandler} value={this.state.dataAdd.username} />
            <input type="text" name="password" className="form-control" placeholder="password" value={this.state.dataAdd.password} onChange={this.onAddInputHandler} />
            <input type="text" name="email" className="form-control" placeholder="email" value={this.state.dataAdd.email} onChange={this.onAddInputHandler} />
            <input type="text" name="role" className="form-control" placeholder="role" value={this.state.dataAdd.role} onChange={this.onAddInputHandler} />
          </ModalBody>
          <ModalFooter>
            <button onClick={this.onAddDataClick}>Save</button>
            <button onClick={this.toggleModalHandler}>Cancel</button>
          </ModalFooter>
        </Modal>
        <Table dark>
          <thead>
            <tr>
              <th>Id</th>
              <th>username</th>
              <th>password</th>
              <th>email</th>
              <th>role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{this.renderListData()}</tbody>
        </Table>
      </div>
    );
  }
}

export default App;
