import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "..";
import { User, UserInstance } from "./user";

interface BlogAttributes {
  id: string;
  title: string;
  content: string;
  userId: string;
}

type BlogCreationAttributes = Optional<BlogAttributes, "id">;

interface BlogInstance
  extends Model<BlogAttributes, BlogCreationAttributes>,
    BlogAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  User?: UserInstance;
}

export const Blog = sequelize.define<BlogInstance>("Blogs", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

User.hasMany(Blog, { foreignKey: { name: "userId" } });
Blog.belongsTo(User, { foreignKey: { name: "userId" } });