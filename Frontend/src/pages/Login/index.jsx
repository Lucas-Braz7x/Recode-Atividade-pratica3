import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button, mostrarMensagem } from '../../components';
import { api, registrarToken } from '../../service/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as yup from 'yup';
import Lottie from 'lottie-react';
import animationData from '../../assets/animation/login-animate.json';
import "./styles.scss";
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';


export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const history = useNavigate();

  const handleSubmit = value => {
    try {
      userLogin(value);
    } catch (error) {
      mostrarMensagem("error", error, "Falha ao autenticar usuário")
      console.log(error);
    }
  }

  const userLogin = value => {
    api.post("/usuario/login", {
      "email": value.email,
      "senha": value.senha
    })
      .then((response) => {
        salvarLocal(response.data);
        console.log('salva')
        mostrarMensagem("success", "Usuário autenticado com sucesso: ", "Bem-vindo!")

        history('/');
      })
      .catch(e => {
        mostrarMensagem("error", e.response.data, "Falha ao autenticar usuário")
      });
  }

  const salvarLocal = (token) => {
    registrarToken(token);
    localStorage.setItem("USUARIO_LOGADO", token);
  }


  const validations = yup.object().shape({
    senha: yup.string().min(3).max(20).required(),
    email: yup.string().email().required(),
  })

  return (
    <main>
      <Lottie
        className="animacao"
        animationData={animationData}
        loop={true}
      />
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validations}
      >
        <Form>
          <span>
            Entre e confira as melhores ofertas de viagens
          </span>
          <div className="grupo_formulario">
            <Field type="email" placeholder="Digite o seu email" name="email" />
            <ErrorMessage name='email' />
          </div>

          <div className="grupo_formulario">
            <Field
              leng
              type={passwordVisible ? `text` : `password`}
              placeholder="Digite a sua senha" name="senha" />
            <ErrorMessage component="span" name='senha' />

            <div onClick={() => setPasswordVisible(s => !s)}>
              {passwordVisible ? <Visibility sx={{ color: "#ffffff" }} /> : <VisibilityOff sx={{ color: "#ffffff" }} />}
            </div>

          </div>
          <Button type='submit'>Logar</Button>
        </Form>
      </Formik>
    </main>
  )
}
