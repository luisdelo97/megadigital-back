# Megadigital Backend

Este proyecto es el backend para la prueba técnica de Megadigital, diseñado para manejar las operaciones CRUD para una aplicación específica. Está construido con Node.js y Express, utilizando Sequelize para la interacción con la base de datos MySQL.

## Tecnologías Utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- Cors
- Dotenv

## Configuración Inicial

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**

```bash
git clone <URL del repositorio>
```

2. **Instalar las dependencias:**

Dentro del directorio del proyecto, ejecuta:

```bash
npm install
```

3. **Configuración de Variables de Entorno:**

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

```env
DATABASE=<Nombre de tu base de datos>
USERNAME_DB=<Tu usuario de la base de datos>
PASSWORD_DB=<Tu contraseña de la base de datos>
HOST_DB=<Host de tu base de datos>
PORT=<Puerto en el que se ejecutará tu servidor, por defecto 4000>
FRONTEND_URL=<URL de tu frontend>
```

4. **Ejecutar el proyecto:**

Para iniciar el servidor en modo desarrollo, utiliza:

```bash
npm run dev
```

Para un entorno de producción, puedes usar:

```bash
npm start
```

## Uso

El servidor estará disponible en `http://localhost:<PORT>` donde `<PORT>` es el puerto configurado en tu archivo `.env`.

### Endpoints

Descripción de algunos endpoints disponibles:

- `GET /api/reservas` - Obtiene todas las reservas.
- `POST /api/reservas` - Crea una nueva reserva.
- `PUT /api/reservas/:id` - Actualiza una reserva existente.
- `DELETE /api/reservas/:id` - Elimina una reserva.

Asegúrate de revisar el archivo de rutas para más detalles.

## Licencia

Este proyecto está bajo la licencia ISC.

```
Este contenido incluye instrucciones para clonar el repositorio, instalar dependencias, configurar variables de entorno, ejecutar el proyecto, y una breve descripción de los endpoints.'
```
