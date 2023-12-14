import React from "react";
import HomeImg from '../../Assets/home-library.jpeg'
import styled from "styled-components";

const Home = () => {
    return (
        <Container>
            <h1>Seja bem vindo(a)</h1>
            <h1>à BiblioTech!</h1>
            <p>"O conhecimento é uma chave que abre as portas do sucesso."</p>
        </Container>
    )
}

export default Home

//styled

const Container = styled.div`
    background-image: url(${HomeImg});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
    color: white;
    h1{
        font-size: 80px;
    }
    p{
        margin-top: 40px;
        font-size: 30px;
    }
`
