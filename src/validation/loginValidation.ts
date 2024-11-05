import * as Yup from "yup";

const loginValidation = Yup.object().shape({
  telephone: Yup.string()
    .required("Le mot de passe ou numéro est requis")
    .matches(/^\+221[0-9]{9}$/, "Le numéro commençant par +221 suivi de 9 chiffres"),
  password: Yup.string()
    .required("Le mot de passe ou numéro est requis")
    .length(4, "Le mot de passe doit comporter exactement 4 chiffres")
    .matches(/^[0-9]+$/, "syntaxe incorrecte"),
});

export default loginValidation;
