import { Loading, Notify } from 'quasar';

export default ({ app }) => {
  app.config.globalProperties.$loading = (message = 'Cargando...') => {
    Loading.show({
      spinner: false,
      message: `<img style="width: 50%" alt="Logo Salud" src="https://elpacientecolombiano.com/wp-content/uploads/2015/09/LOGO-SALUD-MORADO.png"><br/>${message}`,
      html: true,
      messageColor: 'white'
    });
  };
  app.config.globalProperties.$notify = (options, actions = null) => {
    Notify.create({
      ...options,
      actions
    });
  };
  app.config.globalProperties.$messageValidate = {
    message: 'Revisa las validaciones',
    color: 'warning',
    position: 'top-right',
    icon: 'warning',
    timeout: 5000
  };
  app.config.globalProperties.$isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
};