import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CompetitionsListComponent } from './shared/components/competitions-list/competitions-list.component';
import { CompetitionResultsComponent } from './features/competitions/components/competition-results/competition-results.component';
import { RecordsComponent } from './shared/components/records/records.component';

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
          path: 'records',
          component: RecordsComponent,
        },
        {
          path: 'Competitions',
          children: [
            {
              path: '',
              children: [
                {
                  path: '',
                  component: CompetitionsListComponent,
                },
              ],
            },
            {
              path: 'results/:id',
              children: [
                {
                  path: '',
                  component: CompetitionResultsComponent,
                },
              ],
            },
          ],
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