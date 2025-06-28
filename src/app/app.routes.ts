import { Routes } from '@angular/router';
import { Home1Component } from '../Routing/home1/home1.component';
import { HomechildComponent } from '../Routing/homechild/homechild.component';
import { HomeGrandChildrenComponent } from '../Routing/home-grand-children/home-grand-children.component';
import { BindingComponentComponent } from '../Binding/binding-component/binding-component.component';
import { SignalComponent } from '../Signal/signal/signal.component';
import { TemplateformComponent } from '../Form/templateform/templateform.component';
import { Templateform1Component } from '../Form/templateform1/templateform1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveformComponent } from '../Form/reactiveform/reactiveform.component';
import { Crud1Component } from '../CRUD/crud1/crud1.component';

export const routes: Routes = [
    {
        path:'Home', component: Home1Component,
        children : [
            {
                path : 'Children', component : HomechildComponent,
                children : [
                    {
                        path : 'GrandChildren', component : HomeGrandChildrenComponent
                    }
                ]
            }
        ]
    },
    {
        path : '', redirectTo: 'Home', pathMatch: 'full'
    },
    {
        path: 'binding', component: BindingComponentComponent
    },
    {
        path: 'signal', component: SignalComponent
    },
    {
        path: 'templateform', component: TemplateformComponent
    },
    {
        path: 'templateform1', component: Templateform1Component
    },
    {
        path: 'reactiveform', component: ReactiveformComponent
    },
    {
        path: 'crud1', component: Crud1Component
    },
    {
        path : '**', redirectTo: '/Home'
    }
];
