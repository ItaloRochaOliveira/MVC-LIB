import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Cadcarenc, CadcarencId } from './cadcarenc';
import type { Cadplano, CadplanoId } from './cadplano';

export interface CadusuAttributes {
  codtit: string;
  codusu: string;
  mesini: string;
  nomeusu: string;
  parentesco?: string;
  nascusu?: string;
  cpfusu?: string;
  rgusu?: string;
  estcivusu?: string;
  codplano: string;
  numtab?: string;
  desconto?: number;
  sexousu?: string;
  agregado?: string;
  codcar: string;
  datcar?: string;
  dataini?: string;
  datafim?: string;
  cartimp?: string;
  viascart?: number;
  situusu: string;
  codans: string;
  posans: string;
  mae?: string;
  fimusu?: string;
  motcanc?: string;
  historico?: string;
  dtemicart?: string;
  digusu?: string;
  valusu?: number;
  faixa?: string;
  valcart?: string;
  mesreaj?: string;
  datacad?: string;
  estud?: string;
  pis?: string;
  valcomi?: number;
  codext?: string;
  dataext?: string;
  statusext?: string;
  recumprir?: string;
  decsaude?: string;
  servusu?: string;
  codvel?: string;
  pisant?: string;
  posext?: string;
  parext?: string;
  pais?: string;
  codcco?: string;
  orgemis?: string;
  codplaport?: string;
  datamigra?: string;
  datareinc?: string;
  dataexc?: string;
  dataalt?: string;
  codbar?: string;
  descate?: string;
  caminhofoto?: string;
  adesao?: string;
  datacomple?: string;
  preexist?: string;
  aviso?: string;
  valcontra?: number;
  valprest?: number;
  valfuneral?: number;
  valdesempr?: number;
  valodonto?: number;
  valprestainclu?: number;
  valfuneralinclu?: number;
  valrepapresta?: number;
  valrepafuneral?: number;
  valrepadesemp?: number;
  valretido?: number;
  cobertura?: string;
  cns?: string;
  decnasc?: string;
  conferido?: boolean;
  boletousu?: string;
  planoant?: string;
  carant?: string;
  iniciobol?: string;
  origem?: string;
  codvend?: string;
  travaidade?: number;
  usucod?: string;
  autguiaweb?: string;
  dataultalt?: string;
  codccoant?: string;
  datareincBac?: string;
  posansant?: string;
  tipoagravo?: string;
  fimagravo?: string;
  valagravo?: number;
  coduni?: number;
  codexterno?: string;
  percpagemp?: number;
  protoans?: string;
  compinc?: string;
  segviacart?: string;
  dtbolusu?: string;
  guiafat?: string;
  biometria?: string;
  codPrecadusu?: number;
  necesp?: string;
  codmot?: string;
  obstec?: string;
  valrepasse?: number;
  percutil?: number;
  receita?: number;
  despesa?: number;
  dataana?: string;
  ansrg?: string;
  anscpf?: string;
  ansmae?: string;
  anscns?: string;
  ansnasc?: string;
  ansparentesco?: string;
  anstitular?: string;
  ansnome?: string;
  ansplano?: string;
  ansdataini?: string;
  ansdatafim?: string;
  anscnpjcei?: string;
  datapreexist?: string;
  oncologia?: string;
  emailusu?: string;
  celularusu?: string;
  resposta1?: string;
  resposta2?: string;
  resposta3?: string;
  resposta4?: string;
  resposta5?: string;
  resposta6?: string;
  resposta7?: string;
  resposta8?: string;
  resposta9?: string;
  resposta10?: string;
  resposta11?: string;
  statuspesq?: string;
  idSubvend?: number;
  datacont?: string;
  id: number;
  codfilial?: number;
  del?: number;
  usudel?: string;
  datadel?: Date;
  dtope?: Date;
  usuid?: number;
  nomesocial?: string;
  rguf?: string;
  temseguro?: string;
  ufrg?: string;
  liminar?: string;
  idForn?: number;
  codsubstipulantegama?: string;
}

