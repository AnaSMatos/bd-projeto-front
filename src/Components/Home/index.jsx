import React from "react";
import HomeImg from '../../Assets/home-library.jpeg'
import styled from "styled-components";

const Home = () => {
    return (
        <Container>
            aaa
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
    height: 100vh;
`
