import React, {useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [selectedItem, setSelectedItem] = useState("Home")
    const navigate = useNavigate()
    return (
        <HeaderContainer>
            <Title>
                <i class="fa-solid fa-book-bookmark"></i>
                Library
            </Title>
            <MenuItems>
                <MenuButton 
                    className={selectedItem === "Home" ? "selected" : ""}
                    onClick={() => {
                        setSelectedItem("Home");
                        navigate("/")
                    }}
                >
                    Home
                </MenuButton>
                <MenuButton 
                    className={selectedItem === "Livros" ? "selected" : ""}
                    onClick={() => {
                        setSelectedItem("Livros");
                        navigate("/livros")
                    }}
                >
                    Livros
                </MenuButton>
                <MenuButton 
                    className={selectedItem === "Materiais" ? "selected" : ""}
                    onClick={() => {
                        setSelectedItem("Materiais");
                        navigate("/materiais")
                    }}
                >
                    Materiais Didáticos
                </MenuButton>
            </MenuItems>
            <MenuButton 
                    className={selectedItem === "Autenticar" ? "selected" : ""}
                    onClick={() => {
                        setSelectedItem("Autenticar");
                        navigate("/auth")
                    }}
                >
                    <i class="fa-solid fa-user"/>
            </MenuButton>
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
    /* color: #423237; */
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px;
    background: none;
    cursor: pointer;
    font-size: 17px;
    font-weight: 600;
    &.selected{
        background-color: #f3e6d8;
        color: #423237;
    }
`