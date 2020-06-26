import React from "react";
import "./Apropos.css";
import { Carousel } from 'react-bootstrap'
const Apropos = props => (
  <Carousel className="carousell" style={{height:"50vh"}} >


  <Carousel.Item>
  <div >
          <h1 style={{textAlign:"center"}}>À PROPOS EventTN</h1>
          <p style={{width:"600px",textAlign:"center",marginLeft:"400px"
        ,fontFamily:"Arial, Helvetica, sans-serif",fontSize:"20px"}}>
            Aujourd’hui beaucoup de gens cherchent un moyen pour se divertir,
            s’amuser ou pour accueillir des nouvelles connaissances. ce site
            permet de te présenter des événements de types différents et
            d’autres services complémentaires destinés aux simples visiteurs et
            aux participants pour qu’ils bénéficient de ses avantages.
          </p>
        </div>
  </Carousel.Item>
  
  <Carousel.Item>
 <div>
 <h1 style={{textAlign:"center",fontSize:"50px"}}>Pays</h1>
 <br />
          <p style={{textAlign:"center",fontSize:"20px"}}>Tunisie</p>
 </div>

  </Carousel.Item>
  <Carousel.Item>
  <div style={{marginTop:"10px"}}>
 <h1 style={{textAlign:"center",fontSize:"50px"}}>QUAND</h1>
          <p style={{textAlign:"center",fontSize:"20px"}}> Du lundi au Dimanche</p>
         
          <p style={{textAlign:"center",fontSize:"20px"}}>   Janvier au December</p>
          
 </div>

   
  </Carousel.Item>
 
 
</Carousel>
);

export default Apropos;
