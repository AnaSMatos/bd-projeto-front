import React, {useState, useContext} from "react";
import { GenericModal } from '../../Utils/Modal'
import styled from "styled-components";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import UserContext from "../../../UserContext";

export const AddBookModal = ({modalIsOpen, closeModal}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useContext(UserContext)

    const [bookForm, setBookForm] = useState({
        isbn: null, 
        titulo: null, 
        autor: null, 
        descricao: null, 
        categoria: null, 
        data_aquisicao: null, 
        estado_conservacao: null, 
        localizacao_fisica: null, 
        uri_capa: null
    })
    
    const successNotify = () => toast.success('Livro adicionado com sucesso');
    const errorNotify = () => toast.error('Erro ao adicionar livro. Confira se todos os campos foram preenchidos corretamente');
    
    const submitNewBook = () => {
        setIsLoading(true)
        if(!user.token){
            return toast.error('Você precisa estar logado para adicionar um livro')
        }
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }
        const promise = axios.post('https://bd-projeto-back.onrender.com/books', bookForm, config)
        promise
        .then(res=>{
            successNotify()
            setIsLoading(false)
        })
        .catch(err=>{
            errorNotify()
            console.log(err.response.data)
            setIsLoading(false)
        })
    }

    return(
        <GenericModal modalIsOpen={modalIsOpen} closeModal={closeModal}>
            <Toaster/>
            <ModalTitle>Adicionar livro</ModalTitle>
            <FormContainer>
                <p>ISBN</p>
                <input 
                type="number" name="isbn" id="" placeholder="ISBN" 
                value={bookForm.isbn} 
                onChange={(e) => setBookForm({...bookForm, isbn: e.target.value})}/>
                <p>Título</p>
                <input type="text" name="titulo" id=""  placeholder="Título" 
                value={bookForm.titulo} 
                onChange={(e) => setBookForm({...bookForm, titulo: e.target.value})}/>
                <p>Autor</p>
                <input type="text" name="autor" id=""  placeholder="Autor" 
                value={bookForm.autor} 
                onChange={(e) => setBookForm({...bookForm, autor: e.target.value})}/>
                <p>Descrição</p>
                <input type="text" name="descricao" id=""  placeholder="Descrição" 
                value={bookForm.descricao} 
                onChange={(e) => setBookForm({...bookForm, descricao: e.target.value})}/>
                <p>Categoria</p>
                <input type="text" name="categoria" id=""  placeholder="Categoria"
                value={bookForm.categoria} 
                onChange={(e) => setBookForm({...bookForm, categoria: e.target.value})}/>
                <p>Data da aquisição</p>
                <input type="date" name="data_aquisicao" id=""
                value={bookForm.data_aquisicao} 
                onChange={(e) => setBookForm({...bookForm, data_aquisicao: e.target.value})}/>
                <p>Estado de conservação</p>
                <input type="text" name="estado_conservacao" id=""  placeholder="Estado de conservação"
                value={bookForm.estado_conservacao} 
                onChange={(e) => setBookForm({...bookForm, estado_conservacao: e.target.value})}/>
                <p>Localização física</p>
                <input type="text" name="localizacao_fisica" id=""  placeholder="Localização física"
                value={bookForm.localizacao_fisica} 
                onChange={(e) => setBookForm({...bookForm, localizacao_fisica: e.target.value})}/>
                <p>URL da imagem da capa</p>
                <input type="text" name="uri_capa" id=""  placeholder="URL da imagem da capa"
                value={bookForm.uri_capa} 
                onChange={(e) => setBookForm({...bookForm, uri_capa: e.target.value})}/>
                <SubmitButton onClick={submitNewBook} disabled={isLoading}>Adicionar livro</SubmitButton>
            </FormContainer>
        </GenericModal>
    )
}

//styles


const ModalTitle = styled.div`
    width:100%;
    color: #423237;
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    p{
        width: 250px;
        text-align: left;
        color: #423237;
        font-size: 15px;
        margin-bottom: 4px;
    }
    input{
        width: 250px;
        height: 25px;
        border: 1px solid #cbc6c1;
        margin-bottom: 10px;
        box-sizing: border-box;
        padding: 8px 15px;
        font-size: 15px;
        background-color: #f3efeb;
        &:focus{
            outline: 1.2px solid #cbc6c1;
        }
    }
`

const SubmitButton = styled.button`
    width: 140px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    font-size: 18px;
    background-color: #1da138;
    color: #fff;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    &:hover{
        background-color: #16852c;
    }
`