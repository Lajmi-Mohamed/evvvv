import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "antd";
const Adherents = (props) => {
  const [Users, setUsers] = useState([]);
  const getUsers = () => {
    axios.get("/api/adherent/allCreateures").then((res) => {
      if (res.data) {
        setUsers(
          res.data.filter((el) => el.User.email !== "cjasser580@gmail.com")
        );
      } else {
        alert("failed to grt users");
      }
    });
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(props);
  const deleteUser = (id) => {
    axios
      .post(`/api/adherent/deleteUser/${id}`)
      .then((res) => {
        getUsers();
      })
      .catch("failed to delete user");
    axios.delete(`/api/event/delete/${id}`);
    axios.delete(`/api/video/delete/${id}`);
  };

  const renderTab = Users.map((el, i) => {
    return (
      <tr>
        <td style={{ textAlign: "center" }}>{el.User.userName}</td>
        <td style={{ textAlign: "center" }}> {el.User.firstName} </td>
        <td style={{ textAlign: "center" }}> {el.User.lastName} </td>
        <td style={{ textAlign: "center" }}> {el.User.email}</td>
        <td style={{ textAlign: "center" }}>
          {moment(el.createdAt).format("DD-MM-YYYY")}
        </td>
        <div style={{ backgroundColor:"white" }}>
          <DeleteIcon  style={{
                      fontSize: " 1.8rem",
                      color: "grey ",
                      marginRight: 15,
                      cursor: "pointer",
                      marginLeft:"10px",
                      marginTop:"25px"
                    }} onClick={() => deleteUser(el.User._id)}>Supprimer</DeleteIcon>
        </div>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Username</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Date d'inscription</th>
           
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
    </div>
  );
};

export default Adherents;
