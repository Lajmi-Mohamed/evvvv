import React, { useEffect } from "react";
import { getContact, deletecontact } from "../../../../actions/contactaction";
import { connect } from "react-redux";
import { Button } from "antd";
import DeleteIcon from "@material-ui/icons/Delete";
function ContactPage(props) {
  useEffect(() => {
    props.getContact();
  }, []);
  const renderTab = props.contactReducer.get.map((el, i) => {
    return (
      <tr key={i}>
        <td style={{ textAlign: "center" }}> {el.name} </td>
        <td style={{ textAlign: "center" }}> {el.email} </td>
        <td style={{ textAlign: "center" }}> {el.sujet} </td>
        <td style={{ textAlign: "center" }}> {el.message}</td>

        <div style={{ backgroundColor:"white" }}>
          <DeleteIcon  style={{
                      fontSize: " 1.8rem",
                      color: "grey",
                      marginRight: 15,
                      cursor: "pointer",
                      marginLeft:"10px",
                      marginTop:"45px"
                    }}  onClick={() => props.deletecontact(el._id)}>Supprimer</DeleteIcon>
        </div>
      </tr>
    );
  });
  return (
    <div>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>name</th>
            <th>email</th>
            <th>sujet</th>
            <th>Message</th>

           
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    contactReducer: state.contactReducer,
  };
};
export default connect(mapStateToProps, { getContact, deletecontact })(
  ContactPage
);
