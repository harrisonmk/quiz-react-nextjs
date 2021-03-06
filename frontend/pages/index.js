import React from 'react';
import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/componentes/Widget';
import QuizLogo from '../src/componentes/QuizLogo'
import Footer from "../src/componentes/Footer";
import GitHubCorner from "../src/componentes/GitHubCorner";
import QuizBackground from "../src/componentes/QuizBackground";
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from '../src/componentes/Link';
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
                <Widget as={motion.section}
                        transition={{ delay: 0, duration: 0.5 }}
                        variants={{
                            show: { opacity: 1, y: '0' },
                            hidden: { opacity: 0, y: '100%' },
                        }}
                        initial="hidden"
                        animate="show">

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


                <Widget as={motion.section}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        variants={{
                            show: { opacity: 1 },
                            hidden: { opacity: 0 },
                        }}
                        initial="hidden"
                        animate="show">

                    <Widget.Content>

                        <h1> Quizes da Galera </h1>
                        <ul>
                            {db.external.map((linkExterno) => {
                                const [projectName, githubUser] = linkExterno
                                    .replace(/\//g, '')
                                    .replace('https:', '')
                                    .replace('.vercel.app', '')
                                    .split('.');

                                return (
                                    <li key={linkExterno}>
                                        <Widget.Topic
                                            as={Link}
                                            href={`/quiz/${projectName}___${githubUser}`}
                                        >
                                            {`${projectName}`}
                                        </Widget.Topic>
                                    </li>
                                );
                            })}
                        </ul>


                    </Widget.Content>
                </Widget>
                <Footer as={motion.footer}
                        transition={{delay: 0.5, duration: 0.5}}
                        variants={{
                            show: {opacity: 1},
                            hidden: {opacity: 0},
                        }}
                        initial="hidden"
                        animate="show"
                />


            </QuizContainer>
            <GitHubCorner projectUrl="https://github.com/harrisonmk"/>
        </QuizBackground>


    )
}
