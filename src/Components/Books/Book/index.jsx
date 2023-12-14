import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Book = ({book}) => {
    const navigate = useNavigate()
    const goToBookPage = () => {
        navigate(`/livro/${book.ISBN}`, { state: { book } });
    }

    return(
        <Container onClick={goToBookPage}>
            <img src={book.uri_capa} alt="" />
            <h2>{book.titulo}</h2>
            <p>{book.autor}</p>
            <RentBook 
                available={book.is_available}
            >
                {
                    !book.is_available ? "Indisponível" : "Disponível"
                }
            </RentBook>
        </Container>
    )
}

export default Book;

const Container = styled.div`
    background-color: #fff;
    width: 230px;
    height: 350px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    padding: 15px;
    box-sizing: border-box;
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

const RentBook = styled.div`
    background-color: ${({available}) => available ? "#1da138" : "#b31c00"};
    color: white;
    border-radius: 4px;
    border: none;
    margin-top: 8px;
    padding: 4px;
    cursor: pointer;
`