export type CadusuPk = "codtit" | "codusu";
export type CadusuId = Cadusu[CadusuPk];
export type CadusuOptionalAttributes = "parentesco" | "nascusu" | "cpfusu" | "rgusu" | "estcivusu" | "numtab" | "desconto" | "sexousu" | "agregado" | "datcar" | "dataini" | "datafim" | "cartimp" | "viascart" | "mae" | "fimusu" | "motcanc" | "historico" | "dtemicart" | "digusu" | "valusu" | "faixa" | "valcart" | "mesreaj" | "datacad" | "estud" | "pis" | "valcomi" | "codext" | "dataext" | "statusext" | "recumprir" | "decsaude" | "servusu" | "codvel" | "pisant" | "posext" | "parext" | "pais" | "codcco" | "orgemis" | "codplaport" | "datamigra" | "datareinc" | "dataexc" | "dataalt" | "codbar" | "descate" | "caminhofoto" | "adesao" | "datacomple" | "preexist" | "aviso" | "valcontra" | "valprest" | "valfuneral" | "valdesempr" | "valodonto" | "valprestainclu" | "valfuneralinclu" | "valrepapresta" | "valrepafuneral" | "valrepadesemp" | "valretido" | "cobertura" | "cns" | "decnasc" | "conferido" | "boletousu" | "planoant" | "carant" | "iniciobol" | "origem" | "codvend" | "travaidade" | "usucod" | "autguiaweb" | "dataultalt" | "codccoant" | "datareincBac" | "posansant" | "tipoagravo" | "fimagravo" | "valagravo" | "coduni" | "codexterno" | "percpagemp" | "protoans" | "compinc" | "segviacart" | "dtbolusu" | "guiafat" | "biometria" | "codPrecadusu" | "necesp" | "codmot" | "obstec" | "valrepasse" | "percutil" | "receita" | "despesa" | "dataana" | "ansrg" | "anscpf" | "ansmae" | "anscns" | "ansnasc" | "ansparentesco" | "anstitular" | "ansnome" | "ansplano" | "ansdataini" | "ansdatafim" | "anscnpjcei" | "datapreexist" | "oncologia" | "emailusu" | "celularusu" | "resposta1" | "resposta2" | "resposta3" | "resposta4" | "resposta5" | "resposta6" | "resposta7" | "resposta8" | "resposta9" | "resposta10" | "resposta11" | "statuspesq" | "idSubvend" | "datacont" | "id" | "codfilial" | "del" | "usudel" | "datadel" | "dtope" | "usuid" | "nomesocial" | "rguf" | "temseguro" | "ufrg" | "liminar" | "idForn" | "codsubstipulantegama";
export type CadusuCreationAttributes = Optional<CadusuAttributes, CadusuOptionalAttributes>;

