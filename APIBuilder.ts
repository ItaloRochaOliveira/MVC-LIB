import { NextFunction, Request, Response } from "express";
import { Sequelize, where, WhereOptions} from 'sequelize';
import { DbType } from "./APITypes/dbInterface";
import { DbModelType, UserModel } from "./APITypes/genericDbModelInterface";
import { dynamicJsonBuilder } from "./dynamicJsonBuilder";
import { Cadusu } from "./model/cadusu/cadusu";
import {RequestPagination} from "./APITypes/IPRequesteInterface";
import dotenv from "dotenv";
import BadRequest from "./errors/BadRequest";
import { Cadplano } from "./model/cadusu/cadplano";

dotenv.config();

class DataBaseBuilder<dbType extends DbType> {
    private sequelize: Sequelize;

    constructor(dbConfig: dbType){
        this.sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
            port: dbConfig.port,
            host: dbConfig.host,
            dialect: dbConfig.dialect,
            logging: false
        })
    }

    getSequelize(){
        return this.sequelize;
    }
}

class RepositoryBuilder<dbModelType extends DbModelType = typeof UserModel >{
    constructor(protected sequelize: Sequelize, protected dbModel: dbModelType){}

    protected dbModelInstantiated = this.dbModel.initModel(this.sequelize);

