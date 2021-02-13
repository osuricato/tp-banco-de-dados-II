import React, {useRef, useCallback} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiLock } from "react-icons/fi";
import * as Yup from 'yup';

import Button from '../../components/Button/index'
import InputForm from '../../components/InputForm';

import {
  ContentContainer,
  Content,
  BackButton,
  FormContainer,
  ForgotPasswordContainer,
  ButtonContainer
} from './styles';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória.'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await signIn({
        //   email: data.email,
        //   password: data.password,
        // });

        history.push('/home');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          console.log(error)
        }
      }
    },
    [history],
  );

  return (
    <>
      <ContentContainer>
        <Content>
          <BackButton>
            <Link to="/">
              <span>
                <FiArrowLeft
                  size={40}
                  color={'#3D3D4D'}
                />
              </span>
            </Link>
          </BackButton>

          <h1>Estamos quase lá.</h1>

          <h3>
            Faça seu login para começar <br/>
            uma experiência incrível.
          </h3>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormContainer>
            <InputForm
                name="email"
                type="email"
                icon={FiMail}
                required={true}
                labelName="Email"
                placeholder="Email"
              />
                
              <InputForm
                name="password"
                type="password"
                icon={FiLock}
                required={true}
                labelName="Senha"
                placeholder="Senha"
              />

              <ForgotPasswordContainer>
                <Link to='#'>
                  Esqueci minha senha
                </Link>
              </ForgotPasswordContainer>
              
              <ButtonContainer>
                <Button type="submit">Entrar</Button>
              </ButtonContainer>
            </FormContainer>
          </Form>
        </Content>
      </ContentContainer>
    </>
  );
};
export default Login;