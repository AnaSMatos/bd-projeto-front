import React, {useState, useEffect, useContext} from "react";
import UserContext from "../../UserContext";
import styled from "styled-components";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../Utils/Loading";
import axios from "axios";

const Emprestimos = () => {
    const {user} = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const [loan, setLoan] = useState([])

    const getLoans = () => {
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

        const promise = axios.get(`https://bd-projeto-back.onrender.com/loans?id=${user.id}`, config)
        promise
        .then(res=>{
            setIsLoading(false)
            setLoan(res.data)
        })
        .catch(err=>{
            console.log(err.response.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getLoans()
    }, [])

    const returnItem = (loan) => {
        const config = {
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        }

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
            setIsLoading(false)
            getLoans()
        })
        .catch(err=>{
            console.log(err.response.data)
            setIsLoading(false)
        })
    }

    return(
        <Container>
            {isLoading ? 
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
                            <Buttons>
                                <button onClick={() => returnItem(item)}>Devolver</button>
                                <button>Renovar</button>
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
        margin-bottom: 8px;
        font-size: 18px;
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