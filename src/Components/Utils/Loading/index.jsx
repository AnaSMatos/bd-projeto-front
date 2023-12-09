import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import styled from 'styled-components'

const Loading = () => {
    return(
        <LoadingContainer>
            <ThreeDots 
                height="100" 
                width="100" 
                radius="9"
                color="gray" 
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </LoadingContainer>
    )
}

export default Loading;

//styled

const LoadingContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`