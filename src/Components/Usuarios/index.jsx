import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import UserContext from '../../UserContext'
import {Unauthorized} from '../Utils/Unauthorized'

const User = ({user, getUsers}) => {
    const [editMode, setEditMode] = useState(false)
    const [editedUser, setEditedUser] = useState(user)

    const deleteUser = () => {
        const promise = axios.delete(`https://bd-projeto-back.onrender.com/users?id=${user.id}`)
        promise
        .then(res=>{
            toast.success("Usuário deletado")
            getUsers()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const editUser = () => {
        const promise = axios.put(`https://bd-projeto-back.onrender.com/users`, editedUser)
        promise
        .then(res=>{
            toast.success("Usuário editado")
            setEditMode(false)
            getUsers()
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <UserContainer>
            <Toaster/>
            <EditDelete>
                <button onClick={() => setEditMode(!editMode)}><i class="fa-solid fa-pen"></i></button>
                {user.id != 10 && <button onClick={deleteUser}><i class="fa-solid fa-trash"></i></button>}
            </EditDelete>
            <ImgWrapper>
                <img src={user.uri_foto} alt="" />
            </ImgWrapper>
            <div>
                {!editMode ? 
                <>
                    <h3>Nome</h3>
                    <p>{user.nome}</p>
                    <h3>Sobrenome</h3>
                    <p>{user.sobrenome}</p>
                    <h3>Login</h3>
                    <p>{user.login}</p>
                    <h3>Função</h3>
                    <p>{user.funcao}</p>
                </>
                : 
                <>
                    <h3>Nome</h3>
                    <input type="text" value={editedUser.nome} onChange={(e) => setEditedUser({...editedUser, nome: e.target.value})}/>
                    <h3>Sobrenome</h3>
                    <input type="text" value={editedUser.sobrenome} onChange={(e) => setEditedUser({...editedUser, sobrenome: e.target.value})} />
                    <h3>Login</h3>
                    <input type="text" value={editedUser.login} onChange={(e) => setEditedUser({...editedUser, login: e.target.value})} />
                    <h3>Função</h3>
                    <select onChange={(e) => setEditedUser({...editedUser, funcao: e.target.value})} value={editedUser.funcao}>
                        <option value="Administrador">Administrador</option>
                        <option value="Chefe de Laboratorio">Chefe de Laboratório</option>
                        <option value="Membro">Membro</option>
                    </select>
                    <button className="save" onClick={editUser}>Salvar</button>
                </>
                }
            </div>
        </UserContainer>
    )
}

const Usuarios = () => {
    const [users, setUsers] = useState([])
    const { user } = useContext(UserContext)
    const getUsers = () => {
        const promise = axios.get("https://bd-projeto-back.onrender.com/users")
        promise
        .then(res=> {
            setUsers(res.data)
        })
        .catch(err=> {
            console.log(err)
        })
    }
    
    useEffect(() => {
        if(user.funcao == "Administrador") getUsers()
    }, [user.funcao])

    return(
        <>
        {
            (!user.token || user.funcao != "Administrador") ? 
            <Unauthorized role={"Administrador"}/>
            :
            <Container>
            {users?.map((user, index) => (
                <User user={user} key={index} getUsers={getUsers}/>
            ))}
            </Container>
        }
        </>
    )
}

export default Usuarios;

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    margin-top: 70px;
    padding: 50px;
    box-sizing: border-box;
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`
const UserContainer = styled.div`
    width: 300px;
    height: 160px;
    display: flex;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px;
    position: relative;
    h3{
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 2px;
    }
    p{
        font-size: 15px;
        margin-bottom: 2px;
    }
    input{
        height: 15px;
        font-size: 13px;
    }
    .save{
        color: white;
        background-color: green;
        border: none;
    }
`

const ImgWrapper = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    img{
        height: 90px;
    }
`

const EditDelete = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    gap: 2px;
    button{
        border: none;
        border-radius: 3px;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`