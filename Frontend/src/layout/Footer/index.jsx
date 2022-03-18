import React from 'react';
import './styles.scss';
import {
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  WhatsApp
} from '@mui/icons-material';


export const Footer = () => {
  return (
    <footer className='footer'>
      <p>Copyright &copy; 2021, Todos os direitos reservados </p>
      <ul>
        <li>
          <a href="https://github.com/Lucas-Braz7x">
            <GitHub sx={{ color: "#000" }} />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/lucas-braz-dutra">
            <LinkedIn sx={{ color: "#0e76a8" }} />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/tchubiross/">
            <Instagram sx={{ color: "#dd2a7b" }} />
          </a>
        </li>
        <li>
          <a href="#">
            <Facebook sx={{ color: "#3b5999" }} />
          </a>
        </li>
        <li>
          <a href="#">
            <WhatsApp sx={{ color: "#00bb2d" }} />
          </a>
        </li>
      </ul>
    </footer>
  )
}
