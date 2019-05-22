import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule
} from '@angular/material';
import { MissingTranslationStrategy } from '@angular/compiler/src/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({

    imports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatBadgeModule,
        MatCardModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatBadgeModule,
        MatCardModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule
    ]
})

export class MaterialModule { }