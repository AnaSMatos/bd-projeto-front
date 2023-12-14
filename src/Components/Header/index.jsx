import React, {useContext, useState, useEffect} from "react";
import UserContext from "../../UserContext";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const path = location.pathname
    const { user } = useContext(UserContext)

    return (
        <HeaderContainer>
            <Title>
                <i className="fa-solid fa-book-bookmark"></i>
                BiblioTech
            </Title>
            <MenuItems>
                <MenuButton 
                    className={path === "/" ? "selected" : ""}
                    onClick={() => {
                        navigate("/")
                    }}
                >
                    Home
                </MenuButton>
                <MenuButton 
                    className={path === "/livros" ? "selected" : ""}
                    onClick={() => {
                        navigate("/livros")
                    }}
                >
                    Livros
                </MenuButton>
                <MenuButton 
                    className={path === "/materiais" ? "selected" : ""}
                    onClick={() => {
                        navigate("/materiais")
                    }}
                >
                    Materiais Didáticos
                </MenuButton>
            </MenuItems>
            <MenuItems>
                {user.token &&
                <MenuButton
                    className={path === "/emprestimos" ? "selected" : ""}
                    onClick={() => {
                        navigate("/emprestimos")
                    }}
                >
                    <i class="fa-solid fa-handshake"></i>
                    Empréstimos
                </MenuButton>
                }
                <MenuButton 
                    className={path === "/criar-conta" ? "selected" : ""}
                    onClick={() => {
                        navigate("/criar-conta")
                    }}
                >
                    <i className="fa-solid fa-user-plus"></i> Criar conta
                </MenuButton>
                <MenuButton 
                    className={path === "/auth" ? "selected" : ""}
                    onClick={() => {
                        navigate("/auth")
                    }}
                    disabled={Object.keys(user).length}
                >
                    {(!user || !Object.keys(user).length) ? 
                        <>
                            <i className="fa-solid fa-user"></i> Entrar
                        </>
                        :
                        <>
                            <ImgWrapper>
                                <img src={user.foto} alt="" />
                            </ImgWrapper>
                            {user.nome}
                        </>
                    }
                </MenuButton>
            </MenuItems>
        </HeaderContainer>
    )
}

export default Header;

//styles

const HeaderContainer = styled.div`
    background-color: #deb385;
    display: flex;
    justify-content: space-between;
    padding: 20px 50px;
    height: 70px;
    box-sizing: border-box;
    font-family: 'Item', 'sans-serif';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
`

const MenuItems = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 35px;
    font-family: 'Item', 'sans-serif';
    font-weight: 600;
    i{
        margin-right: 7px;
    }
`

const MenuButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px;
    background: none;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    i{
        margin-right: 7px;
    }
    &.selected{
        background-color: #f3e6d8;
        color: #423237;
    }
    &:disabled{
        cursor: default;
    }
`

const ImgWrapper = styled.div`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 7px;
    img{
        height: 45px;
    }
`