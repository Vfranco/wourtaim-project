# Estructura del proyecto

Definimos una arquitectura limpia, estructurando las carpetas por capas y responsabilidades, buscando mantener limites claros y reglas de negocio separadas de la interaccion del usuario.

## Arquitectura

```
src/
├── domain/
├── application/
├── infrastructure/
└── presentation/
```

La regla principal para decidir dónde colocar un archivo es preguntarse:

> ¿Qué responsabilidad tiene este código y de qué debería depender para poder funcionar?

Cada capa tiene un propósito diferente y debe respetar sus límites.

### Domain

Es el nucleo central del sistema y contiene las reglas del negocio mediante entidades, interfaces, etc. Aqui no puede existir nada del exterior.

### Application

Es el orquestador y contiene las acciones que un usuario puede realizar en el sistema. Esta capa utiliza **domain** pero no debe contener directamente las reglas ni usar implementaciones concretas. Aqui podemos encontrar servicios, validaciones, casos de uso, etc.

### Infrastructure

Esta capa contiene los detalles de implementación, tales como el repositorio de localstorage 

### Presentation

Contiene las entradas y salidas del sistema, coomo UI, componentes, menus, etc. Esta capa interactua con el usuario final recibiendo y devolviendo resultados.

## ¿Donde va un archivo nuevo?

Al tener una arquitectura limpia, nos permite destacar cada capa con sus responsabilidades y sus limites, siendo este el filtro justo para decidir donde vive cada logica. Si el archivo representa una regla o concepto del negocio, corresponde a domain; si coordina acciones del usuario, a application; si implementa un detalle externo, a infrastructure; y si maneja la interacción con el usuario, a presentation

## Alternativa

Se concidero una estructura por feature, pero se descarto por falta de conocimiento.

###  ¿Qué se rompe si alguien pone una regla de negocio en la carpeta de UI?.

Se rompen la separación de responsabilidades (SoC), al requerir en algun momento cambiar de framework, vista o libreria, las reglas de negocio estan acopladas a la UI y tendrian que reescribirse.