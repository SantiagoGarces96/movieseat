export const sessionsHeaders = [
  { label: "Película", value: "movie.title" },
  { label: "Sala", value: "room.name" },
  { label: "Asientos disponibles", value: "availableSeats" },
  { label: "Precio preferencial", value: "preferentialPrice" },
  { label: "Precio general", value: "generalPrice" },
  { label: "Fecha de la función", value: "dateTime" },
  { label: "Creada", value: "createdAt" },
  { label: "Actualizada", value: "updatedAt" },
];

export const moviesHeaders = [
  { label: "Título", value: "title" },
  { label: "Descripción", value: "description" },
  { label: "Estado", value: "status" },
  { label: "Director", value: "director" },
  { label: "Duración", value: "duration" },
  { label: "Fecha de estreno", value: "releaseDate" },
  { label: "Creada", value: "createdAt" },
  { label: "Actualizada", value: "updatedAt" },
];

export const roomsHeaders = [
  { label: "Nombre", value: "name" },
  { label: "Tipo", value: "room" },
  { label: "Asientos preferenciales", value: "totalSeatsPreferential" },
  { label: "Asientos generales", value: "totalSeatsGeneral" },
  { label: "Total de asientos", value: "totalSeats" },
  { label: "Creada", value: "createdAt" },
  { label: "Actualizada", value: "updatedAt" },
];

export const foodHeaders = [
  { label: "Nombre", value: "name" },
  { label: "Descripción", value: "description" },
  { label: "Precio", value: "price" },
  { label: "Tamaño", value: "size" },
  { label: "Cantidad disponible", value: "availableAmount" },
  { label: "Creada", value: "createdAt" },
  { label: "Actualizada", value: "updatedAt" },
];

export const usersHeaders = [
  { label: "Nombre", value: "name" },
  { label: "Correo", value: "email" },
  { label: "Rol", value: "role" },
  { label: "Boletas", value: "tickets", sortable: false },
  { label: "Registro", value: "createdAt" },
];

export const ticketsHeaders = [
  { label: "Código", value: "code" },
  { label: "Película", value: "movieTitle" },
  { label: "Sala", value: "room", sortable: false },
  { label: "Función", value: "dateTime" },
  { label: "Sillas", value: "seats", sortable: false },
  { label: "Total", value: "totalPrice" },
  { label: "Comprador", value: "buyer", sortable: false },
  { label: "Compra", value: "createdAt" },
];

export const transactionsHeaders = [
  { label: "Referencia de pago", value: "paymentReference" },
  { label: "Comprador", value: "buyer", sortable: false },
  { label: "Boleta", value: "ticket", sortable: false },
  { label: "Total", value: "totalAmount" },
  { label: "Medio de pago", value: "paymentMethod", sortable: false },
  { label: "Estado", value: "status" },
  { label: "Fecha", value: "createdAt" },
];
