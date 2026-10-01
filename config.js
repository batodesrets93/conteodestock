// Ubicaciones disponibles para el conteo.
// Cada una puede tener una foto (archivo de imagen subido junto a la app,
// en la raíz del repo) para identificarla más fácil al elegir sucursal.
// Si "photo" es null, se muestra un ícono genérico en su lugar.
// hiddenProducts (opcional): códigos de productos que no se muestran para
// contar en esa sucursal. Para que un producto aparezca SOLO en algunas
// sucursales, en products.js se le agrega locations: ['Nombre sucursal'].
const LOCATIONS = [
  { name: 'BCN 1 - Space', photo: 'loc-bcn1.jpg' },
  {
    name: 'BCN 2 - Moon', photo: 'loc-bcn2.jpg',
    // Productos (por código) que NO se cuentan en esta sucursal.
    hiddenProducts: [
      // Cannolis
      2386, 2384, 2388, 2385, 2387,
      // Vaschettas grande / pequeña / descartable
      90002, 90003, 90004,
      // Bebidas: Sprite lata, S. Pellegrino 500 vidrio
      90005, 2130,
      // Caja pastelería, vasos plástico pastelería
      2291, 90016,
      // Limpieza: producto WC, Ecogras, V75 ambientador, valletas verdes,
      // trapos para cristales, Speed Natur, For Chlor
      90028, 90029, 90031, 90038, 90040, 90045, 90046,
      // Uniformes azules: camisas por género (se reemplazan por unisex)
      90066, 90067, 90068, 90069, 90070, 90071, 90072, 90073, 90074, 90075,
    ],
  },
  { name: 'Madrid', photo: 'loc-madrid.jpg' },
  { name: 'Málaga 1', photo: 'loc-malaga1.jpg' },
  { name: 'Valencia', photo: 'loc-valencia.jpg' },
  { name: 'Fabrica BCN', photo: 'loc-fabrica.jpg' },
];

// Usuarios habilitados para entrar a la app.
// canDelete: true = puede borrar conteos/desperdicios ya finalizados del historial.
// Por ahora solo "claudios" tiene ese permiso, tal como pediste.
//
// ⚠️ IMPORTANTE: esta app es un sitio estático (sin servidor), así que este
// login es un control simple para que el personal no borre conteos por
// error o entre gente no autorizada — NO es seguridad real. Cualquiera que
// sepa mirar el código fuente de la página puede ver estas contraseñas.
// Si en algún momento necesitás protección de verdad (por ejemplo, más
// sucursales, más gente, datos sensibles), lo ideal sería sumar un backend
// con autenticación real.
//
// Cambiá estas contraseñas antes de subir la app a producción.
// canEditPrices: true = puede entrar a la pantalla de Precios (ver y editar
// Precio 1 / Precio 2 de cada producto, y descargar el products.js actualizado
// + el historial de cambios). Por ahora solo "batodesrets", tal como pediste.
const USERS = [
  { username: 'batodesrets', password: '100393', canDelete: true, canEditPrices: true },
  { username: 'bautista', password: '100393', canDelete: false, canEditPrices: false },
  { username: 'agostina', password: '123456', canDelete: false, canEditPrices: false },
  { username: 'manuel', password: '123456', canDelete: false, canEditPrices: false },
  { username: 'simon', password: '123456', canDelete: false, canEditPrices: false },
  { username: 'julian', password: '123456', canDelete: false, canEditPrices: false },
  { username: 'malaga', password: '123456', canDelete: false, canEditPrices: false },
  { username: 'fabrica', password: '123456', canDelete: false, canEditPrices: false },
];

if (typeof module !== 'undefined') { module.exports = { LOCATIONS, USERS }; }
