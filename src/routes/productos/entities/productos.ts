import {Entity,PrimaryColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class Productos extends BaseEntity{

    @PrimaryColumn()
    sku: string;

    @Column()
    nombre: string;

    @Column()
    tipo: string;

    @Column()
    etiqueta: string;

    @Column()
    precio: number;

    @Column()
    undmedida: string;
}