export class Cadusu extends Model<CadusuAttributes, CadusuCreationAttributes> implements CadusuAttributes {
  codtit!: string;
  codusu!: string;
  mesini!: string;
  nomeusu!: string;
  parentesco?: string;
  nascusu?: string;
  cpfusu?: string;
  rgusu?: string;
  estcivusu?: string;
  codplano!: string;
  numtab?: string;
  desconto?: number;
  sexousu?: string;
  agregado?: string;
  codcar!: string;
  datcar?: string;
  dataini?: string;
  datafim?: string;
  cartimp?: string;
  viascart?: number;
  situusu!: string;
  codans!: string;
  posans!: string;
  mae?: string;
  fimusu?: string;
  motcanc?: string;
  historico?: string;
  dtemicart?: string;
  digusu?: string;
  valusu?: number;
  faixa?: string;
  valcart?: string;
  mesreaj?: string;
  datacad?: string;
  estud?: string;
  pis?: string;
  valcomi?: number;
  codext?: string;
  dataext?: string;
  statusext?: string;
  recumprir?: string;
  decsaude?: string;
  servusu?: string;
  codvel?: string;
  pisant?: string;
  posext?: string;
  parext?: string;
  pais?: string;
  codcco?: string;
  orgemis?: string;
  codplaport?: string;
  datamigra?: string;
  datareinc?: string;
  dataexc?: string;
  dataalt?: string;
  codbar?: string;
  descate?: string;
  caminhofoto?: string;
  adesao?: string;
  datacomple?: string;
  preexist?: string;
  aviso?: string;
  valcontra?: number;
  valprest?: number;
  valfuneral?: number;
  valdesempr?: number;
  valodonto?: number;
  valprestainclu?: number;
  valfuneralinclu?: number;
  valrepapresta?: number;
  valrepafuneral?: number;
  valrepadesemp?: number;
  valretido?: number;
  cobertura?: string;
  cns?: string;
  decnasc?: string;
  conferido?: boolean;
  boletousu?: string;
  planoant?: string;
  carant?: string;
  iniciobol?: string;
  origem?: string;
  codvend?: string;
  travaidade?: number;
  usucod?: string;
  autguiaweb?: string;
  dataultalt?: string;
  codccoant?: string;
  datareincBac?: string;
  posansant?: string;
  tipoagravo?: string;
  fimagravo?: string;
  valagravo?: number;
  coduni?: number;
  codexterno?: string;
  percpagemp?: number;
  protoans?: string;
  compinc?: string;
  segviacart?: string;
  dtbolusu?: string;
  guiafat?: string;
  biometria?: string;
  codPrecadusu?: number;
  necesp?: string;
  codmot?: string;
  obstec?: string;
  valrepasse?: number;
  percutil?: number;
  receita?: number;
  despesa?: number;
  dataana?: string;
  ansrg?: string;
  anscpf?: string;
  ansmae?: string;
  anscns?: string;
  ansnasc?: string;
  ansparentesco?: string;
  anstitular?: string;
  ansnome?: string;
  ansplano?: string;
  ansdataini?: string;
  ansdatafim?: string;
  anscnpjcei?: string;
  datapreexist?: string;
  oncologia?: string;
  emailusu?: string;
  celularusu?: string;
  resposta1?: string;
  resposta2?: string;
  resposta3?: string;
  resposta4?: string;
  resposta5?: string;
  resposta6?: string;
  resposta7?: string;
  resposta8?: string;
  resposta9?: string;
  resposta10?: string;
  resposta11?: string;
  statuspesq?: string;
  idSubvend?: number;
  datacont?: string;
  id!: number;
  codfilial?: number;
  del?: number;
  usudel?: string;
  datadel?: Date;
  dtope?: Date;
  usuid?: number;
  nomesocial?: string;
  rguf?: string;
  temseguro?: string;
  ufrg?: string;
  liminar?: string;
  idForn?: number;
  codsubstipulantegama?: string;

