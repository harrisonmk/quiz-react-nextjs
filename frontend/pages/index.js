import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/componentes/Widget';
import QuizLogo from '../src/componentes/QuizLogo'
import Footer from "../src/componentes/Footer";
import GitHubCorner from "../src/componentes/GitHubCorner";
import QuizBackground from "../src/componentes/QuizBackground";
import Head from 'next/head';
import {useRouter} from "next/router";
import Input from "../src/componentes/Input";
import Button from "../src/componentes/Button";


const BackgroundImage = styled.div`

  background-image: url(${db.bg});
  flex: 1;
  background-size: cover;
  background-position: center;

`;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;


export default function Home() {

    const rota = useRouter();
    const [nome, setNome] = React.useState('');

    return (

        <QuizBackground backgroundImage={db.bg}>
            <Head>
                <title>Quiz - Modelo Base</title>
            </Head>
            <QuizContainer>
                <QuizLogo/>
                <Widget>
                    <Widget.Header>


                        <h1>Java</h1>

                    </Widget.Header>

                    <Widget.Content>

                        <form onSubmit={function (event) {

                            event.preventDefault();

                            rota.push(`/quiz?name=${nome}`);
                        }}>
                            <Input name="nomeDoUsuario" onChange={(event) => {
                                setNome(event.target.value)
                            }}
                                   placeholder="Diz ai seu nome" value={nome}/>

                            <Button type="submit" disabled={nome.length === 0}>
                                {`Jogar ${nome}`}
                            </Button>
                        </form>

                        <p>{db.description}</p>
                    </Widget.Content>
                </Widget>


                <Widget>
                    <Widget.Header>
                        <h1> Quizes da Galera </h1>
                    </Widget.Header>


                    <Widget.Content>
                        <p>lorem ipsum dolor sit amet...</p>
                    </Widget.Content>
                </Widget>
                <Footer/>


            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/harrisonmk"/>
        </QuizBackground>


    )
}
