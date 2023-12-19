import React, {useState, useEffect, useContext} from "react";
import UserContext from "../../UserContext";
import styled from "styled-components";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../Utils/Loading";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner'
import { formatDateToString } from "../Utils/formatDate";
import {Unauthorized} from '../Utils/Unauthorized'


const Emprestimos = () => {
    const {user} = useContext(UserContext)
    const [isLoadingPage, setIsLoadingPage] = useState(false)
    const [isLoadingFunction, setIsLoadingFunction] = useState(false)
    const [loan, setLoan] = useState([])

    const LoadingFunction = () => {
        return(
            <ThreeDots 
                height="15" 
                width="30" 
                radius="9"
                color="gray" 
                ariaLabel="three-dots-loading"
                visible={true}
            />
        )
    }

    const config = {
        headers:{
            Authorization: `Bearer ${user.token}`
        }
    }

    const getLoans = () => {
        setIsLoadingPage(true)
        const promise = axios.get(`https://bd-projeto-back.onrender.com/loans?id=${user.id}`, config)
        promise
        .then(res=>{
            setIsLoadingPage(false)
            setLoan(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
            setIsLoadingPage(false)
        })
    }

    useEffect(() => {
        getLoans()
    }, [])

    const getFormattedDate = (loan) => {
        let returnDate = new Date(loan.data_devolucao_prevista);
        returnDate.setDate(returnDate.getDate() + 1);
        return formatDateToString(returnDate).displayFormat
    }

    const renewLoan = (loan) => {
        let returnDate = new Date(loan.data_devolucao_prevista);
        returnDate.setDate(returnDate.getDate() + 7);

        const formattedNewDate = formatDateToString(returnDate)

        const params = {
            loan_id: loan.id,
            delivery_date: formattedNewDate.databaseFormat
        }
        const promise = axios.post(`https://bd-projeto-back.onrender.com/renew`, params, config)
        promise
        .then(res => {
            setIsLoadingFunction(false)
            toast.success(`Empréstimo renovado até dia ${formattedNewDate.displayFormat}`)
            getLoans()
        })
        .catch(err => {
            console.log(err.response.data)
            toast.error("Erro ao renovar o item.")
            setIsLoadingFunction(false)
        })
    }

    const returnItem = (loan) => {
        setIsLoadingFunction(true)
        const parseParameters = () => {
            const parsedLivro = loan.id_livro ? parseInt(loan.id_livro) : null
            const parsedMaterial = loan.id_material_didatico ? parseInt(loan.id_material_didatico) : null
            return {
                id_emprestimo: loan.id,
                id_livro: parsedLivro,
                id_material_didatico: parsedMaterial
            }
        }

        const params = parseParameters()

        const promise = axios.post(`https://bd-projeto-back.onrender.com/return`, params, config)
        promise
        .then(res=>{
            setIsLoadingFunction(false)
            toast.success("Item devolvido!")
            getLoans()
        })
        .catch(err=>{
            console.log(err.response.data)
            toast.error("Erro ao devolver item.")
            setIsLoadingFunction(false)
        })
    }

    if(!user.token) return <Unauthorized/>

    return(
        <Container>
            <Toaster/>
            {isLoadingPage ? 
            <Loading/> 
            : 
            <LoansContainer>
                {loan?.map((item, index) => (
                    <>
                    {item.status != "Concluído" ? 
                    <Loan key={index}>
                        <img src={item.uri_capa} alt="" />
                        <div>
                            <h3>Nome:</h3>
                            <p>{item.item_nome}</p>
                            <h3>Autor/Categoria:</h3>
                            <p>{item.item_autor}</p>
                            <h3>Data de devolução:</h3>
                            <p>{getFormattedDate(item)}</p>
                            <Buttons>
                                {isLoadingFunction ? <LoadingFunction/> : 
                                <>
                                    <button onClick={() => returnItem(item)}>Devolver</button>
                                    <button onClick={() => renewLoan(item)}>Renovar</button>
                                </>
                                }
                            </Buttons>
                        </div>
                    </Loan>
                    :
                    <></>
                    }
                    </>
                ))}
            </LoansContainer>
            }
        </Container>
    )
}

export default Emprestimos;

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    margin-top: 70px;
`

const LoansContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 50px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
`

const Loan = styled.div`
    width: 400px;
    height: 200px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
    display: flex;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    h3{
        font-weight: 600;
        margin-bottom: 5px;
        font-size: 17px;
    }
    p{
        margin-bottom: 8px;
    }
    img{
        height: 170px;
    }
    &>div{
        margin-left: 20px;
        height: 100%;
    }
`

const Buttons = styled.div`
    display: flex;
    margin-top: 15px;
    gap: 7px;
    button{
        background-color: #3694CC;
        border: none;
        border-radius: 5px;
        color: #fff;
        padding: 6px;
        cursor: pointer;
    }
`