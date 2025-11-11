# 🎓 Colegio Mentes Creativas - Aplicación Educativa Interactiva

## 📋 Descripción del Proyecto

Aplicación educativa multimedia de última generación desarrollada para estudiantes de 4° y 5° grado como parte de la **Actividad Final Integrada** de Calidad de Software en la Universidad Cooperativa de Colombia.

El proyecto integra tecnologías web modernas (**React 19 + Vite 7 + TailwindCSS 4 + Three.js**) para crear experiencias de aprendizaje inmersivas en 3D, cumpliendo con los estándares de calidad **ISO/IEC 25010** y mejores prácticas de desarrollo de software.

---

## ✨ Características Principales

### 🏠 Página Principal
- Diseño moderno con gradientes y animaciones fluidas (Framer Motion)
- Tres tarjetas interactivas de navegación hacia las secciones educativas
- Interfaz responsive optimizada para desktop y tablets
- Sistema de navegación intuitivo con iconos descriptivos

### 🌎 Ciencias Sociales / Geografía de Colombia
**Mapa 3D Interactivo Profesional** con:
- ✅ **33 divisiones territoriales**: Los 32 departamentos + Bogotá D.C.
- ✅ **5 regiones naturales**: Caribe, Andina, Pacífica, Orinoquía y Amazonía
- ✅ **Sistema de filtrado por región** con código de colores
- ✅ **Información completa** de cada departamento:
  - Capital departamental
  - Población actualizada
  - Área territorial
  - Datos culturales e históricos interesantes
- ✅ **Controles interactivos**:
  - Click en departamento: Ver información detallada
  - Click derecho + arrastrar: Rotar mapa 3D
  - Scroll: Acercar/alejar zoom
  - Hover sobre región: Resaltar todos los departamentos

### 🤖 Tecnología y Pensamiento Lógico
**Constructor de Bloques 3D** (estilo Minecraft):
- 4 tipos de bloques diferentes (césped, piedra, madera, arena)
- Construcción libre en espacio 3D
- Rotación y navegación orbital de la cámara

**Simulador de Robot Programable**:
- Robot 3D con movimientos direccionales (arriba, abajo, izquierda, derecha)
- Panel de comandos ejecutados en tiempo real
- Desarrollo de pensamiento lógico y secuencial
- Sistema de reinicio y control de velocidad

### 🎨 Arte y Creatividad
**Herramienta de Pintura 3D**:
- Pintura en el aire con trazos 3D volumétricos (TubeGeometry)
- Paleta de 8 colores vibrantes
- Control de grosor del pincel (1-10px) con visualización en tiempo real
- Cursor visual que muestra tamaño y color actual
- **Controles separados**:
  - Click izquierdo + arrastrar: Dibujar trazos
  - Click derecho + arrastrar: Rotar cámara
  - Scroll: Zoom
- Función de deshacer último trazo
- Contador de trazos en tiempo real

**Escultura Digital Moldeable**:
- Creación de esferas 3D con materiales metálicos
- Arrastrar esferas para reposicionarlas
- Control de escala con rueda del mouse
- Selección y cambio de color de esferas individuales
- Funciones de duplicar y eliminar esferas
- Pedestal decorativo con iluminación profesional
- Sistema de sombras proyectadas en tiempo real

---

## 🛠️ Stack Tecnológico

### Frontend Framework
- **React 19.1.1** - Biblioteca de UI con las últimas características
- **TypeScript 5.8.3** - Superset de JavaScript con tipado estático
- **Vite 7.1.3** - Build tool ultra-rápido y dev server con HMR

### Estilos y Animaciones
- **TailwindCSS 4.1.12** - Framework CSS utility-first
- **Framer Motion 12.23.12** - Biblioteca de animaciones declarativas
- **React Icons 5.5.0** - Conjunto completo de iconos

### Gráficos 3D
- **Three.js 0.179.1** - Biblioteca JavaScript para WebGL
- **@react-three/fiber 8.18.5** - React renderer para Three.js
- **@react-three/drei 9.119.2** - Helpers y abstracciones útiles para R3F

### Navegación
- **React Router DOM 7.8.2** - Enrutamiento declarativo para React

### Testing y Calidad
- **Jest 30.1.2** - Framework de testing JavaScript
- **React Testing Library 16.3.0** - Utilidades para testing de componentes React
- **ESLint** - Análisis estático de código
- **TypeScript Compiler** - Verificación de tipos

---

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18.x o superior
- npm 9.x o superior
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/guswill24/integracion_continua.git
cd integracion_continua
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

---

## 🚀 Scripts Disponibles

### Desarrollo
```bash
npm run dev          # Inicia servidor de desarrollo en http://localhost:5173
                     # Incluye Hot Module Replacement (HMR)
```

### Testing y Calidad
```bash
npm test             # Ejecuta todas las pruebas unitarias con Jest
npm run type-check   # Verifica tipos TypeScript sin compilar
npm run lint         # Analiza código con ESLint para detectar errores
```

