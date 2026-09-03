# Wuortaim

Sistema de registro de horas de un equipo. Proyecto de estudio interno de Korbex.

## Para qué existe

Este no es un producto. Es un ejercicio para aprender TypeScript y los conceptos básicos de arquitectura construyendo algo que funciona de verdad, y para evaluar el nivel real de cada dev.

Sin framework y sin backend a propósito: cuando no hay Angular ni React resolviendo la estructura por ti, la separación de responsabilidades tienes que hacerla tú. Ahí es donde se ve quién entiende y quién copia.

## Stack

| Qué | Con qué |
|---|---|
| Lenguaje | TypeScript |
| Estilos | Tailwind |
| Build | Vite |
| Pruebas | Vitest |
| Persistencia | localStorage |
| Versionado | Git + GitHub |

Nada más. Sin framework, sin backend, sin base de datos, sin librerías de estado ni de componentes.

## Qué construimos

- Login y registro de usuarios
- Registro de personas del equipo
- Registro de proyectos
- Registro de horas por persona, proyecto y día
- Cierre de periodo (una vez cerrado, no se modifica)
- Reporte de horas por persona y por proyecto

Los datos viven en `localStorage`. Se pierden si el usuario limpia el navegador, y está bien: no es un producto.

## Autenticación

Requerimientos. El **cómo** es problema de cada quien — esa es justamente la parte que se evalúa.

1. Hay una pantalla de login con usuario y contraseña. Sin sesión activa no se ve ninguna otra pantalla.
2. Se pueden registrar usuarios nuevos.
3. Existen dos roles: **admin** y **usuario**.
4. Desde el primer arranque de la aplicación, en un navegador limpio, debe existir un usuario admin. Nadie puede crearlo manualmente desde la interfaz: tiene que estar ahí. Cómo se resuelve esto queda a criterio de cada quien.
5. Solo un admin puede crear proyectos, dar de alta personas y cerrar periodos.
6. Un usuario normal solo puede registrar y ver sus propias horas.
7. Las contraseñas no se guardan en texto plano.
8. La sesión sobrevive al refrescar la página, pero se puede cerrar.

Nota: esto es autenticación de ejercicio, no seguridad real. Sin servidor, cualquiera con la consola del navegador abierta puede saltársela toda. Vale para practicar modelado de roles y control de acceso en la UI; no vale como referencia para un sistema en producción.

## Qué NO construimos

- Backend, API, base de datos
- Recuperación de contraseña, correos, 2FA
- Tarifas, costos, facturación
- Flujos de aprobación
- Responsive perfecto ni animaciones

Si algo de esto aparece en una conversación, la respuesta es "en la v2". El alcance no se estira.

## Reglas de negocio

Estas son la parte importante del ejercicio. No son adorno.

1. No se pueden registrar horas en un periodo cerrado.
2. No se pueden registrar más de 12 horas en un mismo día para una persona.
3. No se pueden registrar horas con fecha futura.
4. Una persona inactiva no puede registrar horas nuevas, pero sus registros anteriores se conservan.
5. Un proyecto cerrado no admite registros nuevos.
6. Las horas se clasifican por tipo de jornada (ordinaria, nocturna, dominical) y cada tipo tiene su recargo según la ley colombiana.

Cada regla debe tener su prueba unitaria en Vitest.

## Estructura

La define el equipo, en conjunto, antes de escribir código. No hay carpetas prescritas: acordar cómo se organiza el proyecto es parte del ejercicio, y hay que sustentar la decisión, no solo votarla.

Una vez acordada, es obligatoria para todos. Si alguien quiere cambiarla después, se discute con el equipo y se cambia para todos; no se desvía por su cuenta.

Lo único que sí se exige de entrada es esto: **las reglas de negocio no pueden tocar el DOM ni `localStorage`.** Deben ser funciones y tipos puros — entran datos, salen datos o un error. La prueba de que lo lograron es simple: si las pruebas de reglas de negocio necesitan un navegador para correr, no está separado.

Dónde vive eso y cómo se llame, lo decide el equipo.

## Flujo de trabajo con Git

Usamos GitFlow. Aprenderlo es tan parte del ejercicio como el código.

**Ramas permanentes**

- `main` — solo versiones estables. Nadie commitea aquí directamente, nunca.
- `develop` — rama de integración. Es de donde sale y a donde vuelve todo el trabajo del día a día.

**Ramas temporales**

- `feature/<historia>` — sale de `develop`, vuelve a `develop`. Una por historia.
- `release/<versión>` — sale de `develop` al cerrar el sprint. Solo admite correcciones, no funcionalidad nueva. Se fusiona a `main` y de vuelta a `develop`, y se etiqueta.
- `hotfix/<versión>` — sale de `main`, vuelve a `main` y a `develop`.

**Reglas**

1. Una rama por historia. El nombre describe la historia, no a la persona: `feature/cierre-de-periodo`, no `feature/juan`.
2. Antes de abrir el PR, actualiza tu rama con `develop` y resuelve tus propios conflictos. Los conflictos son tuyos, no del que revisa.
3. Commits pequeños, siguiendo la convención de más abajo.
4. Todo entra por Pull Request. Nadie hace merge de su propio PR.
5. Cada PR necesita dos aprobaciones: la de un compañero y la del líder técnico. El merge lo hace el líder.
6. El PR no se abre si las pruebas no pasan.
7. La rama se borra después del merge.
8. `main` y `develop` están protegidas.

