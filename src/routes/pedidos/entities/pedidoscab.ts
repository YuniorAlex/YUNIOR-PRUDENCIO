import {Entity,PrimaryColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class Pedidoscab extends BaseEntity{

    @PrimaryColumn()
    numpedido: string;

    @Column()
    codproducto: string;
}