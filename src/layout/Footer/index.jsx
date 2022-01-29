import React from 'react';
import styles from './style.module.css';


export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; 2021, Todos os direitos reservados </p>
      <ul>
        <li>
          <a href="https://github.com/Lucas-Braz7x">
            <img src="./assets/github.svg" alt="Link para o github" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/lucas-braz-dutra">
            <img src="./assets/linkedin.svg" alt="Link para o linkedin" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/tchubiross/">
            <img src="./assets/instagram.svg" alt="Link para o instagram" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="./assets/facebook.svg" alt="Link para o facebook" />
          </a>
        </li>
        <li>
          <a href="#">
            <img src="./assets/whatsapp.svg" alt="Link para o whatsapp" />
          </a>
        </li>
      </ul>
    </footer>
  )
}
