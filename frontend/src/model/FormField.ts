import type { SelectChoice } from "@/model/SelectChoice";

export interface FieldFull {
    formLabel: string;
    value: string | number | boolean | null;
    type?: string;
    key?: string;
    choices?: SelectChoice[];

}