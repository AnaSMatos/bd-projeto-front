import React, {useState} from "react";
import styled from "styled-components";
import Books from "../../Assets/auth-books.jpeg"
import axios from "axios";


const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [signInForm, setSignInForm] = useState({
        login: "",
        senha: ""
    })

    const handleLogin = () => {
        setIsLoading(true)
        const promise = axios.post('https://bd-projeto-back.onrender.com/signin', signInForm)
        promise
        .then(res=>{
            console.log(res.data)
            setIsLoading(false)
        })
        .catch(err=>{
            console.log(err.response.data)
            setIsLoading(false)
        })
    }

    return(
        <div>
            <input type="email" name="email" placeholder="E-mail" value={signInForm.login} onChange={(e) => setSignInForm({...signInForm, login: e.target.value})}/>
            <input type="password" name="password" placeholder="Senha" value={signInForm.senha} onChange={(e) => setSignInForm({...signInForm, senha: e.target.value})}/>
            <SubmitButton onClick={handleLogin}>{isLoading ? "carregando..." : "Logar"}</SubmitButton>
        </div>
    )

}
  

const Autentication = () => {   

    return(
        <PageContainer>
            <ContentContainer>
                <img src={Books} alt="" />
                <Login/>
            </ContentContainer>
        </PageContainer>
    )
}

export default Autentication

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
    background: none;
    color: #423237;
    border: 2px solid #423237;
    border-radius: 5px;
    cursor: pointer;
    &:hover{
        background-color: #f2efea;
    }
`
