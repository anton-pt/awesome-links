import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Link } from "./link.entity";

type Role = "USER" | "ADMIN";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true, unique: true, length: 255 })
  email?: string;

  @Column({ nullable: true, type: "text" })
  image?: string;

  @Column({ type: "enum", enum: ["USER", "ADMIN"], default: "USER" })
  role!: Role;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdDate!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedDate!: Date;

  @ManyToMany(() => Link, (link) => link.users)
  @JoinTable()
  links!: Promise<Link[]>;
}
