import React from "react";
import { Card } from 'react-bootstrap';
import '../Styles/Home.css';
import logo from "../media/tpslogo.png"

function AboutUs() {
    return(
        <body>

        <div className = "Aboutus">

            <div className = "logo">
                <img src = {logo}></img>
            </div>
         

            <ul>
                <li> <a href= "http://localhost:3000/">Home</a> </li>
                <li className="active"> <a href= "">AboutUs</a> </li>
                <li> <a href= "#">Login</a> </li>
            </ul>

        
            <div className="aboutus-title"> -Description of our web application</div>
            <br></br>

            <div className="aboutus-element">
                        UTSCHUB a website that targets all UTSC students and faculty members
                        to distribute further convenience within the community and explore the
                        embedded demands and supplies by offering a UTSC specific ECommerce platform.
                        Besides that, our website also aims to accomplish more sophisticated
                        community engagement with our distinctive SNS and event planning features.
            </div>



            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className="aboutus-title"> -Features </div>
            <br></br>

            <div className="aboutus-element">
                        Webcam,
                        Voice chat, 
                        chat.
            </div>   

            <br></br>
            <br></br>
            <br></br>
            <br></br>


        
            <div className="aboutus-title"> -Team Memebers </div>
            <div className="aboutus-element">
            Andrew Qian, 
            Shence Yang,  
            Muntaqa Mahmood
            </div>  



        </div>

     </body>
    )
}

export default AboutUs;