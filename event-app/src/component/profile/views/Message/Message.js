import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button } from "antd";
import DeleteIcon from "@material-ui/icons/Delete";
const Message = () => {
  const [Message, setMessage] = useState([]);
  const getMessage = () => {
    axios.post("/api/message/getMessage").then((res) => {
      if (res.data.success) {
        setMessage(res.data.message);
      }
    });
  };
  useEffect(() => {
    getMessage();
  }, []);
  const handleDelte = (id) => {
    axios.delete(`/api/message/delete/${id}`).then((res) => {
      getMessage();
    });
  };
  const renderTab = Message.map((el, i) => {
    return (
      <tr key={i}>
        <td style={{ textAlign: "center" }}>
          {`${el.userId.firstName} ${el.userId.lastName}`}
        </td>
        <td style={{ textAlign: "center" }}> {el.text} </td>
        <td style={{ textAlign: "center" }}>
          {moment(el.createdAt).format("DD-MM-YYYY")}
        </td>
  
          <DeleteIcon style={{fontSize: " 1.8rem",
            color: "grey",
            marginRight: 15,
            cursor: "pointer",
            marginLeft:"20px",
            marginTop:"25px"}} onClick={() => handleDelte(el._id)}></DeleteIcon>
       
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr style={{ textAlign: "center" }}>
          <th> Nom et Prénom de l'expéditeur</th>
          <th>Message</th>
          <th>Date</th>
      
        </tr>
      </thead>
      <tbody>{renderTab}</tbody>
    </table>
  );
};

export default Message;