### Producción
```bash
npm run build        # Compila el proyecto para producción (carpeta dist/)
npm run preview      # Previsualiza el build de producción localmente
```

---

## 📁 Estructura del Proyecto

```
integracion_continua/
│
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── Navbar.tsx          # Barra de navegación con links
│   │   ├── Sidebar.tsx         # Menú lateral (opcional)
│   │   ├── Layout.tsx          # Layout wrapper principal
│   │   ├── ClickCounter.tsx    # Componente de contador
│   │   ├── TodoList.tsx        # Lista de tareas
│   │   ├── PasswordValidator.tsx # Validador de contraseñas
│   │   ├── UnitConverter.tsx   # Conversor de unidades
│   │   └── MultiplicationTable.tsx # Tablas de multiplicar
│   │
│   ├── views/                   # Vistas/páginas principales
│   │   ├── HomePage.tsx        # 🏠 Página de inicio con tarjetas
│   │   ├── GeografiaView.tsx   # 🌎 Mapa 3D de Colombia (32 departamentos)
│   │   ├── TecnologiaView.tsx  # 🤖 Constructor de bloques + Robot
│   │   ├── ArteView.tsx        # 🎨 Pintura 3D + Escultura digital
│   │   ├── ContadorClics.tsx   # Vista de contador de clics
│   │   ├── ListaTareas.tsx     # Vista de lista de tareas
│   │   ├── ValidContrasena.tsx # Vista de validador
│   │   ├── ConversorUnid.tsx   # Vista de conversor
│   │   ├── TablasMul.tsx       # Vista de tablas
│   │   ├── GeometryExplorer.tsx # Explorador de geometría
│   │   ├── ThreeDemoView.tsx   # Demo de Three.js
│   │   └── SpeechDemoView.tsx  # Demo de síntesis de voz
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx       # Configuración de rutas React Router
│   │
│   ├── App.tsx                 # Componente raíz de la aplicación
│   ├── main.tsx                # Punto de entrada (ReactDOM.render)
│   ├── index.css               # Estilos globales
│   └── vite-env.d.ts           # Declaraciones de tipos para Vite
│
├── public/                      # Archivos estáticos públicos
│
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD con GitHub Actions
│
├── tests/                       # Archivos de pruebas unitarias
│   └── *.test.tsx              # Tests con Jest y RTL
│
├── package.json                # Dependencias y scripts npm
├── tsconfig.json               # Configuración de TypeScript
├── vite.config.ts              # Configuración de Vite
├── tailwind.config.ts          # Configuración de TailwindCSS
├── jest.config.js              # Configuración de Jest
├── eslint.config.js            # Configuración de ESLint
└── README.md                   # Este archivo
```

---

## 🧪 Pruebas Unitarias y Calidad de Código

El proyecto implementa una estrategia completa de testing con **Jest 30** y **React Testing Library 16**:

### Componentes Testeados
- ✅ **HomePage.test.tsx**: Renderizado de tarjetas, navegación y animaciones
- ✅ **GeografiaView.test.tsx**: Mapa 3D, Canvas, OrbitControls y departamentos
- ✅ **TecnologiaView.test.tsx**: Constructor de bloques, robot y comandos
- ✅ **ArteView.test.tsx**: Herramientas de pintura, escultura y controles
- ✅ **ClickCounter.test.tsx**: Incremento y decremento de contador
- ✅ **TodoList.test.tsx**: Agregar, completar y eliminar tareas
- ✅ **PasswordValidator.test.tsx**: Validaciones de seguridad
- ✅ **UnitConverter.test.tsx**: Conversiones de unidades
- ✅ **MultiplicationTable.test.tsx**: Generación de tablas
- ✅ **Navbar.test.tsx**: Enlaces de navegación

### Ejecutar Pruebas
```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar con cobertura de código
npm test -- --coverage

# Modo watch (desarrollo)
npm test -- --watch

# Ejecutar pruebas específicas
npm test HomePage
```

### Métricas de Calidad
- **Cobertura de código**: >80% en componentes críticos
- **Análisis estático**: ESLint con reglas estrictas
- **Verificación de tipos**: TypeScript en modo estricto
- **Pruebas de regresión**: Ejecutadas en cada commit (CI/CD)

---

## 🔄 Integración Continua y Despliegue (CI/CD)

### GitHub Actions Workflow
Pipeline automatizado configurado en `.github/workflows/ci.yml`

**Proceso de CI/CD:**
1. ✅ **Setup**: Configuración del entorno Node.js
2. ✅ **Install**: Instalación de dependencias con npm
3. ✅ **Type Check**: Verificación de tipos con TypeScript
4. ✅ **Lint**: Análisis estático de código con ESLint
5. ✅ **Test**: Ejecución de suite completa de pruebas unitarias
6. ✅ **Build**: Compilación del proyecto para producción
7. ✅ **Coverage**: Generación de reportes de cobertura de código

**Triggers:**
- ✨ Push a ramas `main` y `develop`
- ✨ Pull Requests hacia `main` y `develop`
- ✨ Commits en cualquier branch de feature

