import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const promise = axios.get("https://bd-projeto-back.onrender.com/books")
        promise
        .then(res=>{
            setBooks(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    }, [])

    return(
        <ContentContainer>
            {books?.map((book, index) => (
                <BookContainer>
                    <img src={book.uri_capa} alt="" />
                    <p>{book.titulo}</p>
                    <p>{book.autor}</p>
                </BookContainer>
            ))}
        </ContentContainer>
    )
}

export default Books

//styles
const ContentContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 70px;
    gap: 10px;
`
const BookContainer = styled.div`
    background-color: yellow;
    width: 200px;
    height: 300px;
    img{
        width: 175px;
        height: 230px;
    }
`