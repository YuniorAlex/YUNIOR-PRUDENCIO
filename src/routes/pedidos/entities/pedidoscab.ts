import {Entity,PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm"
import { Pedidosdet } from "./pedidosdet";

@Entity()
export class Pedidoscab extends BaseEntity{

    @PrimaryGeneratedColumn()
    numPedido: string;

    @Column()
    fechaPedido: Date;

    @Column({ nullable: true })
    fechaRecepcion: Date;

    @Column({ nullable: true })
    fechaDespacho: Date;

    @Column({ nullable: true })
    fechaEntrega: Date;

    @Column()
    codVendedor: string;

    @Column({ nullable: true })
    codRepartidor: string;

    @Column()
    codEstado: string;

    @OneToMany(() => Pedidosdet, (pedidosDet) => pedidosDet.numPedido)
    listaProductos: Pedidosdet[]
}