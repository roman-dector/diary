import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from 'pages/auth';
import { EditPageComponent } from 'pages/edit/ui';
import { NotesPageComponent } from 'pages/notes/ui/notes.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthPageComponent,
  },
  {
    path: 'edit',
    component: EditPageComponent,
  },
  {
    path: 'edit/:noteId',
    component: EditPageComponent,
  },
  {
    path: 'notes',
    component: NotesPageComponent,
  },
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
