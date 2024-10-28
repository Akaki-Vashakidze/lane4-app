import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CompetitionsListComponent } from './shared/components/competitions-list/competitions-list.component';

export const routes: Routes = [
    {
      path: '',
    //   canActivate: [userGuard],
    //   runGuardsAndResolvers: 'always',
      children: [
        {
          path: '',
          redirectTo: 'Dashboard',
          pathMatch: 'full',
        },
        {
          path: 'Dashboard',
          component: DashboardComponent,
        },
        {
            path: 'Competitions',
            component: CompetitionsListComponent,
        },
        // {
        //   path: 'application',
  
        //   loadChildren: () =>
        //     import('./pages/application/application.module').then(
        //       ({ ApplicationModule }) => ApplicationModule
        //     ),
        // },
        // {
        //   path: 'resources',
        //   data: {
        //     breadcrumb: { disable: true },
        //   },
        //   children: [
        //     {
        //       path: 'catalogs',
        //       children: [
        //         {
        //           path: '',
        //           component: CatalogsTreeComponent,
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   path: 'throttlers',
        //   loadChildren: () =>
        //     import('./pages/throttlers/throttlers-routing.routes').then(
        //       ({ throttlersRoutes }) => throttlersRoutes
        //     ),
        // },
      ],
    },
  ];