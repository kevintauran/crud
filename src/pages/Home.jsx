class Home extends Component {
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
  };
}

export default Home;
