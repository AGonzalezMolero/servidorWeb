var login = null
var navegacio = null
var popups = null
var seccioBackofficeUsuaris = null
var seccioFrontendProductes = null

// Aquesta funció s'inicia al carregar la pàgina
async function inicia () {

    // Iniciem els objectes globals
    login = new ObjLogin()
    navegacio = new ObjNavegacio()
    popups = new ObjPopups()
    seccioBackofficeUsuaris = new ObjSeccioBackofficeUsuaris()
    seccioFrontendProductes = new ObjSeccioFrontendProductes()

    // Inicia les funcions de navegació HTML5
    navegacio.inicia()

    // Fem que els botons de navegació endavant i endarrera mostrin el canvi de secció
    window.onpopstate = function (evt) {
        if (evt.state === null) {
            navegacio.mostraSeccio('frontendHome')
        } else {
            navegacio.mostraSeccio(evt.state.html)
        }
    }

    // Si tenim guardat un usuari i un token intentem identificar-lo
    await login.autenticaAmbToken()
}

function iniciaSeccio(seccio) {
    switch(seccio) {
    case 'frontendProductes': seccioFrontendProductes.iniciaSeccio(); break
    case 'backofficeUsuaris': seccioBackofficeUsuaris.iniciaSeccio(); break
    default:
    }
}

async function mostraMenu (evt) {
    let refBody = document.getElementsByTagName('body')[0],
        refSmall = document.getElementById('menuSmall'),
        refContainer = document.getElementById('menuContainer'),
        estilContainer = window.getComputedStyle(refContainer, ''),
        midaContainer = 0

    evt.preventDefault()

    refBody.style.overflow = 'hidden'   // Treure scroll
    refSmall.style.display = 'flex'     // Mostrar la capa 'menuSmall'
    await promiseWait(1)                // Esperar que es processi el canvi de 'display' anterior

    refSmall.style.opacity = 1          // Animar la opacitat del fons

                                        // Animar 'menuContainer' perquè apareixi
    midaContainer = parseInt(estilContainer.getPropertyValue('height'), 10)
    refContainer.style.transform =  'translateY(-' + midaContainer + 'px)'
}
async function amagaMenu (evt) {
    let refBody = document.getElementsByTagName('body')[0],
        refSmall = document.getElementById('menuSmall'),
        refContainer = document.getElementById('menuContainer')

    evt.preventDefault()

    refBody.style.overflow = 'auto'     // Recuperar scroll

    refSmall.style.opacity = 0          // Animar la opacitat de 'menuSmall'
                                        // Animar 'menuContainer' perquè s'amagui
    refContainer.style.transform = 'translateY(0)'

    await promiseWait(500)              // Esperar a que acabin les animacions
    refSmall.style.display = 'none'     // Treure 'menuSmall' del dibuix de la pàgina per evitar problemes d'interacció
}
function navega (evt, lloc) {
    evt.stopPropagation() // Evitar que executi 'amagaMenu' des de 'menuSmall'
    //location.href = lloc
    console.log('Navegar a ', lloc)
}

// Espera una estona abans de seguir amb el codi
async function promiseWait (time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve() }, time)
    })
}

