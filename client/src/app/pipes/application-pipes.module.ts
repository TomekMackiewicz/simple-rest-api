import { NgModule } from '@angular/core';
import { CapitalizeFirstPipe } from './capitalize-first.pipe';

@NgModule({
    imports: [],
    declarations: [ 
        CapitalizeFirstPipe
    ],
    exports: [
        CapitalizeFirstPipe
    ]
})
export class ApplicationPipesModule {}
