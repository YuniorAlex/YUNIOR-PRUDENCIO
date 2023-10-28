import {Entity,PrimaryColumn, Column, BaseEntity, ManyToOne, PrimaryGeneratedColumn, JoinColumn} from "typeorm"
import { Pedidoscab } from "./pedidoscab";

@Entity()
export class Pedidosdet extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: string;

    @Column({ nullable: false })
    codProducto: string;

    @ManyToOne(() => Pedidoscab, (pedidosCab) => pedidosCab.listaProductos)
    @JoinColumn({name: 'numPedido', referencedColumnName: 'numPedido'})
    numPedido: Pedidoscab
}