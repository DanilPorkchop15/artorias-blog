import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form";

import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin, selectIsAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isValid
    }} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (values) => {
    const data  = await dispatch(fetchLogin(values))

    if (!data.payload) {
      return alert('Неправильные почта или пароль')
    }
    
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    } else {
      alert('Неправильные почта или пароль')
    }

  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          helperText={errors.email?.message}
          fullWidth
          error={Boolean(errors.email?.message)}
          {...register("email", {required: "Укажите почту"})}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", {required: "Укажите пароль"})}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
