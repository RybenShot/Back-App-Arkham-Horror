# Back-App-Arkham-Horror
Parte de backend para la aplicacion de Arkham Horror v.4

dia 9 de Octubre, proyecto actualmente en pausa para dedicarme al Campus 42 de Telefonica
Retomamos proyecto 29/04/2024

# Documentacion

## Gerarquia/esquema de datos

## Investigadores

Plantilla:

~~~

// Investigadores

{nombrePJ: "Tommy Muldoon",
  idPersonaje: 1,
  posicion: "Poli Novato",
  ENposicion: "Rookie cop",
  datosBasicos: {
    vida: 7,
    cordura: 5,
    saber: 2,
    influencia: 2,
    observacion: 3,
    fuerza: 3,
    voluntad: 3,
    dinero: 2,
    restos: 0,
    limConcentracion: 2,
    ENlimConcentracion: 2,
  },
  efectos: {
    efecto1:"Protector: Si un Monstruo va a enfrentarse a otro investigador en tu espacio, puedes enfrentarte tú a ese Monstruo en su lugar.",
    ENefecto1: "Protector: If a Monster is going to face another researcher in your space, you can face that Monster instead.",
    efecto2: null,
  },
  frase: "“Vamos alla, Tommy. Es hora de hacerse el Heroe”",
  ENfrase: '“Come on, Tommy. It’s time to become a hero.”',
  locucionURL: {{Url de la locucion del personaje}},                // la locucioon ahora mismo no se como se guardaria
  historia:"",
  ENhistoria: "",
  arquetipos: {
    tituloArquetipo1: "Defensor",
    ENtituloArquetipo1:"Defender",
    descripcionArquetipo1: "Tu responsabilidad consiste en proteger a tus compañeros investigadores. Esto podría significar ayudarles a recuperarse de daños físicos y mentales, o bien despachar Monstruos antes de que se conviertan en una amenaza.",
    ENdescripcionArquetipo1: "Your responsibility is to protect your fellow investigators. This could mean helping them recover from physical and mental damage, or dispatching Monsters before they become a threat.",
    tituloArquetipo2:"Superviviente",
    ENtituloArquetipo2:"Survivor",
    descripcionArquetipo2: "Tu ventaja radica en sobrevivir al implacable asalto de los Mitos y ayudar a tus compañeros investigadores a hacer lo mismo. El trabajo en equipo os conducirá a la victoria.",
    ENdescripcionArquetipo2: "Your advantage lies in surviving the relentless assault of Myths and helping your fellow researchers do the same. Teamwork will lead you to victory."
  },
  Pertenencias: {
    Pertenencia1: {urlCartaPertenencia: {url}},
    Pertenencia2: {urlCartaPertenencia: {url}},
    Pertenencia3: {urlCartaPertenencia: {url}},
    Pertenencia4: {urlCartaPertenencia: {url}},
  },
  fotoUrl: require("@/assets/img/1-Personajes/1-Tommy.jpg"),
  expansion: "Base"
},

// Cartas de objetos

{urlFoto: {url},
  nombre: "El cuchillo de grande-mère",
  ENnombre: "The knife of grande-mère",
  descripcion:"Objeto - Mágico Arma. Recibes +2 de FUERZA cuando estés realizando una acción de ataque. Recibes +2 de SABER cuando estés lanzando un hechizo",
  ENdescripcion:"Object - Magic Weapon. You receive +2 FORCE when you are performing an attack action. You receive +2 SABER when you are casting a spell"
}

// Cartas Hechizos

{urlFoto: {url},
  nombre: "Intervención",
  ENnombre: "intervention",
  descripcion:"Hechizo - Ensalmo. Una vez por ronda, cuando otro investigador situado en cualquier espacio esté resolviendo una prueba, puedes hacer una prueba de SABER -1. Añade el resultado de esta prueba al resultado de la prueba de ese investigador.",
  ENdescripcion:"Spell - Spell. Once per round, when another researcher located in any space is solving a test, you can do a SABER -1 test. Add the result of this test to the test result of that other investigator."
}

// Cartas Talento

{urlFoto: {url},
  nombre: "Sangre de bruja",
  ENnombre: "Sangre de bruja",
  descripcion:"",
  ENdescripcion:"Talent - Innate. Action: You can perform an action that you have already used in this round. You can use your Velvety Voice to allow another researcher to do this. Once per round, after you spend a Remains tab, you win a Remains tab."
}

~~~

