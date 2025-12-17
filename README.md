# 📄 ClicOh App - Gestor de Tareas

¡Bienvenido al repositorio de **Clic Oh App**! Este proyecto es una aplicación de gestión de tareas (To-Do List) moderna, diseñada para ser intuitiva, rápida y mantenible. Ha sido desarrollada como parte de una prueba técnica, enfocándose en la calidad del código, la experiencia de usuario y una arquitectura escalable.

## 🚀 ¿Qué hace el proyecto?

Esta aplicación permite a los usuarios gestionar sus tareas diarias de manera eficiente.

**Funcionalidades principales:**

- **Crear tareas:** Agrega nuevas tareas con un título y una descripción detallada.
- **Gestión de estado:** Marca tareas como completadas o pendientes con un simple clic.
- **Filtrado:** Visualiza todas las tareas, solo las activas o las completadas mediante pestañas intuitivas.
- **Edición y Eliminación:** Modifica el contenido de una tarea o elimínala si ya no es necesaria.
- **Contadores:** Visualiza rápidamente cuántas tareas tienes pendientes y completadas.

## 🛠️ Stack Tecnológico

He seleccionado tecnologías modernas que garantizan un desarrollo ágil y un producto final robusto:

- **[Next.js 16](https://nextjs.org/)**: Framework principal. Utilizo el **App Router** para aprovechar las últimas características de React y una estructura de rutas clara.
- **[React 19](https://react.dev/)**: Biblioteca de UI, aprovechando los últimos hooks y mejoras de rendimiento.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para reducir errores en tiempo de desarrollo y mejorar la documentación del código.
- **[Tailwind CSS](https://tailwindcss.com/)**: Para estilizado rápido y consistente, permitiendo un diseño responsivo sin salir del HTML.
- **[Zustand](https://zustand-demo.pmnd.rs/)**: Gestión de estado global. Una alternativa ligera y potente a Redux/Context API para manejar la lista de tareas y estados de carga.
- **[Radix UI](https://www.radix-ui.com/)**: Primitivas de UI accesibles (Dialog, Checkbox, Label) que aseguran una base sólida y accesible para los componentes interactivos.
- **[Axios](https://axios-http.com/)**: Cliente HTTP para la comunicación con el Backend.
- **[Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/)**: Para pruebas unitarias y de integración, asegurando que los componentes críticos funcionen como se espera.

## ☁️ URL en la nube

Comparto la URL de la prueba técnica desplegada en Vercel para que puedan probarla directamente, sin necesidad de instalarla ni ejecutarla de forma local.

https://prueba-t-cnica-clic-oh.vercel.app/

## 🏗️ Arquitectura y Decisiones Técnicas

El proyecto sigue una arquitectura modular y separada por capas para facilitar el mantenimiento:

1.  **Componentes UI (`/components`)**: Componentes reutilizables y desacoplados. Uso de patrones de composición para mantenerlos limpios.
2.  **Hooks Personalizados (`/hooks`)**: La lógica de negocio y los efectos secundarios se encapsulan en hooks como `useTasks`, separando la vista de la lógica.
3.  **Estado Global (`/interfaces/task.ts` & Zustand)**: El store de Zustand maneja el estado de las tareas, evitando el "prop drilling" y facilitando el acceso a los datos desde cualquier componente.
4.  **Capa de API (`/api`)**: Una capa de servicio abstracta (`tasksApi`) maneja las llamadas a la red. Esto permite cambiar la implementación del cliente HTTP o la URL base sin afectar a los componentes.

### Decisiones Clave:

- **Client-Side Rendering (CSR)**: Dado que la interacción es alta y dependemos de la autenticación/estado del usuario, he optado por componentes de cliente (`use client`). Esto garantiza una experiencia fluida tipo SPA (Single Page Application).
- **Filtrado en Cliente**: Para esta prueba, el filtrado (Todas/Activas/Completadas) se realiza en el cliente (`useMemo`). Esto ofrece una respuesta instantánea a la UI sin necesidad de recargar datos del servidor, ideal para listas de tamaño moderado.

## 📦 Como correr el proyecto

Sigue estos pasos para levantar el entorno local:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Yosipmikecolin/prueba-t-cnica-clicOH.git
    cd clic-oh-app
    ```

2.  **Instalar dependencias:**
    Utilizo `pnpm` por su velocidad y eficiencia, pero puedes usar `npm` o `yarn`.

    ```bash
    pnpm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto y define la URL de tu API Backend.

    ```env
    NEXT_PUBLIC_API_URL=https://app-task-backend-production.up.railway.app
    ```

    He habilitado una **API REST** que he creado, la cual pueden utilizar para realizar la prueba técnica.
    Esta API estará disponible por tiempo limitado.

4.  **Iniciar el servidor de desarrollo:**

    ```bash
    pnpm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

5.  **(Opcional) Correr pruebas:**
    ```bash
    pnpm test
    ```

## ⚖️ Trade-offs (Compromisos)

Durante el desarrollo, tomé ciertas decisiones considerando el tiempo y el alcance:

- **Persistencia Local vs Remota:** La app depende completamente del backend. Si el backend falla, la app no muestra datos. Una estrategia _offline-first_ con sincronización sería ideal pero añade complejidad.
- **Manejo de Errores Global:** Actualmente uso `react-hot-toast` para notificaciones. Un manejo de errores más robusto (Boundary Errors) aislaría fallos en componentes específicos.
- **Validación de Formularios:** La validación es básica. Para formularios más complejos, usaría `react-hook-form` con `zod`, pero para un título y descripción, el estado local controlado es suficiente y ligero.

## 🚀 Posibles Mejoras

- **Paginación:** Si la lista de tareas crece a miles, el filtrado en cliente será lento. Implementar paginación o "infinite scroll" conectado al backend sería el siguiente paso lógico.
- **Modo Oscuro:** Tailwind lo soporta nativamente. Sería fácil de añadir para mejorar la experiencia de usuario.
- **Autenticación:** Integrar un sistema de login (ej. NextAuth.js) para que cada usuario tenga sus propias tareas privadas.

## 💡 ¿Qué mejoraría con más tiempo?

Si tuviera más tiempo para iterar sobre el proyecto, me enfocaría en:

1.  **React Query (TanStack Query):** Reemplazaría la gestión manual de `useEffect` y `Zustand` para el fetching de datos. React Query maneja caché, reintentos y estados de carga de manera mucho más robusta y estándar en la industria.
2.  **Pruebas E2E:** Implementaría Cypress o Playwright para probar flujos completos (Crear tarea -> Editar -> Eliminar) automáticamente en un navegador real.
3.  **Optimizaciones de UI:** Añadiría animaciones con `framer-motion` para las transiciones de entrada/salida de tareas y drag-and-drop para reordenarlas.
4.  **Server Actions:** Migraría las mutaciones (crear/editar/borrar) a Server Actions de Next.js para reducir el JavaScript del lado del cliente y mejorar la robustez en conexiones lentas.

---

¡Gracias por revisar mi proyecto! Espero que el código refleje no solo la solución al problema, sino también mi pasión por escribir software limpio y bien estructurado.
