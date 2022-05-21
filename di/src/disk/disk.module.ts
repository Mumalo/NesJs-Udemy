import {Module} from "@nestjs/common";
import {DiskService} from "./disk.service";
import {PowerModule} from "../power/power.module";


@Module({
    providers: [DiskService],//accessible to members in the same module
    imports: [PowerModule], //can import any export from PowerModule
    exports: [DiskService]
})

export class DiskModule {
}
