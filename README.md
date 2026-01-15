# **Proyecto Scrum – Registro de Asistencia**

## *ADFJ University*

---

## **1. Descripción del Proyecto**

Esta es una **aplicación web dinámica** diseñada para facilitar y agilizar el **control de asistencia de alumnos** en la **ADFJ University**.
El sistema permite al docente llevar un conteo **exacto, ordenado y eficiente** de la presencia en el aula, categorizando a cada estudiante según su **puntualidad**, y gestionando toda la información de forma **local**, sin depender de bases de datos externas.

---

## **2. Integrantes y Roles (Scrum)**

El desarrollo se realizó bajo el marco de trabajo **Scrum**, asignando roles claros para una mejor organización del equipo:

* **Abi** — *Scrum Master y Tester*
  Líder del proyecto y responsable de asegurar la **calidad** del sistema.

* **Joel** — *Product Owner*
  Encargado de definir los **requerimientos del cliente** y brindar apoyo en la **lógica JavaScript**.

* **Flavio** — *Desarrollador Frontend*
  Responsable de la **estructura HTML**, **diseño CSS** y la interfaz visual.

* **Danilo** — *Desarrollador Backend Local*
  Enfocado en la **lógica de programación**, **validaciones** y manejo de datos locales.

---

## **3. Funcionalidades Principales**

El proyecto se organizó en módulos clave para cumplir los objetivos de cada **Sprint**:

* **Sistema de Autenticación (Login)**
  Acceso seguro para personal autorizado.
  Usuario: `admin`
  Contraseña: `1234`

* **Panel de Inicio y “Sobre Nosotros”**
  Secciones informativas sobre la **misión y visión** de la universidad.

* **Formulario de Asistencia**

  * Validación de nombres (evita repeticiones excesivas o cadenas inválidas).
  * Restricción de fecha únicamente al **día actual**.

* **Filtrado por Estado**
  Clasificación en tiempo real de los alumnos:

  * Presentes
  * Ausentes
  * Tardanza

* **Persistencia con LocalStorage**
  Almacenamiento local que mantiene los datos aun cuando se cierre el navegador, sin necesidad de una base de datos externa.

* **Sección de Contacto**
  Formulario de consultas con **validación de términos y condiciones**.

---

## **4. Cómo Ejecutar el Proyecto**

Para una correcta visualización del sistema, siga los siguientes pasos:

1. Descargue o clone el repositorio manteniendo la **estructura completa de carpetas**.
2. Abra el archivo **`index.html`** directamente desde su navegador (doble clic sobre el archivo).

**Nota:** Se recomienda la ejecución local desde el archivo físico, ya que en algunos entornos de despliegue externo el **logo de la universidad** podría no renderizarse correctamente.

---

## **5. Aprendizajes del Equipo**

Durante el desarrollo del proyecto, el equipo fortaleció tanto competencias técnicas como habilidades blandas:

* **Metodologías Ágiles**
  Aplicación práctica de **Scrum**, gestión de **Sprints** y trabajo colaborativo.

* **Manipulación del DOM**
  Uso de **JavaScript** para la creación de tablas dinámicas, manejo de eventos y actualización de la interfaz sin recargar la página.

* **Persistencia de Datos**
  Implementación de **localStorage** y manejo de estructuras **JSON**.

* **Diseño Responsivo y Moderno**
  Uso de **CSS puro**y  animaciones de fondo.

* **Validaciones y Seguridad**
  Uso de **expresiones regulares** para asegurar la integridad de los datos ingresados por el usuario.

---

### **© 2026 ADFJ University**

*Proyecto de Desarrollo Ágil – Scrum*
