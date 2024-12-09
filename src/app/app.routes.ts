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
import { AthleteStyleResultsComponent } from './shared/components/athlete-style-results/athlete-style-results.component';
import { NewCompetitionsPanelComponent } from './shared/new-competitions-panel/new-competitions-panel.component';
import { StartListComponent } from './features/competitions/components/start-list/start-list.component';
import { HeatsComponent } from './features/competitions/components/races/heats.component';

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
          path: 'athletes',
          component: AthleteResultsComponent,
        },
        {
          path: 'athlete/:stroke/:distance/:athleteId/:poolLength',
          component: AthleteStyleResultsComponent,
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
              path: 'races/:id',
              component: HeatsComponent,
            },
            {
              path: '',
              children: [
                {
                  path: '',
                  component: NewCompetitionsPanelComponent,
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
            {
              path: 'startList/:id',
              children: [
                {
                  path: '',
                  component: StartListComponent,
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