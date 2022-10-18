import {NgModule} from '@angular/core';
import {MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import { MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
// since we're exporting these modules, add them to export
    exports: [
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatPaginatorModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatStepperModule
       
    ]
})
export class AppMaterialModule {}