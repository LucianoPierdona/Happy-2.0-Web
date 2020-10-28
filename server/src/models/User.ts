import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Orphanage from "./Orphanage";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string | null;

  @OneToMany(() => Orphanage, (orphanage) => orphanage.creatorId, {
    cascade: ["insert", "update"],
  })
  @JoinColumn({ name: "creatorId" })
  orphanages: Orphanage[];
}
