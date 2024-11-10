import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CompetitionsListComponent } from './shared/components/competitions-list/competitions-list.component';
import { CompetitionResultsComponent } from './features/competitions/components/competition-results/competition-results.component';
import { RecordsComponent } from './shared/components/records/records.component';
import { ContactComponent } from './shared/components/contact/contact.component';
import { AboutUsSectionComponent } from './shared/components/about-us-section/about-us-section.component';
import { AbousUsComponent } from './shared/components/abous-us/abous-us.component';
import { ClassificationContainerComponent } from './shared/components/classificationComps/classification-container/classification-container.component';
import { AthleteResultsComponent } from './shared/components/athlete-results/athlete-results.component';

export const routes: Routes = [
    {
      path: '',
    //   canActivate: [userGuard],
    //   runGuardsAndResolvers: 'always',
      children: [
        {
          path: '',
          redirectTo: 'dashboard',
          pathMatch: 'full',
        },
        {
          path: 'dashboard',
          component: DashboardComponent,
        },
        {
          path: 'records',
          component: RecordsComponent,
        },
        {
          path: 'athlete',
          component: AthleteResultsComponent,
        },
        {
          path: 'contact',
          component: ContactComponent,
        },
        {
          path: 'about',
          component: AbousUsComponent,
        },
        {
          path: 'classification',
          component: ClassificationContainerComponent,
        },
        {
          path: 'competitions',
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