    async getAll<queryModel = {id: string}>(query?: queryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<dbModelType[]>{
        const valuesExistQuery = dynamicJsonBuilder(query ? query : {});
        
        return await this.dbModelInstantiated.findAll({
            attributes: atributes?.length ? atributes : '',
            where: valuesExistQuery.json as WhereOptions,
            offset: pagination?.init,
            limit: pagination?.limit,
        }) as unknown as dbModelType[];
    }

    async getOne<queryModel = {id: string}>(query?: queryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<dbModelType>{
        const valuesExistQuery = dynamicJsonBuilder(query ? query : {});
        
        return await this.dbModelInstantiated.findOne({
            attributes: atributes,
            where: {valuesExistQuery} as WhereOptions,
            offset: pagination?.init,
            limit: pagination?.limit
        }) as unknown as dbModelType;
    }

    async create<valuesType = {username: string, email: string}>(values: valuesType) {
        return await this.dbModelInstantiated.create(values);
    }

    async update<id = {id: number}, valuesType = {username: string, email: string}>(id: id, values: valuesType){
        return await this.dbModelInstantiated.update(values, {
            where: id
        })
    }

    // async delete<id= number>(id: id){
    //     return await this.dbModelInstantiated.delete()
    // }
}

class RepositoryWithForeignBuilder<dbModelType extends DbModelType = typeof UserModel, DbModelWithForeignType extends DbModelType = typeof UserModel> extends RepositoryBuilder<DbModelType>{
    private dbModelInstantiatedForForeign: dbModelType;
    
    constructor(sequelize: Sequelize, dbModel: dbModelType, private foreignModel: DbModelWithForeignType, private foreignKey: string){
        super(sequelize, dbModel);
        this.dbModelInstantiatedForForeign = this.foreignModel.initModel(this.sequelize);
        this.dbModelInstantiated.belongsTo(this.dbModelInstantiatedForForeign, {foreignKey: this.foreignKey});
        console.log(this.foreignKey)

        this.getAll.prototype
    }

    async getAll<queryModel = {id: string}>(query?: queryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<dbModelType[]>{
        const valuesExistQuery = dynamicJsonBuilder(query ? query : {});
        
        return await this.dbModelInstantiated.findAll({
            attributes: atributes?.length ? atributes : '',
            where: valuesExistQuery.json as WhereOptions,
            offset: pagination?.init,
            limit: pagination?.limit,
            include: [{
                model: this.foreignModel
            }]
        }) as unknown as dbModelType[];
    }

    async getOne<queryModel = { id: string; }>(query?: queryModel | undefined, atributes?: string[], pagination?: { init: number; limit: number; }): Promise<DbModelType> {
        const valuesExistQuery = dynamicJsonBuilder(query ? query : {});
        
        return await this.dbModelInstantiated.findOne({
            attributes: atributes,
            where: {valuesExistQuery} as WhereOptions,
            offset: pagination?.init,
            limit: pagination?.limit,
            include: [{
                model: this.foreignModel
            }]
        }) as unknown as dbModelType;
    }
 
}

class ServiceBuilder <repositoryModel extends RepositoryBuilder<DbModelType> = RepositoryBuilder<typeof UserModel>>{
    constructor(private repository: repositoryModel){}
    async getAll<queryModel>(query?: queryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<any>{
        const valuesExist = await this.repository.getAll<queryModel>(query, atributes, pagination);

        if(!valuesExist.length) throw new BadRequest();

        return valuesExist; 
    }

    async getOne<queryModel = {id: string}>(query?: queryModel, atributes?: string[], pagination?: {init: number, limit: number}): Promise<any>{
        const valuesExist = await this.repository.getOne(query, atributes, pagination);

        if(!valuesExist) throw new BadRequest();

        return valuesExist; 
    }

    async create<values = {username: string, email: string}>(values: values){
        for (const key in values) {
            if (!values[key]) {
                throw new BadRequest("O valor passado está vazio");
            }
        }
        
        const valuesCreated = await this.repository.create<values>(values);

        return valuesCreated;
    }

    async update<id = {id: string}, values = {username: string, email: string}> (id: id, values: values){
        for (const key in values) {
            if (!values[key]) {
                throw new BadRequest("O valor passado está vazio");
            }
        }

        const valuesCreated = await this.repository.update(id, values);

        return valuesCreated;
    }

    async setVerification<ValueType, Type>(value: ValueType, type: Type){

    }
}

class ControllerBuilder<serviceType extends ServiceBuilder<RepositoryBuilder<DbModelType>> = ServiceBuilder<RepositoryBuilder<typeof UserModel>>>{
    // private req: Request;
    // private res: Response;
    // private next: NextFunction;

    private service: serviceType;

    constructor(service: serviceType){
        this.service = service;
    }

    getController<queryModel>(type: 'getAll' | 'getOne', atributes: string[]){
        return async (req: RequestPagination, res: Response, next:NextFunction) => {
            try{
                const pagination = req.pagination;
                const query = req.query ? req.query : {};

                const result = await this.service[type]<queryModel>(query as queryModel, atributes, pagination);

                res.send(200).json(result);
            }catch(err){
                next(err);
            }
        }
    }

    async createController<bodyType>(){
        return async (req: Request, res: Response, next:NextFunction) => {
            try{
                const result = await this.service.create<bodyType>(req.body as bodyType);

                res.send(200).json(result);
            }catch(err){
                next(err);
            }
        }
    }

    async updateController<Id = {id: string}, BodyType = {}>(){
        return async (req: Request, res: Response, next: NextFunction) => {
            try{
                const result = await this.service.update<Id, BodyType>({id: req.params} as Id, req.body as BodyType);

                res.send(200).json(result);
            }catch(err){
                next(err);
            }
        }
    }
}

const sequelize = new DataBaseBuilder({username: process.env.DB_USERNAME!, password: process.env.DB_PASS!, database: process.env.DB_NAME!, host: process.env.DB_HOST!, port: Number(process.env.DB_PORT! ), dialect: "postgres"}).getSequelize();
const testeRepo = new RepositoryBuilder<typeof Cadusu>(sequelize, Cadusu);
const testeRepoWithForeign = new RepositoryWithForeignBuilder<typeof Cadusu, typeof Cadplano>(sequelize, Cadusu, Cadplano, 'codplano');
const testeService = new ServiceBuilder<typeof testeRepo>(testeRepo);
const testeController = new ControllerBuilder<typeof testeService>(testeService);

const data = async() => {
    // 0309-00001

    // console.log(await testeRepo.getAll<{codtit: string}>({codtit: '0309-00001'}, ['codtit'], {init: 0, limit: 1}))

    const values = await testeRepoWithForeign.getAll<{codtit: string}>({codtit: '0309-00001'}, [], {init: 0, limit: 1})

    console.log(values[0])

    // console.log(await testeService.getAll<{codtit: string}>({codtit: '0309-00001'}, ['codtit'], {init: 0, limit: 1}))

    // console.log(await testeService.create<{codname: string}>({codname: "pedro"}))

    // console.log(await testeService.update<{codtit: string}, {codname: string}>({codtit: "123"}, {codname: "pedro"}))
 
    // console.log(await testeController.getController("getAll"))
}

data();

export {DataBaseBuilder, RepositoryBuilder, ServiceBuilder, ControllerBuilder};