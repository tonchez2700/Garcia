import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function reset() {
  navigationRef.current?.reset({
    index: 0,
    routes: [{ name: 'AuthScreen' }], // Reemplaza 'Inicio' con el nombre de tu pantalla de inicio
  });
}