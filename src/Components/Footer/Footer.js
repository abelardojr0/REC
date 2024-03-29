import React from "react";
import {
  FooterComponent,
  FooterLogo,
  FooterSociais,
  FooterTexto,
  SociaisImg,
} from "./StyleFooter";
import logo from "../../Images/logo.png";
import instagram from "../../Images/instagram.png";
import whatsapp from "../../Images/whatsapp.png";
import facebook from "../../Images/facebook.png";

const Footer = () => {
  return (
    <>
      <FooterComponent>
        <FooterLogo src={logo} alt="logo" />
        <FooterTexto>
          2023 <sup>©</sup> REC, Alguns direitos reservados.
        </FooterTexto>
        <FooterSociais>
          <SociaisImg src={instagram} alt="instagram" />
          <SociaisImg src={whatsapp} alt="whatsapp" />
          <SociaisImg src={facebook} alt="facebook" />
        </FooterSociais>
      </FooterComponent>
    </>
  );
};
export default Footer;
