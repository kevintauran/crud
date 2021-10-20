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
    modalDel: false,
    indexDel: -1,
    dataAdd: {
      username: "",
      password: "",
      email: "",
      role: "",
    },
    modalEdit: false,
    indexEdit: -1,
    dataEdit: {
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

    let defaultDataAdd = {
      username: "",
      password: "",
      email: "",
      role: "",
    };
    this.setState({
      users: usersNew,
      dataAdd: defaultDataAdd,
      modalOpen: false,
    });
  };

  toggleModalHandler = () => {
    this.setState({ modalOpen: !this.state.modalOpen });
  };

  toggleModalEditHandler = () => {
    this.setState({ modalEdit: !this.state.modalEdit });
  };

  toggleModalDelHandler = () => {
    this.setState({ modalDel: !this.state.modalDel });
  };

  onAddInputHandler = (e) => {
    let dataAddMute = this.state.dataAdd;
    dataAddMute = { ...dataAddMute, [e.target.name]: e.target.value };
    this.setState({ dataAdd: dataAddMute });
  };

  onEditInputHandler = (e) => {
    let dataEditMutate = this.state.dataEdit;
    dataEditMutate = { ...dataEditMutate, [e.target.name]: e.target.value };
    this.setState({ dataEdit: dataEditMutate });
  };

  onSaveEditClick = () => {
    let { username, password, email, role } = this.state.dataEdit;

    if (!username || !password || !email || !role) {
      alert("tolong lengkapi");
      return;
    }
    let { indexEdit, users, dataEdit } = this.state;
    let usersNew = users;
    usersNew.splice(indexEdit, 1, dataEdit);

    let defaultEditData = {
      username: "",
      password: "",
      email: "",
      role: "",
    };
    this.setState({
      users: usersNew,
      dataEdit: defaultEditData,
      modalEdit: false,
    });
  };

  onDeleteClick = (index) => {
    this.setState({ indexDel: index, modalDel: !this.state.modalDel });
  };

  onEditClick = (index) => {
    let newEditData = this.state.users[index];

    this.setState({
      indexEdit: index,
      modalEdit: !this.state.modalEdit,
      dataEdit: newEditData,
    });
  };

  onconfirmdeleteclick = () => {
    const { indexDel, users } = this.state;
    let usersNew = users;
    usersNew.splice(indexDel, 1);

    this.setState({
      users: usersNew,
      indexDel: -1,
      modalDel: !this.state.modalDel,
    });
  };

  renderListData = () => {
    return this.state.users.map((val, index) => {
      return (
        <tr key={index} onDeleteClick={this.onDeleteClick}>
          <td>{index + 1}</td>
          <td>{val.username}</td>
          <td>{val.password}</td>
          <td>{val.email}</td>
          <td>{val.role}</td>
          <td>
            <button onClick={() => this.onDeleteClick(index)}>Delete</button>
            <button onClick={() => this.onEditClick(index)}>Edit</button>
            <button onClick={this.toggleModalHandler}>Add Data</button>
          </td>
        </tr>
      );
    });
  };

  renderModalEdit = () => {
    let { indexEdit, dataEdit, modalEdit, users } = this.state;
    if (indexEdit < 0) {
      return;
    }
    return (
      <div className="px 5">
        <Modal isOpen={modalEdit} toggle={this.toggleModalEditHandler}>
          <ModalHeader toggle={this.toggleModalEditHandler}>
            Edit user {users.username}
          </ModalHeader>
          <ModalBody>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="username"
              onChange={this.onEditInputHandler}
              value={dataEdit.username}
            />
            <input
              type="text"
              name="password"
              className="form-control"
              placeholder="password"
              value={dataEdit.password}
              onChange={this.onEditInputHandler}
            />
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="email"
              value={dataEdit.email}
              onChange={this.onEditInputHandler}
            />
            <input
              type="text"
              name="role"
              className="form-control"
              placeholder="role"
              value={dataEdit.role}
              onChange={this.onEditInputHandler}
            />
          </ModalBody>
          <ModalFooter>
            <button onClick={this.onSaveEditClick}>Save</button>
            <button onClick={this.toggleModalEditHandler}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  };

  render() {
    const { users, indexDel, modalDel } = this.state;
    return (
      <div className="px 5">
        {/*  modal add */}
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModalHandler}>
          <ModalHeader toggle={this.toggleModalHandler}>Add user</ModalHeader>
          <ModalBody>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="username"
              onChange={this.onAddInputHandler}
              value={this.state.dataAdd.username}
            />
            <input
              type="text"
              name="password"
              className="form-control"
              placeholder="password"
              value={this.state.dataAdd.password}
              onChange={this.onAddInputHandler}
            />
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="email"
              value={this.state.dataAdd.email}
              onChange={this.onAddInputHandler}
            />
            <input
              type="text"
              name="role"
              className="form-control"
              placeholder="role"
              value={this.state.dataAdd.role}
              onChange={this.onAddInputHandler}
            />
          </ModalBody>
          <ModalFooter>
            <button onClick={this.onAddDataClick}>Save</button>
            <button onClick={this.toggleModalHandler}>Cancel</button>
          </ModalFooter>
        </Modal>
        {/* modal add finished */}

        {/* modal del */}
        <Modal isOpen={modalDel} toggle={this.toggleModalHandler}>
          <ModalHeader toggle={this.toggleModalDelHandler}>
            Delete user
          </ModalHeader>
          <ModalBody>
            yakin hapus user {indexDel < 0 ? "" : users[indexDel].username}?
          </ModalBody>
          <ModalFooter>
            <button onClick={this.onconfirmdeleteclick}>Yes</button>
            <button onClick={this.toggleModalDelHandler}>Cancel</button>
          </ModalFooter>
        </Modal>
        {/* modal del finished */}
        {this.renderModalEdit()}
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
