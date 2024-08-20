import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useForm} from "react-hook-form";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  const onSubmit =  (values) => {
    console.log(values)
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}><TextField
        className={styles.field}
        label="Полное имя"
        fullWidth
        {...register('fullName', {required: 'Укажите полное имя'})}
        error={Boolean(errors.fullName)}
        helperText={errors.fullName?.message}
      />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          {...register('email', {required: 'Укажите почту'})}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          {...register('password', {required: 'Укажите пароль'})}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button></form>
    </Paper>
  );
};
