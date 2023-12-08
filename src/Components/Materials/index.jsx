import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";

const Materials = () => {
    const [materials, setMaterials] = useState([])

    useEffect(() => {
        const promise = axios.get("https://bd-projeto-back.onrender.com/materials")
        promise
        .then(res=>{
            setMaterials(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    }, [])

    console.log(materials)

    return(
        <ContentContainer>
            {materials?.map((material, index) => (
                <MaterialContainer>
                    <img src={material.uri_foto} alt="" />
                    <p>{material.descricao}</p>
                </MaterialContainer>
            ))}
        </ContentContainer>
    )
}

export default Materials

//styles
const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 70px;
    gap: 10px;
`
const MaterialContainer = styled.div`
    background-color: yellow;
    width: 200px;
    height: 300px;
    img{
        width: 175px;
        height: 230px;
    }
`