**Título del Pull Request**

Formato obligatorio:

```
[ticket][proyecto] | Título
```

Ejemplos:

```
[WUO-14][Wuortaim] | Validación de máximo 12 horas por día
[WUO-27][Wuortaim] | Cierre de periodo
[WUO-31][Wuortaim] | Usuario admin inicial
```

- Sin ticket no hay PR. Si no existe el ticket, se crea antes.
- El título describe **qué cambió para el usuario**, no qué archivos se tocaron. `Cierre de periodo`, no `Cambios en periodo.ts`.
- Corto, sin punto final, y que se entienda leyendo solo el título.
- Un PR que no cumpla el formato se devuelve sin revisar.

La última regla suena dura, pero es la única forma de que la convención se sostenga. Se devuelve una vez y ya nadie la vuelve a olvidar.

**Mensajes de commit**

Usamos Conventional Commits. El formato es:

```
tipo(alcance): descripción
```

Tipos permitidos:

| Tipo | Cuándo |
|---|---|
| `feat` | Funcionalidad nueva |
| `fix` | Corrección de un error |
| `refactor` | Cambio interno que no altera el comportamiento |
| `test` | Agregar o corregir pruebas |
| `style` | Formato, espacios, nada de lógica |
| `docs` | Documentación |
| `chore` | Configuración, dependencias, herramientas |

Ejemplos:

```
feat(horas): registrar horas por proyecto y día
fix(periodo): impedir registros en periodo cerrado
test(horas): casos borde del límite diario
refactor(auth): extraer validación de sesión
chore: configurar vitest
```

Reglas:

- Descripción en presente e imperativo, en minúscula, sin punto final: `agregar`, no `agregado` ni `Agregué`.
- Un commit, un cambio coherente. Si el mensaje necesita un "y", probablemente son dos commits.
- `wip`, `arreglos`, `cambios` y `ya quedó` no son mensajes.
- El alcance es opcional, pero si lo pones, que sea el módulo, no el archivo.
- Si el porqué no cabe en la descripción, va en el cuerpo del commit. El qué se ve en el diff; el porqué solo lo sabes tú.

Elijan un idioma para las descripciones y no lo mezclen. Los tipos siempre en inglés, porque son parte del estándar.

Nota honesta: GitFlow completo es más pesado de lo que este proyecto necesita. Lo usamos porque el objetivo es aprender el modelo, no porque sea la mejor opción para un proyecto de este tamaño. En producto real y despliegue continuo, la mayoría de equipos hoy usa algo más liviano.

## Cómo evaluamos

Cada dev trabaja **solo**, en su propia rama, sobre su propio módulo. Nada de parejas en esta etapa: el objetivo es ver el trabajo individual de cada quien.

**En el código**

- ¿Los tipos dicen la verdad, o está todo lleno de `any`?
- ¿Las reglas de negocio están aisladas, o se filtraron a la UI?
- ¿Se respetó la estructura acordada por el equipo?
- ¿Las pruebas cubren los casos borde, o solo el camino feliz?
- ¿Los nombres se entienden sin preguntar?
- ¿El código se puede leer de corrido?

**En el uso de Git**

- ¿La rama salió de donde debía y se llama como debía?
- ¿Los commits siguen la convención y cuentan la historia del cambio, o es un solo commit gigante al final?
- ¿El PR es lo bastante pequeño como para revisarse de verdad?
- ¿Se actualizó con `develop` antes de pedir el merge?
- ¿Resolvió sus propios conflictos, o los dejó tirados?
- ¿Entraron archivos que no debían — `node_modules`, `dist`, configuración local?
- ¿El título del PR sigue la convención?
- ¿La descripción del PR explica qué cambió y por qué?

**En la revisión de otros**

Cada quien revisa PRs de sus compañeros, y esa revisión también se evalúa. Un "LGTM 👍" sin haber leído el código cuenta en contra.

El orden importa: primero revisa el compañero, después el líder. Así el par tiene que formarse un juicio propio en lugar de esperar a ver qué dijo el líder para copiar la opinión.

## Ritmo

- Sprints de dos semanas, con demo al cierre. La demo no se negocia.
- Al cerrar el sprint se corta una `release`, se fusiona a `main` y se etiqueta. Aunque nadie use el software, el ejercicio de cerrar una versión es el punto.
- Los PR se revisan con comentarios escritos. Ahí es donde se enseña.

## Arranque

```bash
git clone <repo>
cd wuortaim
npm install
npm run dev
```

### Scripts disponibles

| Comando | Que Hace |
|---|---|
| `npm run dev` | Levanta Vite en modo desarrollo. |
| `npm run build` | Compila los tipos con `tsc` y luego genera el build de producción. |
| `npm run preview` | Sirve localmente el resultado de `build`. |
| `npm test` | Ejecuta Vitest en modo observador: se queda corriendo y vuelve a probar al guardar. |
| `npm run test:run` | Ejecuta las pruebas una sola vez y termina con código de salida. |
| `npm run prepare` | Lo ejecuta npm automáticamente después de `npm install`. Instala los hooks de Git de Husky; no se invoca a mano. |

El repo arranca prácticamente vacío. Antes de escribir código, el equipo acuerda la estructura del proyecto.