**Entornos de prueba:**
- Node.js 18.x (LTS)
- Node.js 20.x (LTS)

### Despliegue en Vercel
El proyecto está optimizado para despliegue en Vercel:

**Despliegue automático:**
- Conectado al repositorio de GitHub
- Deploy automático en cada push a `main`
- Preview deployments en Pull Requests

**Despliegue manual:**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy a producción
vercel --prod

# Deploy de preview
vercel
```

**Configuración:**
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

## 📊 Cumplimiento de Estándares de Calidad

### ISO/IEC 25010 - Características implementadas:

1. **Funcionalidad**: Todas las secciones cumplen con sus requisitos
2. **Usabilidad**: Interfaz intuitiva y accesible para el público objetivo
3. **Confiabilidad**: Pruebas unitarias garantizan estabilidad
4. **Eficiencia**: Optimización con lazy loading y code splitting
5. **Mantenibilidad**: Código modular y bien documentado
6. **Portabilidad**: Compatible con navegadores modernos

---

## 🎯 Características Técnicas Destacadas

### Rendimiento 3D y WebGL
- **React Three Fiber**: Integración declarativa de Three.js con React
- **Optimización de renderizado**: Uso de `useFrame` para animaciones suaves a 60 FPS
- **Geometrías eficientes**: TubeGeometry para trazos, SphereGeometry optimizada
- **Control de cámara**: OrbitControls con damping y límites configurables
- **Sistema de iluminación**: Múltiples fuentes de luz (ambient, directional, point, spot)
- **Materiales avanzados**: MeshStandardMaterial con propiedades físicas realistas
- **Sombras en tiempo real**: Shadow mapping para mayor realismo

### Interactividad Avanzada
- **Eventos de puntero 3D**: onPointerDown, onPointerMove, onPointerOver en objetos 3D
- **Raycasting**: Detección precisa de intersecciones con objetos
- **Drag & Drop 3D**: Arrastrar objetos en espacio tridimensional
- **Controles separados**: Click izquierdo para interacción, derecho para cámara
- **Animaciones fluidas**: Framer Motion para transiciones y efectos
- **Estados reactivos**: Hooks de React para gestión de estado compleja

### Arquitectura y Patrones
- **Componentes funcionales**: Hooks de React para lógica reutilizable
- **Separación de responsabilidades**: Componentes de presentación vs. lógica
- **Custom Hooks**: useFrame, useThree, useRef para funcionalidad 3D
- **Type Safety**: TypeScript para prevención de errores en tiempo de desarrollo
- **Composición de componentes**: Arquitectura modular y mantenible

### Responsive Design y Accesibilidad
- **Mobile-first**: Diseño adaptable desde 320px hasta 2560px
- **Breakpoints TailwindCSS**: sm, md, lg, xl, 2xl
- **Touch support**: Gestos táctiles en dispositivos móviles
- **Navegación por teclado**: Soporte de Tab y Enter
- **Contraste optimizado**: Cumplimiento WCAG 2.1 AA

---

## 👥 Público Objetivo y Objetivos Pedagógicos

### Público Objetivo
**Estudiantes de 4° y 5° grado de primaria** (9-11 años)

### Objetivos de Aprendizaje

#### 🌍 Geografía (Ciencias Sociales)
- Conocer la organización territorial de Colombia
- Identificar los 32 departamentos y sus capitales
- Comprender las 5 regiones naturales del país
- Relacionar ubicación geográfica con características culturales
- Desarrollar pensamiento espacial mediante visualización 3D

#### 🤖 Tecnología (Pensamiento Lógico)
- Introducción al pensamiento computacional
- Secuenciación de comandos y algoritmos básicos
- Resolución de problemas mediante construcción
- Causa y efecto en programación de movimientos
- Creatividad en construcción de estructuras 3D

#### 🎨 Arte (Creatividad)
- Expresión artística en entornos digitales
- Coordinación mano-ojo en espacio tridimensional
- Exploración de color, forma y volumen
- Desarrollo de habilidades de visualización espacial
- Experimentación con herramientas digitales de creación

### Competencias Desarrolladas
✅ **Competencias digitales**: Uso de interfaces 3D y herramientas interactivas  
✅ **Pensamiento crítico**: Análisis de información geográfica  
✅ **Resolución de problemas**: Construcción y programación  
✅ **Creatividad**: Expresión artística digital  
✅ **Aprendizaje autónomo**: Exploración guiada e interactiva

---

## 📝 Licencia

Este proyecto es de uso educativo para la **Universidad Cooperativa de Colombia**.

---

## 👨‍💻 Autor

**Gustavo Villegas**
- GitHub: [@guswill24](https://github.com/guswill24)
- Universidad Cooperativa de Colombia
- Programa: Ingeniería de Software
- Curso: Calidad de Software

---

## 🙏 Agradecimientos

- Universidad Cooperativa de Colombia
- Docentes del curso de Calidad de Software
- Comunidad de React y Three.js por la documentación

---

## 📚 Referencias

- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Three.js Manual](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

**© 2025 Colegio Mentes Creativas - Proyecto Educativo Interactivo**