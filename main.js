// Array de objetos: productos del catálogo
const productos = [
    {
        id: 'aqua-terra',
        nombre: 'Aqua Terra',
        descripcion: 'Automático · Acero · 300 m',
        precio: 4800,
        imagen: 'https://plazavendome.vteximg.com.br/arquivos/ids/165594-1000-1000/omega-reloj-seamaster-aqua-terra-150mco-axial-master-chronometer-summer-blue-38-mm-22010382003004_1.jpg?v=638334344783400000',
        alt: 'Reloj Aqua Terra azul'
    },
    {
        id: 'moonphase',
        nombre: 'Moonphase Elite',
        descripcion: 'Manual · Oro 18 qt · Ed. limitada',
        precio: 18500,
        imagen: 'https://i.ebayimg.com/images/g/720AAOSwwW1l2LYV/s-l1200.jpg',
        alt: 'Reloj Moonphase oro fase lunar'
    },
    {
        id: 'chrono',
        nombre: 'Chrono Sport',
        descripcion: 'Cronógrafo · Cerámica · 200 m',
        precio: 7200,
        imagen: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80',
        alt: 'Reloj Chrono Sport negro cerámica'
    },
    {
        id: 'skeleton',
        nombre: 'Heritage Skeleton',
        descripcion: 'Manual Esqueleto · Platino 950',
        precio: 32000,
        imagen: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?w=400&q=80',
        alt: 'Reloj Heritage Skeleton platino'
    }
];

// Map: especificaciones técnicas por modelo (clave = id del producto)
const especificaciones = new Map([
    ['aqua-terra',  { movimiento: 'Automático', material: 'Acero 316L',        garantia: '5 años'  }],
    ['moonphase',   { movimiento: 'Manual',     material: 'Oro 18 qt',          garantia: '10 años' }],
    ['chrono',      { movimiento: 'Cronógrafo', material: 'Titanio / Cerámica', garantia: '5 años'  }],
    ['skeleton',    { movimiento: 'Manual Esqueleto', material: 'Platino 950',  garantia: '10 años' }]
]);

// Set: colección de categorías únicas de los productos
const categorias = new Set(['Automático', 'Manual', 'Cronógrafo', 'Esqueleto', 'Edición Limitada']);

// Objeto con la información de las secciones de navegación
const secciones = {
    inicio:    generarInicio,
    productos: generarProductos,
    video:     generarVideo,
    tarifas:   generarTarifas,
    contacto:  generarContacto,
    tiendas:   generarTiendas
};


//  NAVEGACIÓN SPA 
// Cambia el contenido principal sin recargar la página

