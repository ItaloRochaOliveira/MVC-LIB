import type { Sequelize } from "sequelize";
import { Cadusu as _Cadusu } from "./cadusu";
import type { CadusuAttributes, CadusuCreationAttributes } from "./cadusu";

export {
  _Cadusu as Cadusu,
};

export type {
  CadusuAttributes,
  CadusuCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Cadusu = _Cadusu.initModel(sequelize);

  Cadusu.belongsTo(Cadcarenc, { as: "codcarCadcarenc", foreignKey: "codcar"});
  Cadcarenc.hasMany(Cadusu, { as: "cadusus", foreignKey: "codcar"});
  Cadusu.belongsTo(Cadplano, { as: "codplanoCadplano", foreignKey: "codplano"});
  Cadplano.hasMany(Cadusu, { as: "cadusus", foreignKey: "codplano"});

  return {
    Cadusu: Cadusu,
  };
}
