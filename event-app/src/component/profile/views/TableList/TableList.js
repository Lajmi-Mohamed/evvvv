import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import FileUploadTwo from "./FileuploadTwo"
import { Button, Form } from "antd";
import GridItem from "../../components@material/Grid/GridItem.js";
import GridContainer from "../../components@material/Grid/GridContainer.js";
import Card from "../../components@material/Card/Card.js";
import CardHeader from "../../components@material/Card/CardHeader.js";
import TextField from "@material-ui/core/TextField";
import FileUpload from "./FileUpload";
import NativeSelect from "@material-ui/core/NativeSelect";
import "./TableList.css"
import {
  addEvent,
  clearErrorEvent,
  getUserEvents,
} from "../../../../actions/actions";
import { connect } from "react-redux";

const Type_event = [
  { key: 1, value: "Sportif" },
  { key: 2, value: "Educatif" },
  { key: 3, value: "Scientifique" },
  { key: 4, value: "Culturel" },
  { key: 5, value: "Artisanat" },
  { key: 6, value: "Festivate" },
];
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};
const useStyles = makeStyles(styles);
function TableList(props) {
  const classes = useStyles();
  const [Titre, setTitre] = useState({ Titre: "" });
  const [Images, setImages] = useState([]);
  const [infos, setInfos] = useState({
    Type_event: null,
    City: "",
    Country: "",
    Titre: "",
    Description: "",
    Zip_Code: "",
    Start_date: "",
    End_date: "",
    imagemap:"",
    user: {
      _id: props.auth.adherent._id,
      nbr_events: props.auth.adherent.nbr_events + 1,
    },
    userId: props.auth.user.id,
    text: `${props.auth.user.userName} à ajouter un nouveau événement`,
  });
  const handleChange = (e) => {
    setInfos({
      ...infos,
      [e.target.name]: e.target.value,
    });
    setTitre({ ...Titre, [e.target.Titre]: e.target.value });
  };
  const handleChangeDate = (e) => {
    setInfos({
      ...infos,
      [e.target.name]: new Date(e.target.value.replace(/-0+/g, "-")).getTime(),
    });
  };
const acceptedFileTypes = "image/png , image/jpg, image/x-png, image/jpeg, mage/gif"
  const onSubmit = (event) => {
    props.addEvent(infos);

    props.getUserEvents();
   setTimeout(() => {
     props.clearErrorEvent();
    }, 5000);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
    setInfos({ ...infos, EventImage: newImages });
  };
   const updateImagesmap = (newImages) => {
    setImages(newImages);
    setInfos({ ...infos,imagemap: newImages });
  };
  const [err, setErros] = useState([]);
  useEffect(() => {
    setErros(props.error.errors);
  }, [props.error.errors]);

  const imagemapErr = err.filter((el) => el.msg === "veuillez choisir l'image map")[0];
  const TitreErr = err.filter((el) => el.msg === "veuillez saisir le titre")[0];
  const TitreErr2 = err.filter(
    (el) => el.message === "L'événement titre ne doit plus avoir 25 caractères"
  )[0];

  const TypeErr = err.filter(
    (el) => el.msg === "veuillez saisir votre Type_évènement"
  )[0];

  const Start_DateErr = err.filter(
    (el) => el.msg === "veuillez entrer la date de début"
  )[0];

  const End_DateErr = err.filter(
    (el) => el.msg === "veuillez entrer la date de fin"
  )[0];

  const CityErr = err.filter(
    (el) => el.msg === "veuillez entrer le nom de votre ville"
  )[0];
  const CityErr2 = err.filter(
    (el) => el.message === "la ville ne doit contenir plus 25 caractères"
  )[0];

  const CountryErr = err.filter(
    (el) => el.msg === "veuillez entrer le nom de votre pays"
  )[0];
  const CountryErr2 = err.filter(
    (el) => el.message === "Le pays ne doit pas contenir plus de 25 caractères"
  )[0];

  const Zip_CodeErr = err.filter(
    (el) => el.msg === "S'il vous plait, entrer votre code postal"
  )[0];
  const Zip_CodeErr2 = err.filter(
    (el) =>
      el.message === "Veuillez entrer un code postal valide = 4 chiffres //"
  )[0];

  const DescriptionErr = err.filter(
    (el) => el.msg === "veuillez saisir la description"
  )[0];
  const DescriptionErr2 = err.filter(
    (el) => el.message === "La description ne doit pas plus de 5000"
  )[0];

  const ImagesErr = err.filter(
    (el) => el.msg === "veuillez entrer les images"
  )[0];

  return (
    <GridContainer styles={{ BackgroundColor: "blue !important" }}>
      <GridItem xs={12} sm={12} md={12}>
        <Card images={Images}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Ajouter évènement</h4>
          </CardHeader>
          <div className="container">
            <Form onSubmit={onSubmit}>
              {/* DropZONE */}

            
              <div className="row" style={{ marginTop: "20px" }}>
                {TitreErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "250px",
                    }}
                  >
                    {TitreErr.msg}
                  </p>
                )}
                {TitreErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "160px",
                    }}
                  >
                    {TitreErr2.message}
                  </p>
                )}
                <h3
                  className="align-self-center "
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.3rem",
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Titre :
                </h3>

                <TextField //value={TitleValue}
                  onChange={handleChange}
                  name="Titre"
                  style={{
                    width: "24%",
                    marginLeft: "20px",
                    marginTop: "10px",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <br />
                <br />
                {TypeErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "600px",
                    }}
                  >
                    {TypeErr.msg}
                  </p>
                )}
                <h3
                  className="align-self-center"
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.3rem",
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Type :
                </h3>
                <NativeSelect
                  value={Type_event.key}
                  onChange={handleChange}
                  name="Type_event"
                  className={classes.selectEmpty}
                >
                  <option value="">None</option>
                  {Type_event.map((option) => (
                    <option
                      aria-label="None"
                      key={option.key}
                      value={option.key}
                    >
                      {option.value}
                    </option>
                  ))}
                </NativeSelect>
              
              
              </div>
              <br />
              <br />

              <h3
                className="align-self-center"
                style={{
                  marginLeft: "40px",
                  fontFamily: "permanent Marker, cursive",
                  letterSpacing: "0.3rem",
                  textTransform: "uppercase",
                  color: "rgb(109, 9, 109)",
                }}
              >
                Date :
              </h3>
              <div className="row">
                {Start_DateErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "250px",
                    }}
                  >
                    {Start_DateErr.msg}
                  </p>
                )}
                {End_DateErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "600px",
                    }}
                  >
                    {End_DateErr.msg}
                  </p>
                )}
                <TextField
                  // value={DateValue}
                  onChange={handleChangeDate}
                  style={{ width: "40%", marginLeft: "50px" }}
                  label="date de debut"
                  type="date"
                  name="Start_date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  // value={DateValue}
                  onChange={handleChangeDate}
                  style={{ width: "40%", marginLeft: "50px" }}
                  label="date fe fin"
                  type="date"
                  name="End_date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <br />
              <br />
              <div className="row">
                {CityErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "100px",
                    }}
                  >
                    {CityErr.msg}
                  </p>
                )}
                {CityErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "100px",
                    }}
                  >
                    {CityErr2.message}
                  </p>
                )}

                {CountryErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "450px",
                    }}
                  >
                    {CountryErr.msg}
                  </p>
                )}
                {CountryErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "450px",
                    }}
                  >
                    {CountryErr2.message}
                  </p>
                )}
                {Zip_CodeErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "830px",
                    }}
                  >
                    {Zip_CodeErr.msg}
                  </p>
                )}
                {Zip_CodeErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -32,
                      fontStyle: "italic",
                      marginLeft: "830px",
                    }}
                  >
                    {Zip_CodeErr2.message}
                  </p>
                )}
                <h3
                  className="align-self-center"
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.3rem",
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Ville:
                </h3>

                <TextField //value={TitleValue}
                  onChange={handleChange}
                  name="City"
                  style={{ width: "12%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <h3
                  className="align-self-center"
                  style={{
                    marginLeft: "30px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.3rem",
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Pays:
                </h3>
                <TextField //value={TitleValue}
                  onChange={handleChange}
                  name="Country"
                  style={{ width: "12%" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <h3
                  className="align-self-center"
                  style={{
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.3rem",
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                    marginLeft: "30px",
                  }}
                >
                  Code Postal:
                </h3>
                <TextField //value={TitleValue}
                  onChange={handleChange}
                  name="Zip_Code"
                  style={{ width: "12%" }}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div style={{marginTop:"20px"}} className="row">
            
                <div>
                <h3
                  className="align-self-center "
                  style={{
                   fontSize:"28px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                    marginTop: "10px",
                    marginLeft:"50px"
                  }}
                >
                  photos de l'événement :
                </h3>
                {ImagesErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -10,
                      fontStyle: "italic",
                      marginLeft: "170px",

                    }}
                  >
                    {ImagesErr.msg}
                  </p>
                )}

                <FileUpload refreshfunction={updateImages} />
                </div>
                <div  style={{marginTop:"10px"}}>
                <h3
                  className="align-self-center"
                  style={{marginLeft:"40px",
                    fontSize:"28px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.1rem",
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Choisir l'image map :
                </h3>
              
                {imagemapErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -20,
                      fontStyle: "italic",
                      marginLeft: "450px",
                    }}
                  >
                    {imagemapErr.msg}
                  </p>
                )}
             
<FileUploadTwo 
Images={Images}
name={"EventImage"}
onChange={handleChange}
value={infos.imagemap}
refreshfunction={updateImagesmap}
label="Image" />
</div>
              </div>
            
              <div className="row" style={{ marginTop: "30px" }}>
                <h3
                  className="align-self-center"
                  style={{
                    marginLeft: "50px",
                    fontFamily: "permanent Marker, cursive",
                    letterSpacing: "0.3rem",
                    textTransform: "uppercase",
                    color: "rgb(109, 9, 109)",
                  }}
                >
                  Description
                </h3>
                {DescriptionErr && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "350px",
                    }}
                  >
                    {DescriptionErr.msg}
                  </p>
                )}{" "}
                {DescriptionErr2 && (
                  <p
                    style={{
                      position: "absolute",
                      fontWeight: 500,
                      color: "#f82249",
                      marginTop: -27,
                      fontStyle: "italic",
                      marginLeft: "350px",
                    }}
                  >
                    {DescriptionErr2.messageg}
                  </p>
                )}
                <TextField
                  style={{
                    width: "90%",
                    marginBottom: "25px",
                    marginLeft: "50px",
                  }}
                  label="Description"
                  name="Description"
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  variant="outlined"
                  // value={DescriptionValue}
                  onChange={handleChange}
                />
              </div>
              
              <Button
                onClick={onSubmit}
                style={{
                  marginLeft: "50px",
                  backgroundColor: "rgb(109, 9, 109)",
                  color: "white",
                  fontSize: "20px",
                  borderRadius: "5px",
                  width: "150px",
                  height: "50px",
                  borderColor: "transparent",
                  marginTop: "10px",
                }}
              >
                Ajouter
              </Button>
            </Form>
            <br />
          </div>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.ErrorEventReeducer,
  };
};

export default connect(mapStateToProps, {
  addEvent,
  clearErrorEvent,
  getUserEvents,
})(TableList);
