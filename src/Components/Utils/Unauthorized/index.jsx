import React from "react";
import styled from "styled-components";

export const Unauthorized = ({role = ""}) => {
    return(
        <Container>
            <div>
                <i class="fa-solid fa-triangle-exclamation"></i>
                <p>Acesso negado</p>
            </div>
            <h2>Para acessar essa página, você deve estar logado
            {role ? `e ser um ${role}` : "."}</h2>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2{
        margin-top: 40px;
        font-size: 25px;
    }
    div{
        color: #d4290a;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: 100px;
            margin-right: 12px;
        }
        p{
            font-size: 70px;
        }
    }
`