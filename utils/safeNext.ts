// Solo se aceptan rutas internas, para que un enlace de login o registro no
// pueda llevar a la persona a otro sitio después de entrar.
export const getSafeNext = (next?: string): string | null =>
  next && next.startsWith("/") && !/^\/[/\\]/.test(next) ? next : null;
