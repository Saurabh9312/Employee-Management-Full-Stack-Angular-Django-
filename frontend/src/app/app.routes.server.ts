import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'list',
    renderMode: RenderMode.Client
  },
  {
    path: 'employees/add',
    renderMode: RenderMode.Client
  },
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
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'signup',
    renderMode: RenderMode.Prerender
  },
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];