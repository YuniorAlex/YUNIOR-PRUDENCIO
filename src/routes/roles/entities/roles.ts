import {Entity,PrimaryColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class Roles extends BaseEntity{

    @PrimaryColumn()
    codigo: string;

    @Column()
    nombre: string;
}