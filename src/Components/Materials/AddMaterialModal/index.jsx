import React, {useState, useContext} from "react";
import { GenericModal } from '../../Utils/Modal'
import styled from "styled-components";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import UserContext from "../../../UserContext";

export const AddMaterialModal = ({modalIsOpen, closeModal, getMaterials}) => {
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useContext(UserContext)

    const [materialForm, setMaterialForm] = useState({
        descricao: null, 
        categoria: null, 
        numero_serie: null, 
        data_aquisicao: null, 
        estado_conservacao: null, 
        localizacao_fisica: null, 
        uri_foto: null
    })
    
    const successNotify = () => toast.success('Material adicionado com sucesso');
    const errorNotify = () => toast.error('Erro ao adicionar material. Confira se todos os campos foram preenchidos corretamente');
    
    const submitNewMaterial = () => {
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        const promise = axios.post('https://bd-projeto-back.onrender.com/materials', materialForm, config)
        promise
        .then(res=>{
            successNotify()
            closeModal()
            setMaterialForm({
                descricao: null, 
                categoria: null, 
                numero_serie: null, 
                data_aquisicao: null, 
                estado_conservacao: null, 
                localizacao_fisica: null, 
                uri_foto: null
            })
            getMaterials()
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
            <ModalTitle>Adicionar material</ModalTitle>
            <FormContainer>
                <p>Descrição</p>
                <input 
                type="text" name="descricao" placeholder="Descrição" 
                value={materialForm.descricao} 
                onChange={(e) => setMaterialForm({...materialForm, descricao: e.target.value})}/>
                <p>Categoria</p>
                <input 
                type="text" name="categoria" placeholder="Categoria" 
                value={materialForm.categoria} 
                onChange={(e) => setMaterialForm({...materialForm, categoria: e.target.value})}/>
                <p>Número de série</p>
                <input 
                type="number" name="numero_serie" id="" placeholder="Número de série" 
                value={materialForm.numero_serie} 
                onChange={(e) => setMaterialForm({...materialForm, numero_serie: e.target.value})}/>
                <p>Data da aquisição</p>
                <input type="date" name="data_aquisicao" id=""
                value={materialForm.data_aquisicao} 
                onChange={(e) => setMaterialForm({...materialForm, data_aquisicao: e.target.value})}/>
                <p>Estado de conservação</p>
                <input 
                type="text" name="estado_conservacao" id="" placeholder="Estado de conservação" 
                value={materialForm.estado_conservacao} 
                onChange={(e) => setMaterialForm({...materialForm, estado_conservacao: e.target.value})}/>
                <p>Localização</p>
                <input 
                type="text" name="localizacao_fisica" id="" placeholder="Localização" 
                value={materialForm.localizacao_fisica} 
                onChange={(e) => setMaterialForm({...materialForm, localizacao_fisica: e.target.value})}/>
                <p>URL da imagem da capa</p>
                <input type="text" name="uri_foto" id=""  placeholder="URL da imagem da capa"
                value={materialForm.uri_foto} 
                onChange={(e) => setMaterialForm({...materialForm, uri_foto: e.target.value})}/>
                <SubmitButton onClick={submitNewMaterial} disabled={isLoading}>Adicionar Material</SubmitButton>
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