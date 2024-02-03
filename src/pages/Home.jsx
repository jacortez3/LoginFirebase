
import { useEffect } from "react";
import styled from "styled-components";
import { UserAuth } from "../context/AuthContext";

export function Home() {
  const {user, logOut} = UserAuth();
  const cerrarSesión=async()=>{
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
 
  return (<Container>
      <h1>Bienvenido {user.displayName} </h1>
      <p>Correo: {user.email}</p>
      <img src={user.photoURL} alt={user.displayName}/>
      <br/>
      <button onClick={cerrarSesión}>Cerrar Sesión</button>

      <br/>
      
      
      
  </Container>);
}
const Container =styled.div`
  
`