function navegarA(seccion) {
    // Obtenemos el contenedor principal
    var main = document.getElementById('main-content');

    // switch: decide qué función genera el contenido según la sección
    switch (seccion) {
        case 'inicio':
        case 'productos':
        case 'video':
        case 'tarifas':
        case 'contacto':
        case 'tiendas':
            main.innerHTML = '';          // Limpiamos el contenido anterior
            secciones[seccion]();         // Llamamos a la función generadora
            break;
        default:
            main.innerHTML = '<section><h2>Sección no encontrada</h2></section>';
    }

    // Resaltamos el enlace activo en el navbar
    var enlaces = document.querySelectorAll('#navbar a');
    for (var i = 0; i < enlaces.length; i++) {
        // if: comprobamos si el enlace corresponde a la sección activa
        if (enlaces[i].dataset.seccion === seccion) {
            enlaces[i].classList.add('activo');
        } else {
            enlaces[i].classList.remove('activo');
        }
    }

    // Volvemos al tope de la página
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// GENERADORES DE SECCIONES 

/* Sección INICIO */
function generarInicio() {
    var main = document.getElementById('main-content');

    // Creamos el contenedor de la sección
    var sec = document.createElement('section');
    sec.id = 'inicio';

    sec.innerHTML = `
        <h1>Relojes de Lujo</h1>
        <p>Precisión suiza desde 1887.</p>
        <button class="btn" onclick="navegarA('productos')">Ver colección</button>
        <button class="btn" onclick="alert('Catálogo próximamente disponible.')">Descargar catálogo</button>

        <!-- Reloj CSS animado -->
        <div class="reloj">
            <div class="aguja aguja-h" id="aguja-h"></div>
            <div class="aguja aguja-m" id="aguja-m"></div>
            <div class="aguja aguja-s" id="aguja-s"></div>
            <div class="centro"></div>
        </div>

        <!-- Mostramos las categorías del Set -->
        <div style="margin-top:2rem;">
            <h2 style="font-size:1.1rem;">Categorías disponibles</h2>
            <div id="cats" style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.8rem;"></div>
        </div>
    `;

    main.appendChild(sec);

    // Iniciamos el reloj animado
    moverAgujas();
    setInterval(moverAgujas, 1000);

    // Iteramos el Set con for...of para mostrar las categorías
    var contenedorCats = document.getElementById('cats');
    for (var cat of categorias) {
        var span = document.createElement('span');
        span.textContent = cat;
        span.style.cssText = 'background:#222;border:1px solid #333;padding:0.3rem 0.8rem;color:#c9a96e;font-size:0.8rem;font-family:Arial,sans-serif;';
        contenedorCats.appendChild(span);
    }
}


/* Sección PRODUCTOS — generada con un bucle for sobre el array */
function generarProductos() {
    var main = document.getElementById('main-content');
    var sec  = document.createElement('section');
    sec.id   = 'productos';

    var titulo = document.createElement('h2');
    titulo.textContent = 'Nuestra Colección';
    sec.appendChild(titulo);

    var grid = document.createElement('div');
    grid.className = 'grid';

    // Bucle for: recorre el array de productos y crea cada tarjeta
    for (var i = 0; i < productos.length; i++) {
        var p = productos[i];
        grid.appendChild(crearTarjeta(p));
    }

    sec.appendChild(grid);
    main.appendChild(sec);
}

/* Crea una tarjeta de producto a partir de un objeto */
function crearTarjeta(prod) {
    var div = document.createElement('div');
    div.className = 'tarjeta';

    // Clausura para capturar el producto correcto en el evento
    (function(producto) {
        div.onclick = function() {
            seleccionarProducto(producto.nombre, producto.precio);
        };
    })(prod);

    div.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.alt}" width="400" height="270" loading="lazy" />
        <h3>${prod.nombre}</h3>
        <p>${prod.descripcion}</p>
        <strong>$${prod.precio.toLocaleString()}</strong><br/>
        <button class="btn" onclick="event.stopPropagation(); navegarA('contacto')">Comprar</button>
    `;

    return div;
}


/* Sección VIDEO */
function generarVideo() {
    var main = document.getElementById('main-content');
    var sec  = document.createElement('section');
    sec.id   = 'video';

    sec.innerHTML = `
        <h2>El arte de la relojería</h2>
        <div class="video-wrap">
            <iframe
                src="https://www.youtube.com/embed/GA8rRskwnsE?start=615"
                title="Documental de relojería suiza"
                width="560" height="315"
                frameborder="0" allowfullscreen loading="lazy">
            </iframe>
        </div>
        <p>🎵 Ambiente del taller:</p>
        <audio controls preload="none">
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" type="audio/mpeg" />
            Tu navegador no soporta audio.
        </audio>
    `;

    main.appendChild(sec);
}


/* Sección TARIFAS — tabla generada con el Map y el array */
function generarTarifas() {
    var main = document.getElementById('main-content');
    var sec  = document.createElement('section');
    sec.id   = 'tarifas';

    var titulo = document.createElement('h2');
    titulo.textContent = 'Comparativa de modelos';
    sec.appendChild(titulo);

    // Construimos la tabla usando el array de productos y el Map de especificaciones
    var tabla  = document.createElement('table');
    var thead  = '<thead><tr><th>Modelo</th><th>Movimiento</th><th>Material</th><th>Garantía</th><th>Precio</th></tr></thead>';
    var tbody  = '<tbody>';
    var caption = '<caption>Especificaciones y precios — 2025</caption>';

    // Bucle while: alternativa al for para recorrer el array
    var j = 0;
    while (j < productos.length) {
        var prod = productos[j];
        var spec = especificaciones.get(prod.id);  // Accedemos al Map
        var fila = (j % 2 !== 0) ? 'class="fila-alt"' : '';

        tbody += `
            <tr ${fila}>
                <td>${prod.nombre}</td>
                <td>${spec.movimiento}</td>
                <td>${spec.material}</td>
                <td>${spec.garantia}</td>
                <td class="precio">$${prod.precio.toLocaleString()}</td>
            </tr>`;
        j++;
    }

    tbody += '</tbody>';
    var tfoot = '<tfoot><tr><td colspan="5">* Precios en USD. Sujeto a disponibilidad.</td></tr></tfoot>';

    tabla.innerHTML = caption + thead + tbody + tfoot;
    sec.appendChild(tabla);
    main.appendChild(sec);
}


/* Sección CONTACTO — formulario con select generado desde el array */
function generarContacto() {
    var main = document.getElementById('main-content');
    var sec  = document.createElement('section');
    sec.id   = 'contacto';

    // Generamos las opciones del select con un bucle for
    var opciones = '<option value="">— Selecciona —</option>';
    for (var k = 0; k < productos.length; k++) {
        opciones += `<option value="${productos[k].id}">${productos[k].nombre}</option>`;
    }

    sec.innerHTML = `
        <h2>Solicitar información</h2>
        <form action="" method="post" onsubmit="enviar(event)">
            <label for="nombre">Nombre *</label>
            <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" required />

            <label for="email">Correo *</label>
            <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" required />

            <label for="modelo">Modelo de interés</label>
            <select id="modelo" name="modelo">${opciones}</select>

            <label for="mensaje">Mensaje *</label>
            <textarea id="mensaje" name="mensaje" rows="4" placeholder="¿En qué te podemos ayudar?" required></textarea>

            <input type="checkbox" id="privacidad" name="privacidad" required />
            <label for="privacidad">Acepto la <a href="#">política de privacidad</a>.</label>

            <br/><br/>
            <button type="submit" class="btn">Enviar</button>
            <p id="estado"></p>
        </form>
    `;

    main.appendChild(sec);
}


/* Sección TIENDAS — generada dinámicamente con un array y un bucle */
function generarTiendas() {
    var main = document.getElementById('main-content');
    var sec  = document.createElement('section');
    sec.id   = 'tiendas';

    // Array de tiendas
    var tiendas = [
        { ciudad: 'Barranquilla', direccion: 'Calle 72 #57-43, CC Buenavista', telefono: '+57 5 360 0000', horario: 'Lun–Sáb 10:00–20:00' },
        { ciudad: 'Bogotá',       direccion: 'Carrera 11 #82-01, CC Andino',   telefono: '+57 1 610 0000', horario: 'Lun–Dom 10:00–21:00' },
        { ciudad: 'Medellín',     direccion: 'El Poblado, CC El Tesoro',        telefono: '+57 4 444 0000', horario: 'Lun–Sáb 10:00–20:00' }
    ];

    var titulo = document.createElement('h2');
    titulo.textContent = 'Nuestras Tiendas';
    sec.appendChild(titulo);

    // if: verificamos que haya tiendas antes de mostrarlas
    if (tiendas.length === 0) {
        sec.innerHTML += '<p>No hay tiendas registradas actualmente.</p>';
    } else {
        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;margin-top:1.5rem;';

        // Bucle for para crear las tarjetas de cada tienda
        for (var t = 0; t < tiendas.length; t++) {
            var tienda = tiendas[t];
            var card   = document.createElement('div');
            card.style.cssText = 'background:#1a1a1a;border:1px solid #333;padding:1.2rem;';
            card.innerHTML = `
                <h3 style="color:#c9a96e;margin-bottom:0.6rem;">${tienda.ciudad}</h3>
                <p style="color:#aaa;font-size:0.9rem;">📍 ${tienda.direccion}</p>
                <p style="color:#aaa;font-size:0.9rem;">📞 ${tienda.telefono}</p>
                <p style="color:#aaa;font-size:0.9rem;">🕐 ${tienda.horario}</p>
            `;
            grid.appendChild(card);
        }

        sec.appendChild(grid);
    }

    main.appendChild(sec);
}


//  RELOJ CSS ANIMADO 

function moverAgujas() {
    var ahora    = new Date();
    var horas    = ahora.getHours() % 12;
    var minutos  = ahora.getMinutes();
    var segundos = ahora.getSeconds();

    // Grados de rotación de cada aguja
    var gradH = (horas * 30) + (minutos * 0.5);
    var gradM = minutos * 6;
    var gradS = segundos * 6;

    // if: comprobamos que los elementos existan antes de moverlos
    var agujaH = document.getElementById('aguja-h');
    var agujaM = document.getElementById('aguja-m');
    var agujaS = document.getElementById('aguja-s');

    if (agujaH && agujaM && agujaS) {
        agujaH.style.transform = 'rotate(' + gradH + 'deg)';
        agujaM.style.transform = 'rotate(' + gradM + 'deg)';
        agujaS.style.transform = 'rotate(' + gradS + 'deg)';
    }
}


// NAVBAR: efecto scroll 

window.addEventListener('scroll', function () {
    var nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.8)';
    } else {
        nav.style.boxShadow = 'none';
    }
});


//  FORMULARIO 

function enviar(event) {
    event.preventDefault();

    var nombre  = document.getElementById('nombre').value.trim();
    var email   = document.getElementById('email').value.trim();
    var mensaje = document.getElementById('mensaje').value.trim();
    var estado  = document.getElementById('estado');

    // Validación básica con if
    if (!nombre || !email || !mensaje) {
        estado.textContent = '⚠ Por favor completa todos los campos obligatorios.';
        estado.style.color = '#e55';
        return;
    }

    var btn = document.querySelector('#contacto .btn');
    btn.textContent = 'Enviando…';
    btn.disabled    = true;

    setTimeout(function () {
        estado.textContent = '✓ Mensaje enviado. Te responderemos pronto.';
        estado.style.color = '#6c6';
        btn.textContent    = 'Enviar';
        btn.disabled       = false;
        document.querySelector('form').reset();
    }, 1500);
}


//  PRODUCTO SELECCIONADO 

function seleccionarProducto(nombre, precio) {
    navegarA('contacto');

    // Esperamos a que el DOM esté listo y seleccionamos el modelo
    setTimeout(function () {
        var select = document.getElementById('modelo');
        if (!select) return;

        // Bucle for para buscar la opción coincidente
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].text.includes(nombre.split(' ')[0])) {
                select.selectedIndex = i;
                break;
            }
        }
    }, 100);
}


// AÑO EN EL FOOTER 

document.getElementById('footer-year').textContent =
    '© ' + new Date().getFullYear() + ' CHRONOS S.A. Todos los derechos reservados.';


//  INICIO DE LA APLICACIÓN 
// Cargamos la sección de inicio al arrancar

navegarA('inicio');
