import React, {useState} from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal'
import { formatDateToString } from "../../Utils/formatDate";
import { useContext } from "react";
import UserContext from "../../../UserContext";
import { useNavigate } from "react-router-dom";

const EditMaterial = ({material}) => {
    const [editedMaterial, setEditedMaterial] = useState({...material})
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const config = {
        headers:{
            Authorization: `Bearer ${user.token}`
        }
    }

    const editMaterial = () => {
        const promise = axios.put('https://bd-projeto-back.onrender.com/materials', editedMaterial, config)
        promise
        .then(res=>{
            navigate('/materiais')
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    }

    return(
        <MaterialInfo>
            <img src={material.uri_foto} alt="Capa do material" />
            <div>
                <h2>Descrição:</h2>
                <input type="text" name="" value={editedMaterial?.descricao} onChange={(e) => {setEditedMaterial({...editedMaterial, descricao: e.target.value})}} />
                <h2>Categoria:</h2>
                <input type="text" name="" value={editedMaterial?.categoria} onChange={(e) => {setEditedMaterial({...editedMaterial, categoria: e.target.value})}} />
                <h2>Localização:</h2>
                <input type="text" name="" value={editedMaterial?.localizacao_fisica} onChange={(e) => {setEditedMaterial({...editedMaterial, localizacao_fisica: e.target.value})}} />
                <h2>Estado de conservação:</h2>
                <input type="text" name="" value={editedMaterial?.estado_conservacao} onChange={(e) => {setEditedMaterial({...editedMaterial, estado_conservacao: e.target.value})}} />
                <SubmitButton available onClick={editMaterial}>Salvar edição</SubmitButton>
            </div>
        </MaterialInfo>
    )
}

const RentModal = ({modalIsOpen, closeModal, material}) => {
    const {user} = useContext(UserContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '170px',
          overflow: 'auto',
          padding: '15px',
          position: 'relative',
        },
      };

      const today = new Date()
      let returnDate = new Date(today);
      returnDate.setDate(today.getDate() + 7);

      const formattedReturnDate = formatDateToString(returnDate).displayFormat

      const successNotify = () => toast.success('Livro alugado com sucesso!');
      const errorNotify = () => toast.error('Erro ao alugar livro');

      const handleRentMaterial = () => {
        if(!user.token || !user.id){
            return toast.error("Você deve estar logado para alugar um livro")
        }
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        const params = {
            id_usuario: user.id,
            id_livro: null,
            id_material_didatico: material.id,
            data_devolucao_prevista: formatDateToString(returnDate).databaseFormat,
            tipo_item: "material"
        }

        const promise = axios.post('https://bd-projeto-back.onrender.com/loan', params, config)
        promise
        .then(res=>{
            setIsLoading(false)
            closeModal()
            successNotify()
            navigate('/materiais')
        })
        .catch(err=>{
            errorNotify()
            console.log(err.response.data)
            setIsLoading(false)
        })
      }

      
    return(
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <CloseButton onClick={closeModal}>
                <i className="fa-solid fa-xmark"></i>
            </CloseButton>
            <ModalTitle>{material.material}</ModalTitle>
            <p>Deseja confirmar o aluguel do material <span style={{fontWeight: 600}}>{material.descricao}</span> até a data <span style={{fontWeight: 600}}>{formattedReturnDate}</span>?</p>
            <Buttons>
                {isLoading ?
                <p>Carregando...</p> 
                : 
                <>
                    <button className="cancel" disabled={isLoading} onClick={closeModal}>Cancelar</button>
                    <button className="confirm" disabled={isLoading} onClick={handleRentMaterial}>Confirmar</button>
                </>
                }
            </Buttons>
        </Modal>
    )
}

const MaterialDetails = () => {
    const location = useLocation();
    const material = location.state.material;
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const deleteItem = () => {
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        const promise = axios.delete(`https://bd-projeto-back.onrender.com/materials?id=${material.id}`, config)
        promise
        .then(res=>{
            closeModal()
            navigate('/materiais')
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    }

    const errorNotify = () => toast.error('O livro não se encontra disponível para aluguel');
    
    return (
        <Container>
            <RentModal modalIsOpen={modalIsOpen} closeModal={closeModal} material={material}/>
            <Toaster/>
            {user.funcao == 'Chefe de Laboratorio' &&
            <EditDelete>
                <button className="edit" onClick={() => setEditMode(!editMode)}>
                    <i class="fa-solid fa-pen" title="Editar"></i>
                </button>
                <button className="delete" title="Deletar" onClick={deleteItem}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </EditDelete>
            }
            <MaterialTitle>{material.descricao}</MaterialTitle>
            {editMode ? <EditMaterial material={material}/> :
            <MaterialInfo>
                <img src={material.uri_foto} alt="Capa do livro" />
                <div>
                    <h2>Descrição:</h2><p>{material?.descricao}</p>
                    <h2>Categoria:</h2><p>{material?.categoria}</p>
                    <h2>Localização:</h2><p>{material?.localizacao_fisica}</p>
                    <h2>Estado de conservação:</h2><p>{material?.estado_conservacao}</p>
                    <h2>Disponibilidade:</h2><p>{material?.is_available ? "Disponível" : "Indisponível"}</p>
                </div>
            </MaterialInfo>
            }
            <SubmitButton 
                available={material.is_available}
                onClick={!material.is_available ? errorNotify : openModal}
            >
                Alugar material
            </SubmitButton>
        </Container>
    )
}

export default MaterialDetails;

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    margin-top: 70px;
    padding: 30px;
    position: relative;
`

const MaterialTitle = styled.div`
    width:100%;
    color: #423237;
    font-size: 20px;
    font-weight: 600;
`

const MaterialInfo = styled.div`
    display: flex;
    margin-top: 15px;
    img{
        width: 240px;
    }
    div{
        margin-left: 30px;
        h2{
            font-weight: 600;
            font-size: 20px;
            margin-bottom: 8px;
        }
        p{
            font-weight: 500;
            font-size: 16px;
            margin-bottom: 10px;
        }
    }
    input{
        width: 250px;
        height: 25px;
        margin-bottom: 10px;
    }
`

const SubmitButton = styled.button`
    width: 240px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    font-size: 18px;
    background-color: ${({available}) => available ? "#1da138" : "#ce1f00"};
    color: #fff;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    &:hover{
        background-color: ${({available}) => available ? "#1da138" : "#ce1f00"};
    }
`

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: gray;
`

const ModalTitle = styled.div`
    width:100%;
    color: #423237;
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0 20px 0;
`

const Buttons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    gap: 20px;
    button{
        width: 100px;
        height: 35px;
        border: none;
        border-radius: 5px;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
    }
    .confirm{
        background-color: #1da138;
    }
    .cancel{
        background-color: #ce1f00;
    }
`

const EditDelete = styled.div`
    width: 200px;
    height: 30px;
    display: flex;
    position: absolute;
    right: 200px;
    top: 30px;
    gap: 15px;
    button{
        width: 40px;
        height: 30px;
        border: none;
        border-radius: 3px;
        color: white;
        cursor: pointer;
    }
    .edit{
        background-color: #3694CC;
    }
    .delete{
        background-color: #b31c00;
    }
`

