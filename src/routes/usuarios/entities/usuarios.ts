import {Entity,PrimaryColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class Usuarios extends BaseEntity{

    @PrimaryColumn()
    codigo: string;

    @Column()
    nombre: string;

    @Column()
    email: string;

    @Column()
    telefono: string;

    @Column()
    puesto: string;

    @Column()
    codRol: string;
}