import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Link {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text" })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "text" })
  url!: string;

  @Column({ type: "text" })
  imageUrl!: string;

  @Column({ type: "text" })
  category!: string;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdDate!: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedDate!: Date;

  @ManyToMany(() => User, (user) => user.links, {
    cascade: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  users!: Promise<User[]>;
}