  // Cadusu belongsTo Cadcarenc via codcar
  codcarCadcarenc!: Cadcarenc;
  getCodcarCadcarenc!: Sequelize.BelongsToGetAssociationMixin<Cadcarenc>;
  setCodcarCadcarenc!: Sequelize.BelongsToSetAssociationMixin<Cadcarenc, CadcarencId>;
  createCodcarCadcarenc!: Sequelize.BelongsToCreateAssociationMixin<Cadcarenc>;
  // Cadusu belongsTo Cadplano via codplano
  codplanoCadplano!: Cadplano;
  getCodplanoCadplano!: Sequelize.BelongsToGetAssociationMixin<Cadplano>;
  setCodplanoCadplano!: Sequelize.BelongsToSetAssociationMixin<Cadplano, CadplanoId>;
  createCodplanoCadplano!: Sequelize.BelongsToCreateAssociationMixin<Cadplano>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Cadusu {
    return Cadusu.init({
    codtit: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    codusu: {
      type: DataTypes.STRING(2),
      allowNull: false,
      primaryKey: true
    },
    mesini: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
    nomeusu: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    parentesco: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    nascusu: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cpfusu: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    rgusu: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    estcivusu: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    codplano: {
      type: DataTypes.STRING(4),
      allowNull: false,
      references: {
        model: 'cadplano',
        key: 'codplano'
      }
    },
    numtab: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    desconto: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    sexousu: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    agregado: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    codcar: {
      type: DataTypes.STRING(4),
      allowNull: false,
      references: {
        model: 'cadcarenc',
        key: 'codcar'
      }
    },
    datcar: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dataini: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    datafim: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    cartimp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    viascart: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    situusu: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    codans: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    posans: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    mae: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    fimusu: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    motcanc: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    historico: {
      type: DataTypes.STRING(4000),
      allowNull: true
    },
    dtemicart: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    digusu: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    valusu: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    faixa: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    valcart: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    mesreaj: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    datacad: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    estud: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    pis: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    valcomi: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    codext: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    dataext: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    statusext: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    recumprir: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    decsaude: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    servusu: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    codvel: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    pisant: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    posext: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    parext: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    pais: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    codcco: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    orgemis: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    codplaport: {
      type: DataTypes.STRING(9),
      allowNull: true
    },
    datamigra: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    datareinc: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dataexc: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dataalt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    codbar: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    descate: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    caminhofoto: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    adesao: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    datacomple: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    preexist: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    aviso: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    valcontra: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valprest: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valfuneral: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valdesempr: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valodonto: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valprestainclu: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valfuneralinclu: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valrepapresta: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valrepafuneral: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valrepadesemp: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    valretido: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    cobertura: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    cns: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    decnasc: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    conferido: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    boletousu: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    planoant: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    carant: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    iniciobol: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    origem: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    codvend: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    travaidade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usucod: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    autguiaweb: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    dataultalt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    codccoant: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    datareincBac: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'datareinc_bac'
    },
    posansant: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    tipoagravo: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    fimagravo: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    valagravo: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    coduni: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codexterno: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    percpagemp: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    protoans: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    compinc: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    segviacart: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    dtbolusu: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    guiafat: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    biometria: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    codPrecadusu: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'cod_precadusu'
    },
    necesp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    codmot: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    obstec: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valrepasse: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    percutil: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    receita: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    despesa: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    dataana: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ansrg: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    anscpf: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ansmae: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    anscns: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ansnasc: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ansparentesco: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    anstitular: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ansnome: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ansplano: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ansdataini: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ansdatafim: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    anscnpjcei: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    datapreexist: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    oncologia: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    emailusu: {
      type: DataTypes.STRING(70),
      allowNull: true
    },
    celularusu: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    resposta1: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta2: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta3: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta4: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta5: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta6: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta7: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta8: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta9: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta10: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    resposta11: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    statuspesq: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    idSubvend: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'id_subvend'
    },
    datacont: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codfilial: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    del: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    usudel: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    datadel: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtope: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    usuid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nomesocial: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: ""
    },
    rguf: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: ""
    },
    temseguro: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ufrg: {
      type: DataTypes.STRING(2),
      allowNull: true,
      defaultValue: ""
    },
    liminar: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "N"
    },
    idForn: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'id_forn'
    },
    codsubstipulantegama: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cadusu',
    schema: 'WARELINE',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "CADUSU_pkey",
        unique: true,
        fields: [
          { name: "codtit" },
          { name: "codusu" },
        ]
      },
      {
        name: "cadusu_codans_i",
        fields: [
          { name: "codans" },
        ]
      },
      {
        name: "cadusu_codcco_i",
        fields: [
          { name: "codcco" },
        ]
      },
      {
        name: "cadusu_codplano_i",
        fields: [
          { name: "codplano" },
        ]
      },
      {
        name: "cadusu_codtit_codusu_i",
        fields: [
          { name: "codtit" },
          { name: "codusu" },
        ]
      },
      {
        name: "cadusu_codtit_i",
        fields: [
          { name: "codtit" },
        ]
      },
      {
        name: "cadusu_contrato_i",
        fields: [
        ]
      },
      {
        name: "cadusu_cpfusu_i",
        fields: [
          { name: "cpfusu" },
        ]
      },
      {
        name: "cadusu_nomeusu_i",
        fields: [
          { name: "nomeusu" },
        ]
      },
    ]
  });
  }
}
