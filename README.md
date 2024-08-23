# InstaStore Challenge

InstaStore is a microservice in charge of selecting the closest "convenience" store to deliver a groceries order to our B2B clients.

## Understanding the Architecture defined

```
instastore/
│
├── src/
│   ├── config/
│   │   ├──  databases/
│   ├── controllers/
│   │   └── index.js
│   ├── middlewares/
│   │   ├── validators/
│   │   └── index.js
│   ├── models/
│   │   └── index.js
│   ├── repositories/
│   │   └── index.js
│   ├── routes/
│   │   └── index.js
│   ├── services/
│   │   └── index.js
│   ├── app.js
│   └── server.js
└── package.json
```

- **Config Folder**: This folder will contain configuration parameters for the project, including environment variables from the .env file and database configurations.
- **Controllers Folder**: This folder will house controllers responsible for receiving and processing incoming requests.
- **Middlewares Folder**: This folder will include middleware functions, such as request parameter validations and error handling.
- **Models Folder**: This folder will include models defines to access to the database
- **Repositories Folder**: This folder will feature repositories that manage database connections using Sequelize.
- **Routes Folder**: This folder will have routes for consuming the exposed services.
- **Services Folder**: This folder will have the services with the business logic and calculate the requirements.
- **App File**: This file will handle the main configuration needed to create the API client.
- **Server File**: This file will execute the necessary code to run the client.

## How it works?

Requirements are:

- PostgreSQL/PostGIS
- Node.js 20+
- Docker (optional)

If you don't have a PostgreSQL instance, you can use the image created with Docker. Once you have Docker installed and running, run the following command:

`docker-compose up -d`

Then, from the client software of your preferred (I use Bveaver), you can connect to the database and create the table, and insert the rows. In the scripts folder, I left the necessary scripts to be used in this challenge.

To execute the API client you need the following steps.

1. Install the dependencies `npm i`
2. Add the .env file using the template in `.env.template`
3. Run the service: `npm start`

#### Calling the service

Once you have the service running, you can use the following URL to get the closest store.

http://localhost:3000/api/stores/closest?latitude=6.246721&longitude=-75.568195

Where `latitude` and `longitude` are the current points of your location.

## Preguntas y Respuestas:

- ¿cual es el alcance esperado? algo orientado a monitoreo/logging que permita tener trazas de las request que se realizan al servicio? o ¿algo como una auditoria propia de forma que se guarde en un BD? ¿Qué información específica se espera registrar de cada llamado?
  R// Necesitamos tener trazabilidad de las peticiones que se le hagan al endpoint y poder diferenciar cada una de alguna forma. El diseño en cuanto a las herramientas e información que se guarde queda de tu lado.

- ¿El cálculo o definición de closest store está basado en un cálculo de línea recta o en el tiempo de viaje estimado?
  R// Hay múltiples maneras de hacer esto y la decisión final de cuál utilizar está en tus manos. De igual forma, me gustaría resaltar que la finalidad de este servicio es entregarle a nuestros clientes una manera de optimizar sus entregas.
- ¿Se tiene algún sistema métrico definido para estas distancias?
  R// No, no tenemos ningún sistema métrico de preferencia.
- ¿Los datos de donde provienen? están almacenados en alguna BD o se obtienen de un servicio externo? Si es de una base de datos que debo definir, ¿Puedo elegir que motor de base de datos usar?
  R// Los datos son provisto por el microservicio, son de su dominio y los puedes almacenar dónde más sentido haga dentro de tu diseño. Si decides guardarlo en una BD, puedes utilizar el motor de tu preferencia.ß
- ¿Que información adicional se tiene de las tiendas como horarios de apertura y cierre?, ¿debemos tener un servicio o forma de modificar estos atributos?
  R// La información adicional sobre la tienda depende del alcance y diseño que definas. Si terminas decidiendo que hace sentido tener un horario de apertura y cierre, no es indispensable tener un servicio o forma de modificarlos
- ¿Existen algunos requisitos específicos como cifrado de datos en tránsito?
  R// No, no existe algún requisito específico más allá de la respuesta en menos de 300ms

## Time to deliver

This challenge will be delivered on Friday 10am, August 23, 2024.

## Improvements and trade offs

1. What would you improve from your code? why?
   - A// At the functional requirements level, I would improve the way of calculating the best distance taking into account the distribution of the city instead of doing a geodesic calculation, which would increase the precision of the nearest store. On the non-functional side, I would improve error handling, so that a greater number of possible errors that may occur during execution can be controlled. And finally, I would include a security layer using some strategy such as API keys.
2. Which trade-offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?
   - A// I would spend less time implementing unit tests and/or sacrifice a little response times, so that the precision in the calculations of the nearest store can be improved.
3. Do you think your service is secure? why?
   - A// At the endpoint level, there is a control that prevents SQL injections since the parameters that reach the service are validated. However, to increase the trust and security of the service, I would implement an API keys strategy, which allows having a level of authorization for the exposed service.
4. What would you do to measure the behavior of your product in a production environment?
   - A// I would implement a monitoring system such as APM, NewRelic or similar tools, so that I can check in real time what the behavior of the service is. Additionally, I would perform stress tests to know what the capacity of the service is and what its possible limits are.
