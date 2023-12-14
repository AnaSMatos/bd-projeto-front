import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Material = ({material}) => {
    const navigate = useNavigate()
    const goToMaterialPage = () => {
        navigate(`/material/${material.id}`, { state: { material } });
    }

    return(
        <Container onClick={goToMaterialPage}>
            <img src={material.uri_foto} alt="" />
            <h2>{material.descricao}</h2>
            <p>{material.categoria}</p>
            <RentMaterial 
                available={material.is_available}
            >
                {
                    !material.is_available ? "Indisponível" : "Disponível"
                }
            </RentMaterial>
        </Container>
    )
}

export default Material;

const Container = styled.div`
    background-color: #fff;
    width: 230px;
    height: 370px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    img{
        width: 180px;
        height: 230px;
        margin-top: 5px;
    }
    h2{
        margin-top: 12px;
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: #333333;
    }
    p{
        font-size: 16px;
        margin-top: 10px;
    }
`

const RentMaterial = styled.div`
    background-color: ${({available}) => available ? "#1da138" : "#b31c00"};
    color: white;
    border-radius: 4px;
    border: none;
    margin-top: 8px;
    padding: 4px;
    cursor: pointer;
    position: absolute;
    bottom: 15px;
`