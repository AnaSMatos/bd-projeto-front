import React, {useState, useContext} from "react"
import axios from "axios"
import styled from "styled-components";
import Books from "../../Assets/auth-books.jpeg"
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Unauthorized } from "../Utils/Unauthorized";
import UserContext from "../../UserContext";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [signUpForm, setSignUpForm] = useState({
        nome: "",
        sobrenome: "",
        login: "",
        senha: "",
        funcao: "Administrador",
        uri_foto: "",
    })
    const { user } = useContext(UserContext)

    const handleSignUp = () => {
        setIsLoading(true)
        const promise = axios.post('https://bd-projeto-back.onrender.com/signup', signUpForm)
        promise
        .then(res=>{
            setIsLoading(false)
            toast.success("Usuário criado com sucesso!")
        })
        .catch(err=>{
            console.log(err.response.data)
            toast.error("Erro ao criar um novo usuário. Confirme que todos os campos estão preenchidos")
            setIsLoading(false)
        })
    }

    if(!user.token || !user.funcao == "Administrador") return <Unauthorized role={"Administrador"}/>

    return(
        <PageContainer>
            <Toaster/>
            <ContentContainer>
                <img src={Books} alt="" />
                <div>
                <input type="text" name="nome" placeholder="Nome" value={signUpForm.nome} onChange={(e) => setSignUpForm({...signUpForm, nome: e.target.value})}/>
                <input type="text" name="sobrenome" placeholder="Sobrenome" value={signUpForm.sobrenome} onChange={(e) => setSignUpForm({...signUpForm, sobrenome: e.target.value})}/>
                <input type="email" name="login" placeholder="E-mail" value={signUpForm.login} onChange={(e) => setSignUpForm({...signUpForm, login: e.target.value})}/>
                <input type="password" name="senha" placeholder="Senha" value={signUpForm.senha} onChange={(e) => setSignUpForm({...signUpForm, senha: e.target.value})}/>
                <select onChange={(e) => setSignUpForm({...signUpForm, funcao: e.target.value})} value={signUpForm.funcao}>
                    <option value="Administrador">Administrador</option>
                    <option value="Chefe de Laboratorio">Chefe de Laboratório</option>
                    <option value="Membro">Membro</option>
                </select>
                <input type="url" name="foto" placeholder="Foto (link)" value={signUpForm.uri_foto} onChange={(e) => setSignUpForm({...signUpForm, uri_foto: e.target.value})}/>
                <SubmitButton onClick={handleSignUp}>{isLoading ? "carregando..." : "Criar conta"}</SubmitButton>
            </div>
            </ContentContainer>
        </PageContainer>
    )
}

export default SignUp;

//styles

const PageContainer = styled.div`
    width: 100vw;
    height: calc(100vh - 70px);
    margin-top: 70px;
    background-color: #f3e6d8;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ContentContainer = styled.div`
    width: 1000px;
    height: 600px;
    background-color: #fff;
    border-radius: 40px;
    display: flex;
    position: relative;
    img{
        border-radius: 40px 0 0 40px;
        width: 100%;
        height: 100%;
    }
    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
    }
    input, select{
        width: 300px;
        height: 43px;
        border: 1px solid #cbc6c1;
        margin-bottom: 10px;
        box-sizing: border-box;
        padding: 8px 15px;
        font-size: 18px;
        background-color: #f3efeb
;
        
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
    background: none;
    color: #423237;
    border: 2px solid #423237;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background-color: #f2efea;
    }
`
