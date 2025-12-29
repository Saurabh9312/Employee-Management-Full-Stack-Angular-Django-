import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'employees/view/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'employees/edit/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'employees/delete/:id',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];