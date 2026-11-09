# 13. Limitaciones y trabajo futuro

## Limitaciones actuales

**Pagos solo de prueba.** El sistema rechaza las llaves reales de Stripe a propósito. Para cobrar dinero real habría que revisar los términos de Stripe para Colombia, los impuestos y la facturación electrónica.

**Una sola base de datos.** Las vistas previas de Vercel y el sitio publicado usan la misma base de datos. Una compra de prueba hecha en una vista previa aparece también en producción.

**El código QR no se valida.** La boleta muestra un QR con su código, pero todavía no existe la pantalla para leerlo en la entrada de la sala ni para marcar la boleta como usada.

**Sin recuperación de contraseña.** Si alguien olvida su contraseña, no puede recuperarla desde el sitio.

**Sin reembolsos.** Una compra pagada no se puede cancelar desde el sitio ni desde el panel.

**La boleta no llega por correo.** Solo se ve en "Mis boletas".

**Un solo cine.** No hay sedes ni ciudades. Todas las salas pertenecen al mismo cine.

**Roles en la sesión.** El rol queda guardado en la sesión. Si a un administrador se le quita el rol, conserva el acceso hasta que su sesión venza, como máximo 8 horas.

**Next 15.** El proyecto usa Next 15. Las alertas de seguridad de sus dependencias se resolvieron forzando versiones corregidas en `package.json`, pero la versión actual es Next 16. Actualizar es un cambio grande que también reemplaza `next lint`.

**Sin pruebas automáticas.** Las pruebas de [Pruebas](12-pruebas.md) se hicieron a mano o con scripts sueltos.

## Trabajo futuro

Ordenado de lo más importante a lo menos importante:

1. **Pruebas automáticas.** Pruebas de las reglas de negocio (precios, programación de funciones, validaciones), de la API de reservas y del flujo de compra en el navegador. Ejecutarlas en GitHub Actions con cada pull request.
2. **Experimento de concurrencia más grande.** La prueba P-22 ya mostró que, con 8 peticiones simultáneas, solo una aparta la silla. Falta repetirla con cientos de peticiones y medir los tiempos de respuesta.
3. **Base de datos separada para las vistas previas.** Así las pruebas no tocan los datos del sitio publicado.
4. **Actualizar a Next 16** en un cambio aparte, con una prueba completa del pago.
5. **Validación del QR en la entrada.** Una pantalla para el personal del cine que lea el código, muestre la boleta y la marque como usada.
6. **Recuperación de contraseña** por correo.
7. **Envío de la boleta por correo** después del pago.
8. **Reembolsos** desde el panel, usando la API de reembolsos de Stripe en modo de prueba.
9. **Reportes** de ventas por película, por sala y por franja horaria, con exportación a Excel.
10. **Monitoreo de errores** en producción, por ejemplo con Sentry.
11. **Política de seguridad de contenido completa**, que también limite los scripts.
