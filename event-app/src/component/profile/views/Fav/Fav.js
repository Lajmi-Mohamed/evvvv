import React, { useEffect, useState } from "react";
import { Button } from "antd";
import axios from "axios";
import "./favorite.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { connect } from "react-redux";
// import { IMAGE_BASE_URL, POSTER_SIZE } from "../../Config";

function FavoritePage({ user }) {
  const [Favorites, setFavorites] = useState([]);

  let variable = { userId: user };
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.post("/api/fav/getFavoreEvent", variable).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      }
    });
  };

  const onClickDelete = (eventId, userId) => {
    const variables = {
      eventId: eventId,
      userId: userId,
    };
    axios.post("/api/fav/removeFromFavorite", variables).then((response) => {
      if (response.data.success) {
        fetchEvents();
      } else {
        alert("Failed to Remove From Favorite");
      }
    });
  };

  const renderTab = Favorites.map((el, i) => {
    const content = (
      <div>
        {el.eventImage ? (
          <img
            style={{ width: 300 }}
            src={`http://localhost:5000/${el.eventImage[0]}`}
            alt="event"
          />
        ) : (
          " no image"
        )}
      </div>
    );
    return (
      <tr key={i}>
        <Tooltip
          content={content}
          title={
            <div>
              <h5
                style={{
                  backgroundColor: "white",
                  textAlign: "center",
                  color: "###",
                  fontFamily: "italic",
                }}
              >
                {el.eventTitle}
              </h5>
              <img
                style={{
                  width: 280,
                  height: 200,
                  marginTop: -7,
                  fontWeight: 500,
                }}
                src={`http://localhost:5000/${el.eventImage[0]}`}
                alt="event"
              />
            </div>
          }
        >
          <td style={{ textAlign: "center" }}>{el.eventTitle}</td>
        </Tooltip>
        <td style={{ textAlign: "center" }}>
          {new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }).format(el.startDate)}
        </td>
    
        <DeleteIcon
                    style={{
                      fontSize: " 1.8rem",
                      color: "grey",
                      marginRight: 15,
                      cursor: "pointer",
                      marginLeft:"10px",
                      marginTop:"45px"
                    }}
                    onClick={() => onClickDelete(el.eventId, el.userId)}
                  />
         
       
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <table>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th style={{ textAlign: "center" }}> Titre </th>
            <th style={{ textAlign: "center" }}>Date</th>
            
          </tr>
        </thead>
        <tbody>{renderTab}</tbody>
      </table>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(FavoritePage);
