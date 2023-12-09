import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";
import Loading from "../Utils/Loading";

const Materials = () => {
    const [materials, setMaterials] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        setIsLoading(true)
        const promise = axios.get("https://bd-projeto-back.onrender.com/materials")
        promise
        .then(res=>{
            setMaterials(res.data)
            setIsLoading(false)
        })
        .catch(err=>{
            console.log(err.response.data)
            setIsLoading(false)
        })
    }, [])

    const sarchMaterials = () => {
        setIsLoading(true)
        const promise = axios.get("https://bd-projeto-back.onrender.com/materials", { params: {searchTerm} })
        promise
        .then(res=>{
            setMaterials(res.data)
            setIsLoading(false)
        })
        .catch(err=>{
            console.log(err.response.data)
            setIsLoading(false)
        })
    }

    return(
        <ContentContainer>
            <Search>
                <input type="text" name="" id="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={sarchMaterials}><i className="fa-solid fa-magnifying-glass"></i></button>
            </Search>
            <MaterialsContainer>
                {isLoading && <Loading/>}
                {materials?.map((material, index) => (
                    <Material key={index}>
                        <img src={material.uri_foto} alt="" />
                        <p>{material.descricao}</p>
                    </Material>
                ))}
            </MaterialsContainer>
        </ContentContainer>
    )
}

export default Materials

//styles
const ContentContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    margin-top: 70px;
`

const MaterialsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    padding: 0 100px;
`

const Material = styled.div`
    background-color: #fff;
    width: 200px;
    height: 300px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    img{
        width: 175px;
        height: 230px;
        margin-top: 12px;
    }
`

const Search = styled.div`
    margin-bottom: 30px;
    padding-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    input{
        width: 400px;
        height: 35px;
        border-radius: 5px 0 0 5px;
        border: none;
        border-left: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        border-top: 1px solid #d9d9d9;
        box-sizing: border-box;
        padding: 0 10px;
        &:focus{
            outline: none;
        }
    }
    button{
        height: 35px;
        width: 40px;
        border: none;
        border-right: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        border-top: 1px solid #d9d9d9;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
    }
`